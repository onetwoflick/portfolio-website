import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', path: '/', id: 'home' },
    { name: 'Work', path: '/work', id: 'work' },
    { name: 'About', path: '/about', id: 'about' },
    { name: 'Contact', path: '/contact', id: 'contact' },
  ];

  const handleLinkClick = (path: string) => {
    navigate(path);
    onClose();
  };

  // Stagger container animation configs
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  // Individual item reveal configs
  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.3, duration: 0.3 } }}
          className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl overflow-y-auto select-none"
        >
          <div className="min-h-screen flex flex-col justify-between px-8 sm:px-16 md:px-24 py-16 max-w-7xl mx-auto w-full">
            {/* Main List */}
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6 sm:gap-8 mt-12"
            >
              {menuItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path === '/work' && location.pathname.startsWith('/project/'));
                return (
                  <div key={item.id} className="overflow-hidden py-1">
                    <motion.div variants={itemVariants}>
                      <button
                        onClick={() => handleLinkClick(item.path)}
                        className="group flex items-center gap-6 text-left relative focus:outline-none"
                      >
                        {/* Active Indicator Line */}
                        <span
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            isActive
                              ? 'bg-accent scale-100'
                              : 'bg-transparent scale-0 group-hover:bg-textSecondary/40 group-hover:scale-75'
                          }`}
                        />
                        
                        <span
                          className={`font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight transition-colors duration-300 ${
                            isActive
                              ? 'text-accent'
                              : 'text-textPrimary hover:text-accent'
                          }`}
                        >
                          {item.name}
                        </span>

                        {/* Sliding Arrow on Hover */}
                        <span className="opacity-0 -translate-x-4 text-accent font-display text-3xl sm:text-5xl transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                          →
                        </span>
                      </button>
                    </motion.div>
                  </div>
                );
              })}
            </motion.nav>

            {/* Social Links and Contact Info at bottom */}
            <div className="border-t border-borderAccent mt-12 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              {/* Social Links */}
              <div className="flex gap-8">
                <a
                  href="https://github.com/onetwoflick"
                  target="_blank"
                  rel="noreferrer"
                  className="font-display font-medium text-textSecondary hover:text-accent transition-colors duration-200 text-sm tracking-widest uppercase"
                >
                  ↗ GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/jojo-jose-one-two/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-display font-medium text-textSecondary hover:text-accent transition-colors duration-200 text-sm tracking-widest uppercase"
                >
                  ↗ LinkedIn
                </a>
              </div>

              {/* Direct Email Link */}
              <div>
                <p className="text-[10px] font-display font-bold tracking-widest text-textSecondary uppercase mb-1">
                  Say hello
                </p>
                <a
                  href="mailto:jojojose2003@gmail.com"
                  className="font-sans font-medium text-textPrimary hover:text-accent transition-colors duration-200 text-sm"
                >
                  jojojose2003@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
