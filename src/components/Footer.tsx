import { Mail, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer id="contact" className="py-12 border-t border-white/10 bg-black/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-glass-gradient opacity-50 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">Ready to collaborate?</h2>
          <p className="text-textSecondary">Let's build scalable systems and turn data into insights.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <a 
            href="mailto:jojojose2003@gmail.com" 
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-background font-bold hover:bg-primary/90 transition-colors shadow-[0_0_10px_rgba(0,240,255,0.3)]"
          >
            <Mail size={18} />
            Email Me
          </a>
          <a 
            href="#" 
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg glassmorphism hover:bg-white/10 transition-colors font-medium border border-white/20 text-white"
          >
            <Download size={18} />
            Download Resume
          </a>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-textSecondary relative z-10">
        <p>© {new Date().getFullYear()} Jojo Jose. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/onetwoflick" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Github Profile"><FaGithub size={20} /></a>
          <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn Profile"><FaLinkedin size={20} /></a>
        </div>
      </div>
    </footer>
  );
}
