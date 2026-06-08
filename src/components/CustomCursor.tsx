import { useEffect, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  // Framer Motion motion values for high-performance coordinate tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Detect touch-screen device
    const checkDevice = () => {
      const mobile = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    // Global listener for interactive hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive') ||
        target.getAttribute('data-hover') === 'true';

      setHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, mouseX, mouseY, hidden]);

  if (isMobile || hidden) return null;

  return (
    <>
      {/* Outer Spring Ring (Lag-free Rounded Circle) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 30,
          height: 30,
          border: hovered ? '1.5px solid var(--color-accent)' : '1px solid var(--color-text-primary)',
          backgroundColor: hovered ? 'rgba(120, 255, 209, 0.05)' : 'rgba(0,0,0,0)',
        }}
        animate={{
          scale: hovered ? 2.0 : 1.0,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.18 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          backgroundColor: 'var(--color-accent)',
        }}
        animate={{
          scale: hovered ? 0 : 1,
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.15 }}
      />
    </>
  );
}
