import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateBirthdayWish } from '../services/geminiService';
import { Sparkles, Star, Loader2, Hand } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BirthdayCardProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const BirthdayCard: React.FC<BirthdayCardProps> = ({ isOpen, onOpen }) => {
  const [wish, setWish] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !wish) {
      setLoading(true);
      // Trigger confetti again for the open - Blue and Gold theme
      confetti({
        particleCount: 200,
        spread: 100,
        colors: ['#3b82f6', '#fbbf24', '#ffffff'],
        origin: { y: 0.7 }
      });
      
      generateBirthdayWish().then((text) => {
        setWish(text);
        setLoading(false);
      });
    }
  }, [isOpen, wish]);

  return (
    <div className="relative w-[320px] h-[450px] md:w-[450px] md:h-[600px] cursor-pointer perspective-[1500px]" onClick={!isOpen ? onOpen : undefined}>
      
      {/* Visual Signal to Click */}
      <AnimatePresence>
        {!isOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none"
            >
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center"
                >
                    <div className="bg-blue-600 text-white px-4 py-1 rounded-full font-bold shadow-lg text-sm mb-2 border border-blue-400">
                        Click Me!
                    </div>
                    <div className="bg-blue-600/20 p-2 rounded-full backdrop-blur-sm">
                         <Hand className="text-blue-400 fill-blue-400 rotate-[-30deg]" size={32} />
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative w-full h-full transition-all duration-1000 transform-style-3d"
        animate={{ rotateY: isOpen ? -180 : 0, x: isOpen ? 150 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT COVER - Navy and Gold */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 to-slate-900 rounded-r-xl shadow-2xl flex flex-col items-center justify-center backface-hidden border-l-8 border-blue-950 z-20 origin-left group"
          style={{ backfaceVisibility: 'hidden' }}
        >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-300" />

            <div className="absolute inset-4 border-4 border-double border-yellow-500/50 rounded-lg flex flex-col items-center justify-center bg-white/5">
                <h2 className="text-6xl font-['Mountains_of_Christmas'] text-white drop-shadow-md text-center px-4 leading-tight">
                    To<br/>Tosin
                </h2>
                <div className="my-8">
                  <Sparkles className="text-yellow-400 animate-spin-slow" size={64} />
                </div>
                <div className="mt-8 bg-blue-800/50 px-6 py-2 rounded-full backdrop-blur-md border border-blue-400/30 animate-pulse">
                    <p className="text-sm text-blue-100 uppercase tracking-widest font-bold">Open Me Bro</p>
                </div>
            </div>
        </div>

        {/* INSIDE LEFT (Back of front cover) */}
        <div 
          className="absolute inset-0 w-full h-full bg-slate-100 rounded-l-xl shadow-inner flex flex-col items-center justify-center backface-hidden origin-left"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
             <div className="p-8 text-center h-full flex flex-col justify-center items-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 shadow-md text-blue-600">
                    <Star size={48} fill="currentColor" />
                </div>
                <h3 className="text-3xl text-slate-800 font-['Mountains_of_Christmas'] mb-4">Stay Awesome</h3>
                <p className="text-slate-600 font-['Fredoka'] italic">
                    "Count your life by smiles, not tears. Count your age by friends, not years."
                </p>
             </div>
        </div>
      </motion.div>

      {/* INSIDE RIGHT (Base of card) */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-white rounded-r-xl shadow-2xl z-10 flex flex-col items-center text-center p-2 border-r-2 border-b-2 border-gray-200"
        initial={{ x: 0 }}
        animate={{ x: isOpen ? 0 : 0 }} 
      >
         <div className="w-full h-full border-4 border-blue-100 rounded-lg p-6 flex flex-col relative overflow-hidden">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-bl-[100px] -mr-4 -mt-4 z-0" />
            
            <h1 className="relative z-10 text-4xl md:text-5xl font-['Mountains_of_Christmas'] text-blue-600 mb-6 mt-4 leading-none drop-shadow-sm">
                HAPPY BIRTHDAY TOSIN!
            </h1>

            <div className="relative z-10 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-300 to-transparent mb-6" />

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center min-h-[200px]">
                {loading ? (
                    <div className="flex flex-col items-center gap-2 text-blue-400">
                        <Loader2 className="animate-spin" size={32} />
                        <span className="text-sm font-['Fredoka']">Writing something epic...</span>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="prose prose-blue"
                    >
                        <p className="text-lg md:text-xl text-slate-700 font-['Dancing_Script'] leading-relaxed whitespace-pre-wrap">
                            {wish}
                        </p>
                    </motion.div>
                )}
            </div>

            <div className="relative z-10 mt-auto pt-6 flex flex-col items-center">
                <p className="text-md text-slate-500 font-['Fredoka'] font-semibold">Your bro,</p>
                <p className="text-2xl text-blue-700 font-['Dancing_Script'] font-bold">Bryan</p>
            </div>
         </div>
      </motion.div>
    </div>
  );
};