import Hero from './components/Hero';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-white font-sans text-textPrimary">
      {/* Subtle dynamic background effect */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.05) 0%, rgba(10, 10, 10, 1) 100%)' }} />
      
      <div className="relative z-10">
        <Hero />
        <TechStack />
        <Experience />
        <Projects />
        <Education />
        <Footer />
      </div>
    </div>
  );
}

export default App;
