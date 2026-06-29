import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import logoImg from '../assets/images/midnight_brew_logo_1782467675049.jpg';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1800); // Faster loading (1.8 seconds)
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF6F0]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="relative w-80 h-80 flex flex-col items-center justify-center">
        <svg
          viewBox="0 0 280 280"
          className="w-full h-full overflow-visible drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="cup-clip">
              <path d="M 134 160 L 204 160 C 204 210 189 220 169 220 C 149 220 134 210 134 160 Z" />
            </clipPath>
          </defs>
            
          {/* Steam */}
          <motion.path
            d="M 155 150 C 145 130 165 110 155 90"
            fill="none"
            stroke="#CAA662"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0, y: 15, scale: 0.9 }}
            animate={{ pathLength: 1, opacity: [0, 0.6, 0], y: -15, scale: 1.1 }}
            transition={{ duration: 2.0, delay: 1.0, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 180 155 C 190 135 170 115 180 95"
            fill="none"
            stroke="#CAA662"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0, y: 15, scale: 0.9 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0], y: -20, scale: 1.1 }}
            transition={{ duration: 2.2, delay: 1.2, repeat: Infinity, ease: "linear" }}
          />

          {/* Kettle */}
          <motion.g
            initial={{ rotate: -25, x: -40, y: -20, opacity: 0 }}
            animate={{ rotate: 30, x: 0, y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 40, 
              damping: 14, 
              mass: 0.8,
              delay: 0.1 
            }}
            style={{ transformOrigin: "85px 95px" }}
          >
            <g stroke="#CAA662" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* Body */}
              <path d="M 50 130 L 120 130 L 105 60 L 65 60 Z" fill="#FAF6F0" />
              {/* Lid */}
              <path d="M 60 60 L 110 60 L 100 50 L 70 50 Z" fill="#FAF6F0"/>
              {/* Lid Knob */}
              <circle cx="85" cy="45" r="4" fill="#FAF6F0"/>
              {/* Handle */}
              <path d="M 60 70 L 35 70 C 25 70 25 110 35 110 L 45 110" />
              {/* Gooseneck Spout */}
              <path d="M 115 115 C 145 115 140 65 155 60 C 160 58 165 62 165 65" />
            </g>
          </motion.g>

          {/* Cup Fill & Handle */}
          <motion.g
            initial={{ y: 35, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 50, 
              damping: 16,
              mass: 0.8, 
              delay: 0.2 
            }}
          >
            {/* Handle Fill & Outline */}
            <path 
              d="M 204 170 C 229 170 229 200 194 205" 
              stroke="#CAA662" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" 
            />
            {/* Cup Body Fill (Opaque background for liquid) */}
            <path 
              d="M 134 160 L 204 160 C 204 210 189 220 169 220 C 149 220 134 210 134 160 Z" 
              fill="#FAF6F0" 
            />
          </motion.g>

          {/* Coffee liquid fill (inside cup) */}
          <g clipPath="url(#cup-clip)">
            <motion.rect 
              x="130" y="150" width="80" height="80" 
              fill="#2A1810"
              initial={{ y: 70 }}
              animate={{ y: 15 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            />
          </g>

          {/* Cup Body Outline (On top of liquid) */}
          <motion.path 
            initial={{ y: 35, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 50, 
              damping: 16,
              mass: 0.8, 
              delay: 0.2 
            }}
            d="M 134 160 L 204 160 C 204 210 189 220 169 220 C 149 220 134 210 134 160 Z" 
            stroke="#CAA662" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" 
          />

          {/* Coffee Stream */}
          <motion.path
            d="M 169 109 L 169 190"
            stroke="#2A1810"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{ 
              duration: 1.2, 
              delay: 0.5, 
              times: [0, 0.4, 1],
              ease: "linear",
              opacity: { duration: 1.2, times: [0, 0.1, 1], ease: "linear" } 
            }}
          />
        </svg>

        {/* Brand Text Below SVG */}
        <motion.div
          className="flex flex-col items-center justify-center w-full -mt-6 sm:-mt-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-[#CAA662]/40 shadow-inner bg-[#FAF6F0] flex items-center justify-center shrink-0">
              <img src={logoImg} alt="The Midnight Brew Logo" className="relative z-10 w-full h-full object-cover" referrerPolicy="no-referrer" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <span className="font-cursive text-3xl sm:text-4xl font-bold tracking-wide text-[#2A1810]">
              The Midnight Brew
            </span>
          </div>
          <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#2A1810]/60 mt-2">
            Café & Eatery
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
