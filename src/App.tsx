import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [page, setPage] = useState<string>('home');
  const [projectIndex, setProjectIndex] = useState<number>(0);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

  const handleSelectProject = (index: number) => {
    setProjectIndex(index);
    setPage('project-detail');
  };

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Home onNavigate={setPage} />;
      case 'work':
        return <Work onSelectProject={handleSelectProject} />;
      case 'project-detail':
        return (
          <ProjectDetail
            projectIndex={projectIndex}
            onNavigateBack={() => setPage('work')}
            onSelectProject={handleSelectProject}
          />
        );
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={setPage} />;
    }
  };

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
        onNavigate={setPage}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* 5. Navigation Full-Screen Overlay */}
      <NavigationMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={setPage}
        currentPage={page}
      />

      {/* 6. Dynamic Animated Content Container */}
      <main className="relative z-10 w-full min-h-screen flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={page === 'project-detail' ? `detail-${projectIndex}` : page}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 w-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
