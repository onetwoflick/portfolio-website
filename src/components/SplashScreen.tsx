import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(() => {
    return !sessionStorage.getItem('jojo_splash_viewed');
  });

  useEffect(() => {
    if (!isVisible) return;
    document.body.style.overflow = 'hidden';

    // Snappy, refined entrance: 0.85s total
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('jojo_splash_viewed', 'true');
      document.body.style.overflow = '';
    }, 850);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="editorial-splash"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -16,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col justify-center items-center bg-bg text-textPrimary select-none pointer-events-auto"
        >
          <div className="flex flex-col items-center gap-4 text-center px-6">
            {/* Elegant Minimalist Monogram / Name */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-textPrimary"
            >
              Jojo Jose
            </motion.h1>

            {/* Fine architectural line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-16 h-px bg-accent origin-center"
            />

            {/* Quiet Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.35 }}
              className="font-sans text-xs sm:text-sm text-textSecondary uppercase tracking-widest font-medium"
            >
              Cybersecurity & CS Portfolio
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
