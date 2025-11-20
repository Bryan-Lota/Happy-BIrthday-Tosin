import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Scene } from '../types';
import { Balloons } from './Balloons';
import { Cake } from './Cake';
import { BirthdayCard } from './BirthdayCard';
import { Play, Volume2, VolumeX } from 'lucide-react';

interface AnimationStageProps {
  currentScene: Scene;
  onNextScene: (scene: Scene) => void;
}

export const AnimationStage: React.FC<AnimationStageProps> = ({ currentScene, onNextScene }) => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const songAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio on Start
  const enableAudio = () => {
    setAudioEnabled(true);
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    // Preload Birthday Song
    if (!songAudioRef.current) {
      // Public domain Happy Birthday piano version
      songAudioRef.current = new Audio('https://upload.wikimedia.org/wikipedia/commons/6/6e/Happy_Birthday_to_You_-_C_Major.ogg');
      songAudioRef.current.volume = 0.4;
      songAudioRef.current.loop = true;
    }
  };

  const playPopSound = () => {
    if (!audioEnabled || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    // Random pitch for variety
    osc.frequency.setValueAtTime(300 + Math.random() * 150, ctx.currentTime); // Slightly lower pitch for "cool" vibe?
    osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const playSong = () => {
    if (!audioEnabled || !songAudioRef.current) return;
    // Only play if not already playing
    if (songAudioRef.current.paused) {
        songAudioRef.current.play().catch(e => console.log("Audio play failed", e));
    }
  };

  // Twinkling Stars Background
  const StarBackground = () => (
    <div className="absolute inset-0 overflow-hidden z-0">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-blue-100 rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            boxShadow: '0 0 5px cyan'
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );

  // Fireworks Trigger
  const launchFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Colors: Blue, Gold, White
      const colors = ['#3b82f6', '#fbbf24', '#ffffff'];
      
      confetti({ ...defaults, particleCount, colors, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, colors, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  // Auto-advance logic for some scenes
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    switch (currentScene) {
      case Scene.BALLOONS:
        // Play some pops randomly
        const popInterval = setInterval(() => {
           if(Math.random() > 0.7) playPopSound();
        }, 500);
        timeout = setTimeout(() => {
            clearInterval(popInterval);
            onNextScene(Scene.CAKE_DROP);
        }, 8000); // Extended for balloons to float up
        break;
      case Scene.CAKE_DROP:
        playPopSound(); 
        // Start the birthday song when the cake appears
        playSong();
        timeout = setTimeout(() => onNextScene(Scene.CANDLES), 2000);
        break;
      case Scene.CANDLES:
        timeout = setTimeout(() => onNextScene(Scene.WISH_TIME), 2500);
        break;
      case Scene.WISH_TIME:
        // Trigger fireworks once wish time starts
        launchFireworks();
        timeout = setTimeout(() => {
           onNextScene(Scene.CARD_REVEAL);
        }, 4500);
        break;
      case Scene.CARD_OPEN:
        // Song continues playing...
        break;
      default:
        break;
    }

    return () => clearTimeout(timeout);
  }, [currentScene, onNextScene]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center perspective-1000">
      
      <StarBackground />

      <AnimatePresence mode="wait">
        
        {/* SCENE 1: INTRO BUTTON */}
        {currentScene === Scene.INTRO && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
            className="flex flex-col items-center gap-8 z-10"
          >
            <h1 className="text-6xl md:text-8xl font-['Mountains_of_Christmas'] text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-cyan-200 text-center leading-tight drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              For Tosin
            </h1>
            <p className="text-xl text-blue-200 font-['Dancing_Script']">Something wonderful awaits...</p>
            <button
              onClick={() => {
                enableAudio();
                onNextScene(Scene.BALLOONS);
              }}
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full text-2xl font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105 hover:shadow-[0_0_50px_rgba(59,130,246,0.9)] transition-all duration-300 flex items-center gap-3 border-2 border-white/20"
            >
              <Play fill="currentColor" /> Start Experience
            </button>
            <div className="text-white/50 text-sm flex items-center gap-2">
               <Volume2 size={14}/> Sound Effects Included
            </div>
          </motion.div>
        )}

        {/* SCENE 2: BALLOONS */}
        {currentScene === Scene.BALLOONS && (
          <Balloons key="balloons" />
        )}

        {/* SCENE 3, 4, 5: CAKE SEQUENCE */}
        {(currentScene === Scene.CAKE_DROP || currentScene === Scene.CANDLES || currentScene === Scene.WISH_TIME) && (
          <motion.div
            key="cake-container"
            className="absolute inset-0 flex items-center justify-center z-10"
            exit={{ opacity: 0, y: 100, transition: { duration: 1 } }}
          >
            <Cake 
              state={currentScene} 
            />
          </motion.div>
        )}

        {/* SCENE 6 & 7: CARD */}
        {(currentScene === Scene.CARD_REVEAL || currentScene === Scene.CARD_OPEN) && (
           <motion.div
             key="card-container"
             initial={{ opacity: 0, y: 100, scale: 0.8 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="z-20"
           >
             <BirthdayCard 
               isOpen={currentScene === Scene.CARD_OPEN}
               onOpen={() => {
                   onNextScene(Scene.CARD_OPEN);
                   launchFireworks();
               }}
             />
           </motion.div>
        )}

      </AnimatePresence>

      {/* Overlay Text for WISH_TIME */}
      <AnimatePresence>
        {currentScene === Scene.WISH_TIME && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute top-[15%] text-center z-30"
          >
            <h2 className="text-5xl md:text-7xl font-['Mountains_of_Christmas'] text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.8)]">
              Make a Wish!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};