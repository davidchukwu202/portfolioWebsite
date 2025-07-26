import {
  Brain,
  Code2,
  Globe,
  Github,
  Linkedin,
  MessageCircle,
  Twitter,
  Lightbulb,
  Server,
} from 'lucide-react';

// Personal Information - EXACT from your resume
export const personalInfo = {
  name: 'Chukwuebuka Chukwu',
  title: 'Software Engineer',
  tagline: 'Building scalable solutions and clean energy innovations',
  email: 'davidebuka202@gmail.com',
  phone: '+2347040818138',
  location: 'Nigeria',
  timezone: 'WAT (UTC+1)',
  github: 'https://github.com/davidchukwu202',
  linkedin: 'https://www.linkedin.com/in/chukwuebuka-chukwu-7a8470279/',
  twitter: 'https://x.com/the_davidchukwu',
  whatsapp: 'https://wa.me/2347040818138',
  profileImage: '/placeholder.svg?height=300&width=300',
  resumeUrl: null, // Will be set when user uploads a resume
  resumeFile: null, // Will store the uploaded file
  profileSummary:
    'Resourceful Software Engineer with a strong focus on backend development, passionate about translating complex requirements into secure, scalable solutions that meet real-world needs. Founder of DEC Tech, a growing solar energy brand with a focus on clean energy delivery, backend automation, and AI-powered customer support. Strong in backend architecture using Node.js, Express, and MongoDB, with experience managing product development from concept to deployment. Skilled in leading product vision, coordinating development, and building systems designed for scale.',
};

// Hero Section Content
export const heroContent = {
  philosophy: `Resourceful Software Engineer with a strong focus on backend development, passionate about translating complex requirements into secure, scalable solutions that meet real-world needs. As the Founder of DEC Tech, I'm building a growing solar energy brand with a focus on clean energy delivery, backend automation, and AI-powered customer support.`,
  terminalLines: [
    '> initializing_backend_architecture...',
    '> connecting_mongodb_cluster...',
    '> deploying_solar_platform...',
    '> optimizing_api_performance...',
    '> dec_tech_system_ready ✓',
  ],
};

// Professional Experience - EXACT from your resume
export const experience = [
  {
    title: 'Founder and Software Engineer',
    company: 'Dec Tech',
    period: '2025 – present',
    achievements: [
      'Founded DEC Tech, a clean energy brand offering solar products and smart backend support tools for energy consumers in Nigeria.',
      'Designed and built the backend architecture using Node.js, Express, and MongoDB with scalable REST APIs.',
      'Managed the full product lifecycle: API development, server-side logic, data modeling, deployment, and future feature planning.',
      'Led roadmap execution for advanced features including AI ticketing, Redis caching, and role-based access controls (in progress).',
      'Oversaw branding, product direction, user experience strategy, and backend automation from scratch.',
      'Gained practical experience working as both a backend developer and a product owner within a live startup environment.',
    ],
    borderColor: 'blue',
  },
  {
    title: 'Software Development Intern',
    company: 'Genesys Tech Hub',
    period: '11/2023 – 09/2024',
    achievements: [
      'Built an integrated travel management platform, addressing gaps in fragmented travel services by unifying essential booking and management functions. Contributed to a 50% reduction in average booking time and a 30% increase in user satisfaction.',
      'Architected RESTful APIs to support smooth data exchange across services, boosting efficiency, scalability, and platform maintainability.',
      'Collaborated closely with designers and fellow developers, maintaining a focus on usability and system resilience, and adapting features based on user feedback to refine the overall experience.',
    ],
    borderColor: 'violet',
  },
  {
    title: 'Engineering Intern',
    company: 'Transmission Company of Nigeria',
    period: '05/2023 – 10/2023',
    location: 'Enugu, Nigeria',
    achievements: [
      'Supported the seamless operation of the national power grid, contributing to continuous power distribution across regions by applying best practices in equipment management within a collaborative 20-member team.',
      'Documented critical processes and protocols, enhancing knowledge transfer and setting up clear, practical training for new team members.',
      'Improved operational efficiency, helping to reduce downtime by 15% through proactive maintenance and strategic adjustments to transformer operations.',
    ],
    borderColor: 'blue',
  },
];

// Projects - Updated with your actual GitHub URLs
export const projects = [
  {
    id: 'dec-tech',
    title: 'DEC Tech – Solar Fullstack website',
    description:
      'Built the fullstack website for my solar energy brand using React,Node.js, Express, MongoDB and other necessary technologies',
    problem:
      'Built the fullstack website for my solar energy brand using React,Node.js, Express, MongoDB and other necessary technologies',
    features: [
      'Built the backend for a solar energy platform using Node.js, Express, and MongoDB.',
      'Designed and launched the frontend UI with the help of AI tools (V0.dev), focusing on speed and clarity.',
      'Developed REST APIs for product listings and customer inquiries.',
      'Planned integration of AI-powered ticketing, Redis caching, and JWT auth for smart support automation.',
      'Led backend architecture, deployment, and roadmap independently.',
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'React', 'Tailwind'],
    github: 'https://github.com/davidchukwu202',
    demo: 'https://v0-dec-tech.vercel.app/',
    preview:
      'https://image.thum.io/get/width/800/crop/768/https://v0-dec-tech.vercel.app',
    icon: Lightbulb,
    featured: true,
    status: 'completed',
    year: '2025',
  },
  {
    id: 'cue-travel',
    title: 'CUE, Travel Management App',
    description:
      'Led development of a comprehensive platform, transforming fragmented travel services into a cohesive user experience.',
    problem:
      'Led development of a comprehensive platform, transforming fragmented travel services into a cohesive user experience.',
    features: [
      'Led development of a comprehensive platform, transforming fragmented travel services into a cohesive user experience. Reduced booking time by 50% and boosted user satisfaction by 30%, focusing on usability and performance.',
      'Designed and implemented a centralized booking feature, eliminating redundancies and creating a smooth user journey.',
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'React', 'Tailwind'],
    github: 'https://github.com/davidchukwu202',
    demo: 'https://cue-nine.vercel.app/',
    preview:
      'https://image.thum.io/get/width/800/crop/768/https://cue-nine.vercel.app/',
    icon: Globe,
    featured: true,
    status: 'completed',
    year: '2024',
  },
  {
    id: 'golearn-lms',
    title: 'GoLearn, Adult Learning Management System(LMS)',
    description:
      'Developed a custom LMS with a focus on user-centered learning paths, improving engagement among adult learners.',
    problem:
      'Developed a custom LMS with a focus on user-centered learning paths, improving engagement among adult learners.',
    features: [
      'Developed a custom LMS with a focus on user-centered learning paths, improving engagement among adult learners through tailored course recommendations.',
      'Engineered recommendation algorithms to personalize course suggestions, enhancing user retention and satisfaction.',
    ],
    stack: ['Node.js', 'Express', 'MongoDB', 'Recommendation Algorithms'],
    github: 'https://github.com/davidchukwu202',
    demo: 'https://golearn-lms.vercel.app',
    preview: '/placeholder.svg?height=400&width=600',
    icon: Brain,
    featured: true,
    status: 'completed',
    year: '2024',
  },
];

// Education - EXACT from your resume
export const education = [
  {
    degree: 'B.Engr, Electronic Engineering',
    institution: 'University of Nigeria, Nsukka',
    period: '10/2018 – 04/2024',
    location: 'Enugu, Nigeria',
    borderColor: 'blue',
  },
];

// Skills - EXACT categories and items from your resume
export const skillCategories = {
  'Programming Languages': ['Javascript(ES6+)', 'Typescript', 'React'],
  'Backend Development': [
    'Node.js',
    'Express.js',
    'REST API Design',
    'JWT Authentication',
    'API Security',
  ],
  'Database Management': ['MongoDB', 'Database Optimization', 'Redis'],
  'Version control and Deployment': ['Git'],

  'AI & System Integration': [
    'OpenAI API',
    'AI-driven ticketing system',
    'Modular service-controller design',
  ],
  'Testing and Tools': [
    'Postman',
    'API Testing',
    'Console Debugging',
    'Error Handling',
  ],
  'Strengths & Soft Skills': [
    'Analytical Thinking',
    'Strategic Problem Solving',
    'Team Collaboration',
    'Product Ownership',
    'Self-Management',
    'Fast Learning',
  ],
  'Collaboration & Workflow': [
    'Agile Development',
    'Version Control',
    'Task Ownership',
    'Documentation',
    'Asynchronous Communication',
  ],
};

// Convert skills to flat array for compatibility
export const skills = Object.entries(skillCategories).flatMap(
  ([category, skillList]) =>
    skillList.map((skill) => ({
      name: skill,
      category: category.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      icon: Code2,
    }))
);

// Certifications
export const certifications = [
  'Backend Development with Node.js and Express',
  'MongoDB Database Management and Optimization',
  'RESTful API Design and Implementation',
  'JWT Authentication and API Security',
  'Agile Development and Team Collaboration',
  'AI Integration and OpenAI API Implementation',
];

// Social Links
export const socialLinksData = [
  {
    name: 'GitHub',
    icon: Github,
    url: personalInfo.github,
    description: 'View my code repositories and projects',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: personalInfo.linkedin,
    description: 'Professional network and experience',
  },
  {
    name: 'X (Twitter)',
    icon: Twitter,
    url: personalInfo.twitter,
    description: 'Tech insights and industry updates',
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    url: personalInfo.whatsapp,
    description: 'Quick chat and project discussions',
  },
];

// About content
export const aboutContent = {
  story: [personalInfo.profileSummary],
  values: [
    {
      title: 'Scalable Solutions',
      icon: Server,
      description:
        'Building backend architectures that grow with your business, using proven technologies like Node.js, Express, and MongoDB for maximum reliability and performance.',
    },
    {
      title: 'Real-World Impact',
      icon: Globe,
      description:
        'Focusing on solutions that address genuine problems, from clean energy delivery to travel management, always keeping the end-user experience at the center.',
    },
    {
      title: 'Full-Stack Leadership',
      icon: Brain,
      description:
        'Combining technical expertise with product ownership, managing everything from backend development to roadmap execution and team collaboration.',
    },
    {
      title: 'Continuous Innovation',
      icon: Lightbulb,
      description:
        'Constantly exploring new technologies like AI integration, Redis caching, and advanced authentication systems to stay ahead of the curve.',
    },
  ],
  journey: [
    {
      title: 'Engineering Foundation',
      description:
        'Graduated with B.Engr in Electronic Engineering from University of Nigeria, Nsukka, building a strong technical foundation in systems and problem-solving.',
      color: 'blue',
    },
    {
      title: 'Industry Experience',
      description:
        'Gained practical experience at Transmission Company of Nigeria and Genesys Tech Hub, contributing to national infrastructure and travel platform development.',
      color: 'violet',
    },
    {
      title: 'Entrepreneurial Journey',
      description:
        'Founded DEC Tech in 2025, combining technical expertise with business leadership to build scalable clean energy solutions with smart backend automation.',
      color: 'blue',
    },
  ],
};

// Availability
export const availability = {
  status: 'available',
  services: [
    'Backend development with Node.js and Express',
    'MongoDB database design and optimization',
    'RESTful API development and integration',
    'AI-powered system development',
    'Technical consulting and architecture review',
    'Startup technical leadership and mentoring',
  ],
};

// Helper functions
export const getFeaturedProjects = () =>
  projects.filter((project) => project.featured);
export const getSkillsByCategory = (category: string) =>
  skills.filter((skill) => skill.category === category);
export const getRecentProjects = (count = 3) => projects.slice(0, count);
