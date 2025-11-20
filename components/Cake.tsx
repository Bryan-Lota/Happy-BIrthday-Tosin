import React from 'react';
import { motion } from 'framer-motion';
import { Scene } from '../types';

interface CakeProps {
  state: Scene;
}

export const Cake: React.FC<CakeProps> = ({ state }) => {
  const showCandles = state === Scene.CANDLES || state === Scene.WISH_TIME;
  
  const candleVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: (i: number) => ({
      scaleY: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        type: "spring"
      }
    })
  };

  const flameVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: [1, 1.3, 0.9, 1.1, 1],
      transition: {
        delay: i * 0.2 + 0.5, // Light after candle appears
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    })
  };

  return (
    <motion.div 
      initial={{ y: -800, opacity: 0, scale: 0.5 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      className="relative mt-24 md:mt-32"
    >
      {/* CAKE CONTAINER */}
      <div className="relative flex flex-col items-center justify-end filter drop-shadow-2xl">
        
        {/* CANDLES ROW */}
        <div className="flex gap-8 mb-[-10px] z-30">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i}
              custom={i}
              initial="hidden"
              animate={showCandles ? "visible" : "hidden"}
              variants={candleVariants}
              className="relative flex flex-col items-center origin-bottom"
            >
              {/* Flame */}
              <motion.div 
                custom={i}
                variants={flameVariants}
                className="w-4 h-6 bg-orange-400 rounded-full shadow-[0_0_30px_#f97316] mb-1 z-20"
                style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
              />
              <div className="absolute top-0 w-6 h-8 bg-yellow-500 blur-md opacity-50 rounded-full animate-pulse" />
              
              {/* Stick - Blue and White stripes */}
              <div className="w-4 h-14 bg-blue-200 rounded-sm border border-blue-300 relative overflow-hidden">
                 <div className="absolute w-full h-2 bg-blue-600 top-2 -rotate-12 scale-125" />
                 <div className="absolute w-full h-2 bg-blue-600 top-6 -rotate-12 scale-125" />
                 <div className="absolute w-full h-2 bg-blue-600 top-10 -rotate-12 scale-125" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* TOP TIER - Light Blue */}
        <div className="w-56 h-28 bg-blue-400 rounded-t-3xl relative shadow-lg z-20 flex items-start justify-center overflow-visible border-b-4 border-black/10">
            {/* Dripping frosting - White */}
            <div className="absolute top-0 left-0 w-full h-10 flex">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="flex-1 h-8 bg-white rounded-b-full mx-[2px] shadow-sm" />
                ))}
            </div>
            {/* Sprinkles */}
             <div className="absolute inset-0 w-full h-full overflow-hidden opacity-80">
                <div className="absolute top-10 left-4 w-2 h-4 bg-yellow-400 rotate-45 rounded-full" />
                <div className="absolute top-12 right-10 w-2 h-4 bg-blue-900 -rotate-12 rounded-full" />
                <div className="absolute top-20 left-1/2 w-2 h-4 bg-green-400 rotate-90 rounded-full" />
                <div className="absolute top-8 left-1/4 w-2 h-4 bg-orange-400 rotate-12 rounded-full" />
             </div>
        </div>

        {/* MIDDLE TIER - Medium Blue */}
        <div className="w-80 h-32 bg-blue-600 rounded-t-3xl relative shadow-lg z-10 flex items-start justify-center border-b-4 border-black/10">
           {/* Dripping frosting - Light Blue */}
           <div className="absolute top-0 left-0 w-full h-10 flex">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex-1 h-10 bg-blue-400 rounded-b-full mx-[2px] shadow-sm" />
                ))}
            </div>
            {/* Decoration Line */}
            <div className="absolute top-1/2 w-full h-4 border-t-4 border-b-4 border-blue-300 border-dashed opacity-30" />
        </div>

        {/* BOTTOM TIER - Dark Slate/Navy */}
        <div className="w-[400px] h-40 bg-slate-800 rounded-t-[2.5rem] relative shadow-2xl z-0">
            {/* Dripping frosting - Blue */}
            <div className="absolute top-0 left-0 w-full h-12 flex">
                {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="flex-1 h-10 bg-blue-600 rounded-b-full mx-[2px] shadow-sm" />
                ))}
            </div>
             {/* Decorative accents */}
            <div className="absolute bottom-4 w-full flex justify-around px-4">
                {Array.from({ length: 8 }).map((_, i) => (
                     <div key={i} className="w-6 h-6 bg-yellow-400 rounded-full shadow-md border-2 border-yellow-200" />
                ))}
            </div>
            {/* Plate */}
            <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[480px] h-10 bg-gray-200 rounded-[50%] shadow-xl opacity-30" />
        </div>

      </div>
    </motion.div>
  );
};