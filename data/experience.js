/**
 * Verified Experience & Education Timeline for Purnima Gupta
 */
const experienceData = [
  {
    type: "education",
    title: "Bachelor of Information Management (BIM)",
    institution: "Tribhuvan University Affiliate",
    location: "Kathmandu, Nepal",
    period: "2022 — Present",
    current: true,
    description: "Pursuing an undergraduate degree combining computer software engineering, database management systems, and business information management.",
    highlights: [
      "Core coursework in Web Technology, Data Structures & Algorithms, Database Management (MySQL), and Software Engineering.",
      "Developed web applications including the Pharmalyze inventory management platform for course capstones.",
      "Maintained a focus on human-centered UI/UX design and accessible web standards."
    ]
  },
  {
    type: "experience",
    title: "Frontend Developer & UI/UX Designer",
    institution: "Independent / Freelance Projects",
    location: "Remote / Nepal",
    period: "2023 — Present",
    current: true,
    description: "Designing and developing responsive, accessible web applications and digital interfaces for community projects and web solutions.",
    highlights: [
      "Engineered responsive user interfaces using modern HTML5, CSS3, Tailwind CSS, and Vanilla JavaScript (ES6+).",
      "Created UI/UX wireframes, user personas, and component libraries in Figma before coding implementations.",
      "Architected database schemas and server-side logic in PHP and MySQL for management platforms like Pharmalyze."
    ]
  },
  {
    type: "experience",
    title: "Open Source Contributor & Technical Content Creator",
    institution: "Self-Directed / GitHub & Community",
    location: "Remote",
    period: "2024 — Present",
    current: true,
    description: "Building open web resources, publishing frontend tutorials, and exploring modern UI engineering techniques.",
    highlights: [
      "Published open source repositories including community book club portals and interactive JavaScript utilities.",
      "Authored technical articles on accessibility (WCAG 2.2), CSS Grid/Flexbox architecture, and clean DOM manipulation.",
      "Continuously adopting modern frontend performance and optimization standards."
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = experienceData;
}
