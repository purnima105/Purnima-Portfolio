/**
 * Verified Projects for Purnima Gupta
 * Based on verified public GitHub repositories and verified work.
 */
const projectsData = [
  {
    id: "pharmalyze",
    title: "Pharmalyze Inventory System",
    category: "Full Stack & Web App",
    tagline: "Streamlining pharmacy inventory and medical supplier collaboration",
    description: "A comprehensive web-based platform designed to automate pharmacy inventory tracking, manage stock alerts, track expiration dates, and enhance direct coordination between pharmacies and medical suppliers.",
    longDescription: "Pharmalyze provides pharmacies with an end-to-end management interface. Key capabilities include automated inventory status alerts, order tracking with medical suppliers, item categorization, and transactional reporting with secure role-based access.",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
    featured: true,
    githubUrl: "https://github.com/purnima105/Pharmalyze_Project",
    liveUrl: null, // Verified: No live production URL specified in repo, kept null to avoid fabrication
    image: "assets/images/projects/pharmalyze.jpg",
    metrics: "Automated stock thresholds & supplier workflows"
  },
  {
    id: "book-club",
    title: "Book Club Community Platform",
    category: "Frontend & Community",
    tagline: "Digital haven for avid readers and thoughtful literary discussions",
    description: "A community platform created for readers to explore literature, share critical reviews, exchange literary recommendations, and participate in lively reading circles.",
    longDescription: "Built with a focus on accessible typography and clean visual hierarchy, the Book Club platform lets users browse curated reading lists, write book reviews, rate literary works, and connect over shared genres.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    featured: true,
    githubUrl: "https://github.com/purnima105/Book-Club",
    liveUrl: null,
    image: "assets/images/projects/bookclub.jpg",
    metrics: "Reader engagement & discussion interface"
  },
  {
    id: "js-and-react",
    title: "Interactive JS & React Showcase",
    category: "Frontend Engineering",
    tagline: "Experimental playground for algorithms, interactive UI, and state flows",
    description: "A repository of exploratory frontend experiments, algorithmic challenges, interactive DOM widgets, and modern component state architectures.",
    longDescription: "Features modular JavaScript components including dynamic filtering systems, asynchronous data fetching, accessible modals, custom form validators, and interactive canvas/DOM experiments.",
    technologies: ["JavaScript (ES6+)", "React", "Web APIs", "Tailwind CSS"],
    featured: true,
    githubUrl: "https://github.com/purnima105/JS_and_React",
    liveUrl: null,
    image: "assets/images/projects/js-react.jpg",
    metrics: "Collection of interactive frontend utilities"
  },
  {
    id: "personal-portfolio-platform",
    title: "Production Portfolio & Technical Platform",
    category: "Full Stack & UI/UX",
    tagline: "High-performance personal brand, technical blog, and API architecture",
    description: "The complete production web platform designed and built for Purnima Gupta featuring a custom design system, technical blog, video showcase, and serverless PostgreSQL contact storage.",
    longDescription: "Engineered strictly with Vanilla JavaScript and Tailwind CSS for peak performance and zero framework bloat. Integrated with Vercel Serverless Functions, Supabase PostgreSQL, Resend email dispatch, and complete WCAG 2.2 AA accessibility.",
    technologies: ["HTML5", "Tailwind CSS", "Vanilla JavaScript", "Vercel Functions", "Supabase", "Resend API"],
    featured: true,
    githubUrl: "https://github.com/purnima105",
    liveUrl: "https://www.purnimagupta.com.np/",
    image: "assets/images/projects/portfolio-platform.svg",
    metrics: "Sub-second load times & WCAG 2.2 AA compliance"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
