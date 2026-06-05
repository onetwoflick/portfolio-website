export interface Project {
  id: string;
  title: string;
  role: string;
  date: string;
  shortDescription: string;
  detailedDescription: string;
  technologies: string[];
  githubLink?: string;
  liveLink?: string;
  image: string;
}

export const projectsData: Project[] = [
  {
    id: 'memory-lane',
    title: 'Down the Memory Lane',
    role: 'Full-Stack Developer',
    date: '2025 - Present',
    shortDescription: 'Engineered a full-stack Next.js app with Supabase and Stripe; designed schemas and implemented auth/payments.',
    detailedDescription: 'Engineered a comprehensive full-stack digital memorial and gallery application. Designed scalable PostgreSQL schemas in Supabase and implemented secure email/OAuth user authentication. Integrated Stripe subscription payment flows to facilitate premium digital memory creation and secure cloud media storage.',
    technologies: ['Next.js', 'Supabase', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    githubLink: 'https://github.com/onetwoflick/memorial-app',
    liveLink: 'https://memorial-app-gules.vercel.app/',
    image: '/memory_lane.png'
  },
  {
    id: 'cyberrunner',
    title: 'STAC CyberRunner',
    role: 'AI Robotics Engineer',
    date: '2025 - 2026',
    shortDescription: 'Re-engineered AI robotics in ROS 2, building perception, state-estimation, and control modules.',
    detailedDescription: 'Re-engineered autonomous robotic systems within the Robot Operating System (ROS 2) environment. Autonomously constructed, debugged, and optimized real-time perception, state-estimation, and navigation modules to enable self-driving capabilities and reactive control in simulated environments.',
    technologies: ['ROS 2', 'Python', 'C++', 'Robotics', 'SLAM', 'Git'],
    githubLink: 'https://github.com/BKaropczyc/STAC_CyberRunner',
    image: '/cyber_robotics.png'
  },
  {
    id: 'gerrymandering',
    title: 'Redistricting Analysis',
    role: 'Geospatial Analyst',
    date: '2022 - 2023',
    shortDescription: 'Geospatial analysis using Python to identify and visualize gerrymandering proposals, presented at MAA.',
    detailedDescription: 'Conducted rigorous geospatial analysis using Python libraries to analyze redistricting proposals and quantify gerrymandering. Created data visualizations mapping population distributions and district deviations, presenting the technical insights directly to professional mathematicians at the Mathematical Association of America (MAA) meeting.',
    technologies: ['Python', 'Pandas', 'Geospatial Data', 'Matplotlib', 'APIs'],
    githubLink: 'https://github.com/onetwoflick',
    image: '/geospatial.png'
  },
  {
    id: 'covid-dashboard',
    title: 'Covid-19 Dashboard',
    role: 'Data Analyst & Developer',
    date: '2022',
    shortDescription: 'Built an interactive R-based dashboard to track localized health trends with automated cleaning.',
    detailedDescription: 'Created a responsive, interactive R-based analytics dashboard to monitor localized health trends. Implemented automated data cleaning routines to process raw public health feeds, resolving data inconsistencies and outputting analysis-ready visualizations.',
    technologies: ['R', 'Shiny', 'Data Cleaning', 'Data Quality', 'Automation'],
    githubLink: 'https://github.com/onetwoflick',
    image: '/covid_dashboard.png'
  }
];
