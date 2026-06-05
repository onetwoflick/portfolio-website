import { motion } from 'framer-motion';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  // Stagger reveal animations for lines of text
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15, duration: 0.8 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-start px-6 md:px-12 max-w-5xl mx-auto pt-24 pb-12 select-none">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col gap-6 md:gap-8"
      >
        {/* Large Heading Section */}
        <motion.div variants={itemVariants} className="flex flex-col">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-textPrimary leading-none">
            Hey, I’m
          </h2>
          <div className="flex flex-wrap gap-x-4 md:gap-x-6 items-baseline mt-1 md:mt-2">
            <span className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-accent relative inline-block group">
              Jojo
              <span className="absolute left-0 bottom-1 w-full h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </span>
            <span className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-accent relative inline-block group">
              Jose
              <span className="absolute left-0 bottom-1 w-full h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </span>
          </div>
        </motion.div>

        {/* Sub-greeting */}
        <motion.h3
          variants={itemVariants}
          className="font-display text-2xl sm:text-4xl font-medium text-textPrimary"
        >
          But you can call me{' '}
          <span className="text-accent hover:underline decoration-wavy decoration-2 transition-all">
            Jojo
          </span>
          .
        </motion.h3>

        {/* Roles Description */}
        <motion.div variants={itemVariants} className="max-w-2xl mt-2 flex flex-col gap-2">
          <p className="font-sans text-base sm:text-lg text-textSecondary leading-relaxed">
            I’m a versatile Computer Science graduate & Cybersecurity candidate. I specialize in streamlining data workflows, securing networks, and building automated, high-performance systems.
          </p>
        </motion.div>

        {/* Action Links */}
        <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-6">
          <button
            onClick={() => onNavigate('work')}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <span className="font-display font-bold text-sm tracking-wider uppercase text-textPrimary group-hover:text-accent transition-colors duration-200">
              → See my projects
            </span>
            <span className="h-px bg-textPrimary group-hover:bg-accent w-12 group-hover:w-20 transition-all duration-300" />
          </button>

          <button
            onClick={() => onNavigate('about')}
            className="group flex items-center gap-3 text-left focus:outline-none"
          >
            <span className="font-display font-bold text-sm tracking-wider uppercase text-textPrimary group-hover:text-accent transition-colors duration-200">
              → More about me
            </span>
            <span className="h-px bg-textPrimary group-hover:bg-accent w-12 group-hover:w-20 transition-all duration-300" />
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
}
