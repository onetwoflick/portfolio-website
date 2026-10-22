import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  // 1. Instantaneous pointer coordinates (0 lag)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // 2. High-performance trailing spring for outer follower ring
  const springConfig = { damping: 28, stiffness: 380, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const hasEnteredRef = useRef(false);

  useEffect(() => {
    // Detect touch / coarse pointer devices to disable custom cursor on mobile
    const checkDevice = () => {
      const mobile = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasEnteredRef.current) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        smoothX.jump(e.clientX);
        smoothY.jump(e.clientY);
        hasEnteredRef.current = true;
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
      setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
      hasEnteredRef.current = false;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      smoothX.jump(e.clientX);
      smoothY.jump(e.clientY);
      hasEnteredRef.current = true;
      setHidden(false);
    };

    const handleMouseDown = () => {
      setClicked(true);
    };

    const handleMouseUp = () => {
      setClicked(false);
    };

    // Detect hoverable targets
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

      const shouldHover = !!isInteractive;
      setHovered((prev) => (prev !== shouldHover ? shouldHover : prev));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, cursorX, cursorY, smoothX, smoothY]);

  if (isMobile) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-200"
      style={{ opacity: hidden ? 0 : 1 }}
    >
      {/* 1. Fluid Trailing Ring with Smooth Inertia */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none border transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: 32,
          height: 32,
          borderColor: hovered ? 'var(--color-accent)' : 'rgba(148, 163, 184, 0.45)',
          backgroundColor: hovered ? 'rgba(0, 245, 255, 0.08)' : 'rgba(0, 0, 0, 0)',
        }}
        animate={{
          scale: clicked ? 0.75 : hovered ? 1.65 : 1.0,
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 24,
        }}
      />

      {/* 2. Zero-Latency Crisp Focal Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none bg-accent shadow-sm"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
        }}
        animate={{
          scale: hovered ? 0 : clicked ? 0.6 : 1,
        }}
        transition={{
          type: 'tween',
          ease: 'easeOut',
          duration: 0.12,
        }}
      />
    </div>
  );
}
