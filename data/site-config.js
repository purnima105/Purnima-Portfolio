/**
 * Centralized Website Configuration for Purnima Gupta
 * All owner details, canonical URLs, and settings are maintained here.
 */
const siteConfig = {
  personal: {
    fullName: "Purnima Gupta",
    role: "Frontend Developer & UI/UX Enthusiast",
    headline: "Designing thoughtful digital experiences through modern frontend development.",
    shortBio: "Bachelor of Information Management (BIM) student and frontend developer specializing in responsive web design, clean UI/UX architectures, and accessible modern web interfaces.",
    detailedBio: "I am a frontend developer and Bachelor of Information Management (BIM) student with a passion for bridging the gap between elegant visual design and robust code. My work centers on creating accessible, performant, and intuitive user experiences using modern HTML5, CSS3/Tailwind, and Vanilla JavaScript. I continuously explore modern web technologies, build open-source tools, and share technical tutorials with the developer community.",
    email: "gpurnima966@gmail.com",
    location: "Kathmandu, Nepal (UTC+05:45)",
    availability: "Available for freelance projects & frontend roles",
    statusIndicator: "Open to opportunities",
    avatar: "assets/images/profile/purnima.webp",
    cvPath: "assets/documents/purnima-gupta-cv.pdf",
    cvFileName: "purnima-gupta-cv.pdf"
  },
  
  social: {
    github: "https://github.com/purnima105",
    linkedin: "https://www.linkedin.com/in/purnima-gupta1/",
    linkedinAlt: "https://www.linkedin.com/in/purnima-gupta07/",
    instagram: "https://www.instagram.com/purnima_9660/?hl=en",
    tiktok: "https://www.tiktok.com/@purnima_9660?lang=en-GB",
    website: "https://www.purnimagupta.com.np/",
    // Configurable: empty by default per specification rules.
    // Floating WhatsApp button appears only when a valid phone number is supplied.
    whatsappNumber: "+977 9819099126", 
    // Configurable: channel link will show once confirmed by owner.
    youtubeChannel: "https://www.tiktok.com/@purnima_9660?lang=en-GB"
  },

  skills: [
    {
      category: "Frontend Development",
      description: "Building responsive, fast, and accessible user interfaces.",
      items: [
        { name: "HTML5 & Semantic Markup", level: "Advanced" },
        { name: "CSS3 & Modern Layouts (Grid/Flexbox)", level: "Advanced" },
        { name: "JavaScript (ES6+)", level: "Intermediate" },
        { name: "Tailwind CSS", level: "Intermediate" },
        { name: "Responsive Web Design", level: "Advanced" },
        { name: "DOM Manipulation & Web APIs", level: "Intermediate" }
      ]
    },
    {
      category: "UI/UX Design",
      description: "Crafting intuitive digital experiences and visual design systems.",
      items: [
        { name: "Figma UI/UX Prototyping", level: "Intermediate" },
        { name: "Design Systems & Token Architecture", level: "Intermediate" },
        { name: "Wireframing & User Flows", level: "Intermediate" },
        { name: "Accessibility (WCAG 2.2 AA)", level: "Intermediate" },
        { name: "Visual Hierarchy & Typography", level: "Intermediate" }
      ]
    },
    {
      category: "Backend & Databases",
      description: "Server-side logic and database persistence for web applications.",
      items: [
        { name: "PHP", level: "Intermediate" },
        { name: "MySQL / Relational DBs", level: "Intermediate" },
        { name: "RESTful API Integration", level: "Intermediate" },
        { name: "Supabase PostgreSQL", level: "Intermediate" },
        { name: "Serverless Architecture", level: "Foundational" }
      ]
    },
    {
      category: "Tools & Workflow",
      description: "Development environment, version control, and deployment pipelines.",
      items: [
        { name: "Git & GitHub", level: "Advanced" },
        { name: "VS Code", level: "Advanced" },
        { name: "Vercel Static & Serverless", level: "Intermediate" },
        { name: "npm & Modern Tooling", level: "Intermediate" },
        { name: "SEO & Performance Optimization", level: "Intermediate" }
      ]
    }
  ],

  seo: {
    siteTitle: "Purnima Gupta — Frontend Developer & UI/UX Designer",
    siteDescription: "Official portfolio, technical blog, and showcase of Purnima Gupta. Frontend developer and BIM student crafting responsive, accessible, and elegant web experiences.",
    canonicalUrl: "https://www.purnimagupta.com.np/",
    ogImage: "https://www.purnimagupta.com.np/assets/images/profile/purnima.webp",
    locale: "en_US"
  }
};

// Support both browser window and node export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = siteConfig;
}
