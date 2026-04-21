import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

export default function Education() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <GraduationCap className="text-primary" /> 
            Education & Awards
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-transparent mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glassmorphism p-8 rounded-2xl border border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-colors"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] group-hover:bg-primary/20 transition-colors" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative z-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">B.S. in Computer Science</h3>
              <p className="text-lg text-primary font-medium">St. Thomas Aquinas College</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <span className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xl font-mono text-secondary shadow-[0_0_15px_rgba(204,255,0,0.15)]">
                3.9 GPA
              </span>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 relative z-10">
            <div className="flex items-start gap-3">
              <Award className="text-secondary mt-1 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Aquinas Leader Status</h4>
                <p className="text-textSecondary leading-relaxed">Recognized for outstanding academic achievement and leadership within the college community. Dedicated to continuous learning and community contribution.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
