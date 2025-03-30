
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';
import * as THREE from 'three';
import { useMusicRules } from '@/context/MusicRulesContext';
import { playNote } from '@/utils/audioUtils';

// Define face colors
const COLORS = {
  front: '#FF5252', // Red
  back: '#FF9800',  // Orange
  top: '#FFEB3B',   // Yellow
  bottom: '#FFFFFF', // White
  left: '#2196F3',  // Blue
  right: '#4CAF50'  // Green
};

// Create a 3x3 grid of smaller cubes to form a Rubik's cube
const createCubeFace = (color: string, position: [number, number, number], rotation: [number, number, number]) => {
  const face = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      face.push({
        position: [i, j, 0] as [number, number, number],
        color,
        worldPosition: new THREE.Vector3(...position),
        rotation,
        note: `${['C', 'D', 'E', 'F', 'G', 'A', 'B'][Math.floor(Math.random() * 7)]}${[3, 4, 5][Math.floor(Math.random() * 3)]}`,
      });
    }
  }

  return face;
};

const MusicalCube = () => {
  const groupRef = useRef<Group>(null);
  const [lastClickedFace, setLastClickedFace] = useState<string | null>(null);
  const { addNote, canPlayNote } = useMusicRules();

  // Create rotation effect
  useFrame(() => {
    if (groupRef.current && !lastClickedFace) {
      groupRef.current.rotation.y = 0.8;
      groupRef.current.rotation.x = 0.6;
    }
  });

  // Define cube faces
  const faces = [
    // Front face (Z+)
    createCubeFace(COLORS.front, [0, 0, 1.5], [0, 0, 0]),
    // Back face (Z-)
    createCubeFace(COLORS.back, [0, 0, -1.5], [0, Math.PI, 0]),
    // Top face (Y+)
    createCubeFace(COLORS.top, [0, 1.5, 0], [Math.PI / 2, 0, 0]),
    // Bottom face (Y-)
    createCubeFace(COLORS.bottom, [0, -1.5, 0], [-Math.PI / 2, 0, 0]),
    // Left face (X-)
    createCubeFace(COLORS.left, [-1.5, 0, 0], [0, -Math.PI / 2, 0]),
    // Right face (X+)
    createCubeFace(COLORS.right, [1.5, 0, 0], [0, Math.PI / 2, 0]),
  ];

  // Flatten all faces
  const allSquares = faces.flat();

  const handleClick = (square: any) => {
    // Check if this note can be played based on rules
    if (canPlayNote(square.note)) {
      // Play the note
      playNote(square.note);

      // Add to sequence
      addNote(square.note);

      // Show visual feedback
      setLastClickedFace(square.position.join(','));
      setTimeout(() => setLastClickedFace(null), 300);
    } else {
      // Visual feedback for invalid note
      setLastClickedFace(square.position.join(','));
      setTimeout(() => setLastClickedFace(null), 100);
    }
  };

  return (
    <group ref={groupRef}>
      {allSquares.map((square, index) => {
        const isActive = lastClickedFace === square.position.join(',');

        return (
          <group
            key={index}
            position={square.worldPosition}
            rotation={new THREE.Euler(...square.rotation)}
          >
            <mesh
              position={square.position}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(square);
              }}
              scale={isActive ? 1.1 : 1}
            >
              <boxGeometry args={[0.9, 0.9, 0.1]} />
              <meshStandardMaterial
                color={isActive ? '#FFFFFF' : square.color}
                emissive={isActive ? square.color : '#000000'}
                emissiveIntensity={isActive ? 0.5 : 0}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

export default MusicalCube;
