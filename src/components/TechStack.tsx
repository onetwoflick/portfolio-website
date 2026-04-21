import { motion } from 'framer-motion';

const techStack = [
  "Python", "R", "SQL (PostgreSQL/MySQL)", "Next.js", "React", "Tailwind CSS", "Supabase", "ROS 2", "Node.js", "Git"
];

export default function TechStack() {
  return (
    <section className="py-12 border-y border-white/10 bg-surface/50 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="container mx-auto px-6 mb-8 relative z-20">
        <h2 className="text-sm font-bold uppercase tracking-widest text-textSecondary text-center">Core Technologies</h2>
      </div>
      
      <div className="relative flex overflow-x-hidden">
        <motion.div 
          className="flex whitespace-nowrap gap-6 px-4"
          animate={{ x: [0, -1000] }} 
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...techStack, ...techStack, ...techStack].map((tech, index) => (
            <div 
              key={index}
              className="px-6 py-3 rounded-full glassmorphism text-primary font-medium border border-primary/20 shadow-[0_0_10px_rgba(0,240,255,0.05)] hover:border-primary/50 transition-colors cursor-default"
            >
              {tech}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
