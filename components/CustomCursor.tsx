import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth out the movement
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Disable completely on mobile touched devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        pointerEvents: 'none',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
      }}
      className="hidden md:flex items-center justify-center w-8 h-8 rounded-full mix-blend-difference"
    >
      <motion.div
        animate={{
          scale: isHovered ? 2.5 : 1,
          opacity: isHovered ? 0.2 : 0.8,
          borderColor: isHovered ? '#00ffff' : '#fff',
        }}
        transition={{ duration: 0.2 }}
        className="w-full h-full rounded-full border-2 border-white bg-transparent shadow-[0_0_10px_#00ffff]"
      />
      <motion.div
        animate={{
          scale: isHovered ? 0 : 1,
          backgroundColor: isHovered ? 'transparent' : '#00ffff',
        }}
        className="absolute w-2 h-2 rounded-full"
      />
    </motion.div>
  );
};

export default CustomCursor;
