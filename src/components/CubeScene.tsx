
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import MusicalCube from './MusicalCube';
import { Suspense } from 'react';

const CubeScene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Suspense fallback={null}>
        <MusicalCube />
      </Suspense>
      <OrbitControls
        enablePan={false}
        minDistance={6}
        maxDistance={12}
      />
    </Canvas>
  );
};

export default CubeScene;
