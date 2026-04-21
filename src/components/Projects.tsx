import { motion } from 'framer-motion';
import { ExternalLink, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "STAC CyberRunner",
    description: "Re-engineered autonomous robotics modules using ROS 2. Built for high-performance navigation and real-time decision making.",
    image: "/cyber_robotics.png",
    tags: ["ROS 2", "Python", "Robotics", "C++"],
    featured: true,
    githubLink: "https://github.com/BKaropczyc/STAC_CyberRunner",
  },
  {
    title: "Down the Memory Lane",
    description: "A full-stack gallery application designed to preserve and showcase digital memories with seamless user authentication and secure cloud storage.",
    image: "/memory_lane.png",
    tags: ["Next.js", "Supabase", "Stripe", "Tailwind"],
    featured: false,
    githubLink: "https://github.com/onetwoflick/memorial-app",
  },
  {
    title: "Gerrymandering Analysis",
    description: "Geospatial data analysis using Python tools to detect and visualize gerrymandering patterns. Presented at the 2023 MAA Meeting.",
    image: "/geospatial.png",
    tags: ["Python", "Geospatial Data", "Pandas"],
    featured: false,
    githubLink: "https://github.com/onetwoflick",
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-surface/30">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glassmorphism rounded-2xl overflow-hidden group hover:border-primary/40 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-secondary/30 shadow-[0_0_10px_rgba(204,255,0,0.2)]">
                    <Star className="text-secondary w-4 h-4 fill-secondary" />
                    <span className="text-xs font-bold text-secondary">Featured</span>
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-textSecondary text-sm mb-6 flex-1 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs font-mono px-2 py-1 bg-white/5 border border-white/10 rounded text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 mt-auto pt-4 border-t border-white/10">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-white transition-colors" aria-label="Github Repo"><FaGithub size={20} /></a>
                  )}
                  <a href="#" className="text-textSecondary hover:text-primary transition-colors" aria-label="Live Project"><ExternalLink size={20} /></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
