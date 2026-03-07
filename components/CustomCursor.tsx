import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation configuration
 const springConfig = { damping: 40, stiffness: 500, mass: 1 };
 
  
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Center the 600px blob on the cursor by subtracting half its size (300px)
  // We use useTransform instead of CSS translateX/Y to avoid Framer Motion conflicts
  const x = useTransform(mouseXSpring, (value) => value - 300);
  const y = useTransform(mouseYSpring, (value) => value - 300);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[600px] h-[600px] bg-blue-500/25 rounded-full pointer-events-none z-0 mix-blend-screen blur-[120px]"
      style={{ x, y }}
    />
  );
};