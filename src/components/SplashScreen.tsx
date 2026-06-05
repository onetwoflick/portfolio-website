import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LOGS = [
  '[ SYSTEM ] Booting Jojo Jose Portfolio Engine...',
  '[ NETWORK ] Establishing TLS v1.3 secure handshake...',
  '[ DATA ] Loading analytical engine & database schemas...',
  '[ ROBOTICS ] Subscribing to ROS 2 control topics...',
  '[ SECURITY ] Checking integrity constraints... OK',
  '[ SYSTEM ] Welcome to JOJO_OS v1.0. Welcome online.',
];

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Typing sequence for terminal logs
    if (currentLineIndex < BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        setVisibleLogs((prev) => [...prev, BOOT_LOGS[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, 280);
      return () => clearTimeout(timer);
    } else {
      // Hold the final logs on screen for a moment, then fade out
      const fadeTimer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 700);
      return () => clearTimeout(fadeTimer);
    }
  }, [currentLineIndex]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-[#0d0e13] text-white p-6 md:p-12 font-mono select-none"
        >
          <div className="max-w-xl w-full flex flex-col gap-10">
            
            {/* Top Branding Section: Terminal Brackets Logo */}
            <div className="flex items-center gap-4 border-b border-zinc-800 pb-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl font-bold text-[#78ffd1] tracking-tight flex items-center"
              >
                <span>[</span>
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="px-1.5"
                >
                  JJ
                </motion.span>
                <span>]</span>
              </motion.div>
              
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-wider text-zinc-300 uppercase">JOJO_OS Terminal</span>
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest">Version 1.0.0 // SECURE CONNECT</span>
              </div>
            </div>

            {/* Console Log Area */}
            <div className="h-48 flex flex-col justify-start gap-2 text-xs text-zinc-400">
              {visibleLogs.map((log, index) => {
                const isSuccess = log.includes('OK') || log.includes('Welcome');
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`leading-relaxed ${isSuccess ? 'text-[#78ffd1]' : ''}`}
                  >
                    {log}
                  </motion.div>
                );
              })}
              
              {/* Pulsing Command Prompt Cursor */}
              {currentLineIndex < BOOT_LOGS.length && (
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-zinc-600 animate-pulse">jojo-security@root:~#</span>
                  <span className="w-1.5 h-3.5 bg-accent block animate-[ping_1s_infinite]" />
                </div>
              )}
            </div>

            {/* Bottom spacer / loading indicators */}
            <div className="flex justify-between items-center text-[10px] text-zinc-600 border-t border-zinc-900 pt-4">
              <span>CIPHER: AES-GCM-256</span>
              <span>PORT: 5173</span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
