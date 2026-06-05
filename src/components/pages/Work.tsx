import { motion } from 'framer-motion';
import { type Project, projectsData } from '../../data/projects';

interface WorkProps {
  onSelectProject: (index: number) => void;
}

export default function Work({ onSelectProject }: WorkProps) {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen px-6 md:px-12 max-w-5xl mx-auto pt-32 pb-16 select-none">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-textPrimary">
          Selected Work
        </h2>
        <p className="font-sans text-sm text-textSecondary mt-2">
          A collection of software development, AI robotics, and data analysis projects.
        </p>
      </motion.div>

      {/* Projects Table List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col border-t border-borderAccent"
      >
        {projectsData.map((project: Project, index: number) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            onClick={() => onSelectProject(index)}
            className="group flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-borderAccent hover:bg-surface/30 px-2 transition-all duration-300 cursor-pointer relative"
          >
            {/* Left side: Date & Title & Role */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
              {/* Year */}
              <span className="font-mono text-xs text-textSecondary/75 tracking-wider w-20">
                {project.date}
              </span>
              
              {/* Project Title and Role */}
              <div className="flex flex-col">
                <span className="font-display text-xl sm:text-2xl font-bold text-textPrimary group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </span>
                <span className="font-sans text-xs text-textSecondary font-medium mt-0.5">
                  {project.role}
                </span>
              </div>
            </div>

            {/* Right side: Technologies & Action Indicator */}
            <div className="flex items-center justify-between md:justify-end gap-6 mt-4 md:mt-0">
              {/* Technologies list */}
              <div className="flex flex-wrap gap-1.5 max-w-xs md:max-w-md justify-start md:justify-end">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="font-sans text-[10px] tracking-wide uppercase px-2 py-0.5 rounded border border-borderAccent bg-surface text-textSecondary"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="font-sans text-[10px] tracking-wide text-textSecondary/50 font-bold px-1 py-0.5">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {/* Slide-in arrow */}
              <span className="text-xl text-textSecondary group-hover:text-accent transform translate-x-0 group-hover:translate-x-1.5 transition-all duration-200">
                →
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
