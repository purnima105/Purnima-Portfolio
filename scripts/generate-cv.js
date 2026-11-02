const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 }
});

const outputPath = path.join(__dirname, '..', 'assets', 'documents', 'purnima-gupta-cv.pdf');
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Colors
const COLOR_PRIMARY = '#0F172A';
const COLOR_SECONDARY = '#475569';
const COLOR_MUTED = '#64748B';
const COLOR_VIOLET = '#7C3AED';
const COLOR_BORDER = '#E2E8F0';

// Header
doc.fontSize(22).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('Purnima Gupta', { align: 'left' });
doc.moveDown(0.2);
doc.fontSize(12).font('Helvetica-Bold').fillColor(COLOR_VIOLET).text('Frontend Developer & UI/UX Designer', { align: 'left' });
doc.moveDown(0.2);

doc.fontSize(9.5).font('Helvetica').fillColor(COLOR_SECONDARY)
  .text('Email: gpurnima966@gmail.com  |  Location: Kathmandu, Nepal  |  Portfolio: www.purnimagupta.com.np');
doc.fontSize(9.5).font('Helvetica').fillColor(COLOR_SECONDARY)
  .text('GitHub: github.com/purnima105  |  LinkedIn: linkedin.com/in/purnima-gupta1');

doc.moveDown(0.5);
doc.strokeColor(COLOR_BORDER).lineWidth(1).moveTo(45, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown(0.6);

// Professional Summary
doc.fontSize(11).font('Helvetica-Bold').fillColor(COLOR_VIOLET).text('PROFESSIONAL SUMMARY');
doc.moveDown(0.3);
doc.fontSize(9.5).font('Helvetica').fillColor(COLOR_SECONDARY).text(
  'Dedicated Bachelor of Information Management (BIM) student and Frontend Developer with practical expertise in building responsive, accessible, and intuitive web interfaces. Proficient in modern HTML5, CSS3/Tailwind, and Vanilla JavaScript, with hands-on experience developing database-driven web systems (PHP, MySQL) and designing user-centered UI/UX prototypes in Figma. Committed to writing clean, maintainable code, adhering to WCAG accessibility guidelines, and continuously expanding frontend engineering knowledge.',
  { lineGap: 2.5 }
);

doc.moveDown(0.7);

// Technical Skills
doc.fontSize(11).font('Helvetica-Bold').fillColor(COLOR_VIOLET).text('TECHNICAL SKILLS');
doc.moveDown(0.3);

const skills = [
  { label: 'Frontend Development', items: 'HTML5 (Semantic), CSS3 (Grid, Flexbox), JavaScript (ES6+), Tailwind CSS, Responsive Web Design, DOM APIs' },
  { label: 'UI/UX Design', items: 'Figma Prototyping, Design Systems & Tokens, Wireframing, Visual Hierarchy, WCAG 2.2 Accessibility' },
  { label: 'Backend & Databases', items: 'PHP, MySQL Relational Database Design, RESTful APIs, Supabase PostgreSQL' },
  { label: 'Developer Tools', items: 'Git, GitHub Version Control, VS Code, npm, Vercel Static & Serverless Hosting, Lighthouse SEO & Performance' }
];

skills.forEach(s => {
  doc.fontSize(9.5).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text(`${s.label}: `, { continued: true });
  doc.font('Helvetica').fillColor(COLOR_SECONDARY).text(s.items, { lineGap: 2 });
});

doc.moveDown(0.7);

// Featured Projects
doc.fontSize(11).font('Helvetica-Bold').fillColor(COLOR_VIOLET).text('FEATURED TECHNICAL PROJECTS');
doc.moveDown(0.3);

const projects = [
  {
    name: 'Pharmalyze — Pharmacy Inventory Management System',
    tech: 'PHP, MySQL, JavaScript, HTML5, CSS3',
    link: 'github.com/purnima105/Pharmalyze_Project',
    bullets: [
      'Engineered an end-to-end web platform designed to streamline pharmacy inventory tracking and supplier collaboration.',
      'Developed automated low-stock warnings, expiration date tracking, and structured supplier reordering workflows.',
      'Implemented secure relational database schemas in MySQL with role-based access for pharmacists and administrators.'
    ]
  },
  {
    name: 'Book Club — Community Reading Platform',
    tech: 'HTML5, CSS3, JavaScript, Responsive Design',
    link: 'github.com/purnima105/Book-Club',
    bullets: [
      'Architected a community website allowing readers to discover curated books, write reviews, and share literary discussions.',
      'Crafted an accessible, fluid layout prioritizing readable typography, fast page loads, and zero layout shift.'
    ]
  },
  {
    name: 'Interactive JS & React Showcase',
    tech: 'JavaScript (ES6+), React, Web APIs, Tailwind CSS',
    link: 'github.com/purnima105/JS_and_React',
    bullets: [
      'Created a repository of modular frontend components, interactive DOM widgets, and asynchronous data fetching patterns.',
      'Focused on state synchronization, clean component separation, and lightweight UI animations.'
    ]
  },
  {
    name: 'Production Portfolio, Technical Blog & YouTube Platform',
    tech: 'HTML5, Tailwind CSS, Vanilla JS, Vercel Serverless, Supabase, Resend',
    link: 'purnimagupta.com.np',
    bullets: [
      'Engineered a production-ready personal brand website with zero heavy frontend frameworks for sub-second load times.',
      'Built a serverless contact pipeline featuring client/server validation, Supabase PostgreSQL storage, and Resend email alerts.'
    ]
  }
];

projects.forEach(p => {
  doc.fontSize(10).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text(p.name, { continued: true });
  doc.fontSize(8.5).font('Helvetica-Oblique').fillColor(COLOR_MUTED).text(`  (${p.tech})`);
  doc.fontSize(8.5).font('Helvetica').fillColor(COLOR_VIOLET).text(`Repository: https://${p.link}`);
  doc.moveDown(0.15);
  p.bullets.forEach(b => {
    doc.fontSize(9).font('Helvetica').fillColor(COLOR_SECONDARY).text(`•  ${b}`, { indent: 10, lineGap: 1.5 });
  });
  doc.moveDown(0.35);
});

doc.moveDown(0.4);

// Education
doc.fontSize(11).font('Helvetica-Bold').fillColor(COLOR_VIOLET).text('EDUCATION');
doc.moveDown(0.3);

doc.fontSize(10).font('Helvetica-Bold').fillColor(COLOR_PRIMARY).text('Bachelor of Information Management (BIM)', { continued: true });
doc.fontSize(9).font('Helvetica').fillColor(COLOR_MUTED).text('  |  Tribhuvan University Affiliate, Nepal (2022 — Present)');
doc.fontSize(9).font('Helvetica').fillColor(COLOR_SECONDARY).text(
  'Interdisciplinary degree integrating computer science, software engineering, systems design, and business information management. Core emphasis on web programming, database systems, data structures, and human-computer interaction.',
  { lineGap: 2 }
);

doc.end();

writeStream.on('finish', () => {
  console.log('CV PDF successfully created at:', outputPath);
});
