import React, { useState } from 'react';
import { AnimationStage } from './components/AnimationStage';
import { Scene } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [scene, setScene] = useState<Scene>(Scene.INTRO);

  const handleNextScene = (nextScene: Scene) => {
    setScene(nextScene);
  };

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden text-white font-['Fredoka']">
      {/* Background ambient effects - Deep Blue/Midnight Theme */}
      {/* Using standard classes instead of arbitrary values for better compatibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-slate-900 to-black opacity-100 z-0 pointer-events-none" />
      
      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <AnimationStage 
          currentScene={scene} 
          onNextScene={handleNextScene} 
        />
      </div>

      {/* Footer / Controls */}
      <div className="absolute bottom-4 right-4 z-50 text-xs text-white/30 flex items-center gap-2 pointer-events-none">
        <Sparkles size={14} />
        <span>Created for Tosin</span>
      </div>
    </div>
  );
}