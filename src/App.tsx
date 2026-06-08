import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { projectsData } from './data/projects';

// Global Effects & Navigation
import SplashScreen from './components/SplashScreen';
import CustomCursor from './components/CustomCursor';
import InteractiveCanvas from './components/InteractiveCanvas';
import Header from './components/Header';
import NavigationMenu from './components/NavigationMenu';

// Page Components
import Home from './components/pages/Home';
import Work from './components/pages/Work';
import ProjectDetail from './components/pages/ProjectDetail';
import About from './components/pages/About';
import Contact from './components/pages/Contact';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  // Scroll restoration: force window to scroll back to top of page on path changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // SEO Page Titles: update document title dynamically based on active path
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      document.title = 'Jojo Jose | Cybersecurity & CS Portfolio';
    } else if (path === '/work') {
      document.title = 'Selected Projects | Jojo Jose';
    } else if (path === '/about') {
      document.title = 'About Me | Jojo Jose';
    } else if (path === '/contact') {
      document.title = 'Contact & Get In Touch | Jojo Jose';
    } else if (path.startsWith('/project/')) {
      const projectId = path.split('/').pop();
      const project = projectsData.find((p) => p.id === projectId);
      if (project) {
        document.title = `${project.title} | Projects | Jojo Jose`;
      } else {
        document.title = 'Project Details | Jojo Jose';
      }
    } else {
      document.title = 'Jojo Jose | Portfolio';
    }
  }, [location.pathname]);

  // Initialize theme choice state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme === 'dark' || (!savedTheme && prefersDark);
  });

  // Synchronize document theme class with isDark state
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-bg text-textPrimary selection:bg-accent selection:text-bg overflow-x-hidden relative">
      {/* 1. Loader Screen */}
      <SplashScreen />

      {/* 2. Custom Spring Cursor */}
      <CustomCursor />

      {/* 3. Orbiting Canvas Geometry Background */}
      <InteractiveCanvas />

      {/* 4. Top Overlay Header */}
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* 5. Navigation Full-Screen Overlay */}
      <NavigationMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {/* 6. Dynamic Animated Content Container */}
      <main className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
