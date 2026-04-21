import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: "Peer Mentor, RHIME",
    company: "St. Thomas Aquinas College",
    period: "Sept 2023 to May 2024",
    description: "Mentored computer science students in programming fundamentals, algorithms, and data structures. Facilitated workshops on best coding practices."
  },
  {
    role: "GIS Intern",
    company: "Veolia",
    period: "Jun 2023 to Aug 2023",
    description: "Automated workflows and resolved data inconsistencies. Managed geographic information systems for water utility operations, leveraging data to drive strategic decisions."
  },
  {
    role: "Computer Aide Intern",
    company: "Orange & Rockland",
    period: "Aug 2022 to Aug 2022",
    description: "Supported IT operations, maintained databases, and developed scripts to streamline data processing tasks, improving overall efficiency."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <Briefcase className="text-secondary" /> 
            Experience Timeline
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-transparent" />
        </motion.div>

        <div className="relative border-l border-white/20 ml-4 md:ml-0">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-12 ml-8 relative"
            >
              <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-background border-2 border-secondary shadow-[0_0_10px_rgba(204,255,0,0.5)]" />
              
              <div className="glassmorphism p-6 rounded-xl border border-white/5 hover:border-secondary/30 hover:shadow-[0_0_20px_rgba(204,255,0,0.1)] transition-all duration-300 group">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-secondary transition-colors">{exp.role}</h3>
                  <span className="text-primary font-mono text-sm mt-1 md:mt-0">{exp.period}</span>
                </div>
                <h4 className="text-lg text-textSecondary mb-4 font-medium">{exp.company}</h4>
                <p className="text-textSecondary leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
