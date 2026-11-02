/**
 * Video Showcase for "Watch & Learn" Section
 * Curated educational frontend and UI/UX tutorials.
 * Note: Configured with standard web development learning demonstrations.
 * The website owner can easily update these with her personal YouTube video IDs.
 */
const videosData = [
  {
    id: "css-flexbox-grid-crash-course",
    youtubeId: "fYq5PXgSsbE", // FreeCodeCamp / Traversy CSS modern layout tutorial
    title: "Mastering CSS Grid & Flexbox Layouts for Modern Web Apps",
    description: "A comprehensive walkthrough exploring two-dimensional CSS Grid layouts and one-dimensional Flexbox patterns for responsive design.",
    category: "CSS & Layout",
    duration: "18:45",
    date: "September 2026",
    featured: true
  },
  {
    id: "vanilla-javascript-dom-projects",
    youtubeId: "dtKciwk_si4", // DOM manipulation tutorial
    title: "Vanilla JavaScript DOM Manipulation & Event Architecture",
    description: "Learn how to build interactive UI components, handle asynchronous events, and structure clean client-side JavaScript without frameworks.",
    category: "JavaScript",
    duration: "24:10",
    date: "August 2026",
    featured: true
  },
  {
    id: "tailwind-css-best-practices",
    youtubeId: "pfaSUYaSgRo", // Tailwind CSS tutorial
    title: "Tailwind CSS from Scratch: Building Production Interfaces",
    description: "A hands-on demonstration of utility-first CSS architecture, color token configuration, and responsive layouts.",
    category: "Web Development",
    duration: "21:30",
    date: "July 2026",
    featured: false
  },
  {
    id: "ui-ux-design-in-figma",
    youtubeId: "c9Wg6Cb_YlU", // Figma UI/UX tutorial
    title: "UI/UX Design Systems in Figma: From Concept to Dev Hand-off",
    description: "Designing modern visual interfaces, defining typography scales, and structuring design tokens ready for frontend implementation.",
    category: "UI/UX Design",
    duration: "19:15",
    date: "June 2026",
    featured: false
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = videosData;
}
