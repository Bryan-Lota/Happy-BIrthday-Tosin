import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Cool / Boy-like colors
const BALLOON_COLORS = ['#3b82f6', '#60a5fa', '#f59e0b', '#10b981', '#6366f1', '#94a3b8'];

// SVG Paths for different balloon shapes
const SHAPES = [
    // Standard Round
    "M50,0 C20,0 0,20 0,50 C0,80 20,100 50,100 C80,100 100,80 100,50 C100,20 80,0 50,0 Z", 
    // Oval / Tall
    "M50,0 C20,0 10,20 10,60 C10,100 30,120 50,120 C70,120 90,100 90,60 C90,20 80,0 50,0 Z",
    // Heart-ish (Keeping it because it's still a celebration shape, but maybe less frequent)
    "M50,30 C35,0 0,10 0,40 C0,70 50,100 50,100 C50,100 100,70 100,40 C100,10 65,0 50,30 Z"
];

interface LetterBalloonProps {
  letter: string;
  delay: number;
  xOffset: number;
}

const LetterBalloon: React.FC<LetterBalloonProps> = ({ letter, delay, xOffset }) => (
    <motion.div
        initial={{ y: '110vh', x: `${50 + xOffset}vw`, rotate: -10 }}
        animate={{ 
            y: '25vh', 
            x: [`${50 + xOffset}vw`, `${50 + xOffset + 2}vw`, `${50 + xOffset - 2}vw`, `${50 + xOffset}vw`],
            rotate: [ -10, 10, -5, 5, 0 ]
        }}
        transition={{ 
            y: { duration: 6, delay: delay, ease: "easeOut" },
            x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-0 left-0 z-20 drop-shadow-2xl"
    >
         <div className="relative w-24 h-28 md:w-32 md:h-40">
            <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
                <defs>
                    {/* Silver/Platinum Gradient for a cool look */}
                    <linearGradient id="foilGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#e2e8f0" />
                        <stop offset="20%" stopColor="#cbd5e1" />
                        <stop offset="50%" stopColor="#94a3b8" />
                        <stop offset="80%" stopColor="#e2e8f0" />
                        <stop offset="100%" stopColor="#f8fafc" />
                    </linearGradient>
                </defs>
                
                {/* Balloon Shape */}
                <path 
                    d="M50,5 C20,5 5,25 5,60 C5,95 25,115 50,115 C75,115 95,95 95,60 C95,25 80,5 50,5 Z" 
                    fill="url(#foilGradient)" 
                    stroke="#64748b" 
                    strokeWidth="1"
                />
                
                {/* Text */}
                <text 
                    x="50" 
                    y="75" 
                    textAnchor="middle" 
                    fill="#1e293b" 
                    fontSize="50" 
                    fontFamily="Fredoka, sans-serif" 
                    fontWeight="bold"
                    className="drop-shadow-sm"
                >
                    {letter}
                </text>

                {/* Shine Highlights */}
                <ellipse cx="30" cy="30" rx="15" ry="8" fill="white" fillOpacity="0.6" transform="rotate(-45 30 30)" />
                <path d="M50,115 L50,150" stroke="white" strokeWidth="1" strokeOpacity="0.6" />
            </svg>
         </div>
    </motion.div>
);

export const Balloons: React.FC = () => {
  // Generate random decorative balloons
  const balloons = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Percentage width
      delay: Math.random() * 2,
      color: BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)],
      scale: 0.6 + Math.random() * 0.4,
      speed: 7 + Math.random() * 5,
      path: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      sway: Math.random() * 30 - 15
    }));
  }, []);

  const name = "TOSIN".split('');

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background Random Balloons */}
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: '110vh', x: `${b.x}vw` }}
          animate={{ 
            y: '-20vh',
            x: [`${b.x}vw`, `${b.x + (b.sway/10)}vw`, `${b.x - (b.sway/10)}vw`, `${b.x}vw`]
          }}
          transition={{ 
            y: { duration: b.speed, delay: b.delay, ease: "linear", repeat: 0 },
            x: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{ 
            position: 'absolute',
            left: 0,
          }}
        >
            <div className="relative flex flex-col items-center" style={{ transform: `scale(${b.scale})` }}>
                {/* SVG Balloon */}
                <svg width="100" height="120" viewBox="0 0 100 120" className="drop-shadow-lg">
                    <path d={b.path} fill={b.color} />
                    <ellipse cx="30" cy="30" rx="10" ry="20" fill="white" fillOpacity="0.3" transform="rotate(-20 30 30)" />
                </svg>
                <div className="w-[1px] h-24 bg-white/60 origin-top animate-pulse -mt-1" />
            </div>
        </motion.div>
      ))}

      {/* Special TOSIN Name Balloons */}
      {name.map((letter, index) => (
          <LetterBalloon 
            key={`letter-${index}`} 
            letter={letter} 
            delay={2 + index * 0.3} // Staggered start after 2s
            xOffset={(index - 2) * 12} // Center 0, spread -24 to +24 (TOSIN is 5 letters, same as ZIBAH)
          />
      ))}

    </div>
  );
};