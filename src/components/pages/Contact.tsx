import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-start px-6 md:px-12 max-w-5xl mx-auto pt-24 pb-12 select-none">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-col gap-6"
      >
        <span className="text-[10px] font-display font-bold tracking-[0.2em] text-textSecondary/50 uppercase">
          Get in touch
        </span>

        {/* Large Email Link */}
        <div className="overflow-hidden py-1">
          <a
            href="mailto:jojojose2003@gmail.com"
            className="group flex flex-col sm:flex-row items-baseline gap-2 sm:gap-4 font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-textPrimary hover:text-accent transition-colors duration-300"
          >
            <span>jojojose2003@gmail.com</span>
            <span className="text-accent group-hover:translate-x-2 transition-transform duration-300 text-2xl sm:text-4xl md:text-5xl">
              →
            </span>
          </a>
        </div>

        <p className="font-sans text-sm sm:text-base text-textSecondary max-w-lg mt-2 leading-relaxed">
          I’m always open to discussing new opportunities, full-stack projects, data workflows, or troubleshooting IT challenges. Feel free to shoot me an email!
        </p>

        {/* Socials Grid */}
        <div className="border-t border-borderAccent mt-8 pt-8 flex gap-8">
          <a
            href="https://github.com/onetwoflick"
            target="_blank"
            rel="noreferrer"
            className="font-display font-bold text-xs tracking-widest text-textSecondary hover:text-accent uppercase transition-colors"
          >
            ↗ GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jojo-jose-9001b3218/"
            target="_blank"
            rel="noreferrer"
            className="font-display font-bold text-xs tracking-widest text-textSecondary hover:text-accent uppercase transition-colors"
          >
            ↗ LinkedIn
          </a>
        </div>
      </motion.div>
    </div>
  );
}
