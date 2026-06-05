import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  onNavigate: (page: string) => void;
}

export default function Header({ isMenuOpen, setIsMenuOpen, onNavigate }: HeaderProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme state on mount
    const hasDark = document.documentElement.classList.contains('dark');
    setIsDark(hasDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 md:px-10 md:py-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Logo & Name */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <motion.button
            onClick={() => onNavigate('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-zinc-900 border border-borderAccent shadow-sm font-mono text-sm font-bold text-accent select-none"
            aria-label="Go to Home"
          >
            [J]
          </motion.button>
          
          <motion.button
            onClick={() => onNavigate('home')}
            className="text-left font-display leading-tight"
          >
            <h1 className="text-sm font-bold tracking-wide text-textPrimary uppercase">Jojo Jose</h1>
            <p className="text-[10px] font-sans font-medium tracking-widest text-textSecondary uppercase">Cybersecurity & CS</p>
          </motion.button>
        </div>

        {/* Right Side: Navigation Triggers */}
        <div className="flex items-center gap-6 pointer-events-auto">
          {/* Static English Indicator */}
          <div className="hidden sm:block text-xs font-display tracking-widest font-bold text-textSecondary select-none">
            EN
          </div>

          {/* Theme Toggler (Circle filled with custom design) */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-borderAccent flex items-center justify-center relative overflow-hidden shadow-sm"
            aria-label="Toggle dark/light theme"
          >
            <motion.div
              animate={{ rotate: isDark ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-6 h-6 flex items-center justify-center text-textPrimary"
            >
              {isDark ? (
                // Sun Icon for dark mode (to toggle back to light)
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                // Moon Icon for light mode (to toggle back to dark)
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </motion.div>
          </motion.button>

          {/* Hamburger Menu Trigger */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-borderAccent flex items-center justify-center shadow-sm relative"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-5 h-5 flex flex-col justify-center items-center gap-1.5 relative">
              {/* Top row */}
              <motion.span
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 5.5 : 0,
                  width: isMenuOpen ? 18 : 16,
                }}
                transition={{ duration: 0.2 }}
                className="h-[2px] bg-textPrimary rounded-full block"
                style={{ width: 16 }}
              />
              {/* Middle row */}
              <motion.span
                animate={{
                  opacity: isMenuOpen ? 0 : 1,
                  scale: isMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="h-[2px] w-[16px] bg-textPrimary rounded-full block"
              />
              {/* Bottom row */}
              <motion.span
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -5.5 : 0,
                  width: isMenuOpen ? 18 : 16,
                }}
                transition={{ duration: 0.2 }}
                className="h-[2px] bg-textPrimary rounded-full block"
                style={{ width: 16 }}
              />
            </div>
          </motion.button>
        </div>
        
      </div>
    </header>
  );
}
