import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Ultra-snappy spring configuration to prevent heavy feeling while scrolling
  const springConfig = { damping: 20, stiffness: 800, mass: 0.05 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on devices with a fine pointer (PC/Laptop mouse, or stylus like Apple Pencil/S Pen)
    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: smoothX,
        y: smoothY,
        // Offset so the top-left tine acts roughly as the hotspot
        translateX: '-20%',
        translateY: '-20%'
      }}
    >
      <motion.div
        animate={{
          scale: isClicking ? 0.85 : 1,
          rotate: isClicking ? -45 : -25, // Stabs forward on click
          x: isClicking ? -4 : 0,
          y: isClicking ? 4 : 0
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="38"
            height="38"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0px 3px 5px rgba(255, 182, 193, 0.7))' }}
          >
            {/* Outline */}
            <g stroke="#FFD1DC" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
              <path d="M10 4 V11 C10 15 13 17 16 17 C19 17 22 15 22 11 V4" />
              <path d="M16 4 V29" />
            </g>
            {/* Inner */}
            <g stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 4 V11 C10 15 13 17 16 17 C19 17 22 15 22 11 V4" />
              <path d="M16 4 V29" />
            </g>
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
