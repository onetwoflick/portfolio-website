import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

export default function About() {
  const skills = [
    'Python', 'R', 'Next.js', 'ROS 2', 'Git', 'APIs', 
    'AWS S3', 'SQL (MySQL/Postgres)', 'Supabase', 'Data Visualization', 
    'Data Cleaning', 'Data Quality', 'Automation', 'Technical Troubleshooting', 
    'Problem Solving', 'Technical Communication', 'MS Excel'
  ];

  const experiences = [
    {
      role: 'Peer Mentor',
      company: 'RHIME STAC, Sparkill, NY',
      date: 'Sept 2023 – May 2024',
      bulletPoints: [
        'Developed and optimized R scripts to automate the cleaning, validation, and integration of large datasets, ensuring 100% analysis-ready outputs and improving system reliability.',
        'Visualized trend analyses and mentored peers on debugging and data standards, translating complex technical findings into actionable reports for non-technical leadership.'
      ]
    },
    {
      role: 'GIS Intern',
      company: 'Veolia, West Nyack, NY',
      date: 'Jun 2023 – Aug 2023',
      bulletPoints: [
        'Leveraged Python and enterprise GIS tools to standardize asset records, improving data traceability and integrity across critical infrastructure systems.',
        'Automated data retrieval from AWS S3 using Python, identifying and flagging system inconsistencies to facilitate rapid root-cause investigations.',
        'Reconciled high-volume mismatched records by validating identifiers, resulting in a cleansed, high-fidelity dataset for executive-level reporting.'
      ]
    },
    {
      role: 'Computer Aide Intern',
      company: 'Orange & Rockland, Pearl River, NY',
      date: 'Aug 2022 – Aug 2022',
      bulletPoints: [
        'Transformed raw operational records into standardized, analysis-ready datasets using Python, increasing efficiency for downstream trend analysis.',
        'Executed complex SQL queries (MySQL/PostgreSQL) to troubleshoot data anomalies and enforce quality control protocols for sensitive technical data.',
        'Summarized complex findings and data limitations for leadership, translating technical results into clear takeaways to guide next steps.'
      ]
    }
  ];

  const educations = [
    {
      degree: 'M.S. Cybersecurity',
      school: 'University of West Florida, Pensacola, FL',
      date: 'Expected 2028'
    },
    {
      degree: 'B.S. Computer Science, Minor: Data Science',
      school: 'St. Thomas Aquinas College, Sparkill, NY',
      date: 'May 2025',
      gpa: 'GPA: 3.9'
    }
  ];

  return (
    <div className="min-h-screen px-6 md:px-12 max-w-5xl mx-auto pt-32 pb-24 select-none">
      
      {/* Introduction Bio */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-borderAccent pb-12 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-7 flex flex-col gap-6"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-textPrimary">
            About Me
          </h2>
          <p className="font-sans text-lg text-textSecondary leading-relaxed">
            I’m Jojo Jose, a versatile Computer Science graduate and M.S. Cybersecurity student seeking entry-level opportunities in Software Development, Data Analysis, or IT Support.
          </p>
          <p className="font-sans text-sm sm:text-base text-textSecondary/80 leading-relaxed">
            I have a proven track record in Python/R automation, SQL database management, and technical troubleshooting. I’m expert at streamlining data workflows, ensuring data quality, and communicating complex technical findings to cross-functional stakeholders.
          </p>
        </motion.div>

        {/* Sidebar widgets (Resume download & Spotify mockup widget) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="md:col-span-5 flex flex-col gap-6 md:pl-4 justify-between"
        >
          {/* Resume PDF Download Link */}
          <a
            href="/resume.pdf"
            download="Jojo_Jose_Resume.pdf"
            className="group w-full py-4 rounded-xl border border-borderAccent bg-surface flex items-center justify-center gap-3 text-sm font-display font-bold tracking-wider uppercase text-textPrimary hover:text-accent hover:border-accent transition-all duration-300"
          >
            <FaDownload className="text-textSecondary group-hover:text-accent transition-colors" />
            Download Resume
          </a>

          {/* Spotify Interactive Embed Widget (100% legal, license-compliant audio player) */}
          <div className="w-full">
            <iframe
              style={{ borderRadius: '12px', border: 'none', overflow: 'hidden' }}
              src="https://open.spotify.com/embed/track/2LD2gT7gwAurzdQDQtILds"
              width="100%"
              height="152"
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>

      {/* Main timeline grids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
        {/* Left Column: Experience */}
        <div className="md:col-span-2 flex flex-col gap-10">
          <div>
            <h3 className="font-display text-2xl font-bold text-textPrimary border-b border-borderAccent pb-3 mb-6">
              Experience
            </h3>
            <div className="flex flex-col gap-8">
              {experiences.map((exp) => (
                <div key={exp.company} className="flex flex-col gap-2 relative pl-4 border-l border-borderAccent">
                  <span className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="font-sans font-bold text-base text-textPrimary">
                      {exp.role}
                    </h4>
                    <span className="font-mono text-sm text-textSecondary font-semibold">
                      {exp.date}
                    </span>
                  </div>
                  <span className="font-sans text-xs text-accent font-medium uppercase tracking-wide">
                    {exp.company}
                  </span>
                  <ul className="list-disc list-outside ml-4 mt-2 flex flex-col gap-1.5 text-xs text-textSecondary leading-relaxed">
                    {exp.bulletPoints.map((bp, i) => (
                      <li key={i}>{bp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Education, Skills, Awards */}
        <div className="flex flex-col gap-10">
          {/* Education Block */}
          <div>
            <h3 className="font-display text-2xl font-bold text-textPrimary border-b border-borderAccent pb-3 mb-6">
              Education
            </h3>
            <div className="flex flex-col gap-6">
              {educations.map((edu) => (
                <div key={edu.degree} className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-textSecondary font-semibold tracking-wide">
                    {edu.date}
                  </span>
                  <h4 className="font-sans font-bold text-sm text-textPrimary">
                    {edu.degree}
                  </h4>
                  <p className="font-sans text-xs text-textSecondary">
                    {edu.school}
                  </p>
                  {edu.gpa && (
                    <span className="text-[10px] font-mono bg-accent/10 border border-accent/20 px-1.5 py-0.5 rounded text-accent font-bold w-fit mt-1">
                      {edu.gpa}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Honors/Awards Block */}
          <div>
            <h3 className="font-display text-xl font-bold text-textPrimary border-b border-borderAccent pb-2 mb-4">
              Honors & Awards
            </h3>
            <ul className="list-disc list-inside flex flex-col gap-2 font-sans text-xs text-textSecondary leading-relaxed">
              <li>Aquinas Leaders Program</li>
              <li>Academic Scholarship Award Recipient</li>
              <li>Dean's List (STAC)</li>
            </ul>
          </div>

          {/* Skills Block */}
          <div>
            <h3 className="font-display text-xl font-bold text-textPrimary border-b border-borderAccent pb-2 mb-4">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="font-sans text-xs tracking-wide uppercase px-2 py-0.5 rounded border border-borderAccent bg-surface text-textSecondary font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
