
import { useState } from 'react';
import CubeScene from '@/components/CubeScene';
import MusicControls from '@/components/MusicControls';
import { MusicRulesProvider } from '@/context/MusicRulesContext';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="w-full p-4 bg-black/20 backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-white">Musical Cube</h1>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <MusicRulesProvider>
          <div className="w-full max-w-3xl aspect-square">
            <CubeScene />
          </div>
          
          <MusicControls isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          
          <div className="mt-6 p-4 rounded-lg bg-black/20 backdrop-blur-sm text-white/80 max-w-xl text-center">
            <p>Click on any square of the cube to play a musical note. The cube follows musical rules for what notes can be played next.</p>
          </div>
        </MusicRulesProvider>
      </main>
    </div>
  );
};

export default Index;
