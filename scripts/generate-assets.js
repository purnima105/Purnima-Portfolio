const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, '..', 'assets', 'images', 'projects');
const blogsDir = path.join(__dirname, '..', 'assets', 'images', 'blogs');
const faviconDir = path.join(__dirname, '..', 'assets', 'images', 'favicon');

[projectsDir, blogsDir, faviconDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// 1. Portfolio Platform Preview SVG
const portfolioPlatformSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="#F8FAFC"/>
  <!-- Browser Chrome -->
  <rect x="40" y="30" width="720" height="390" rx="12" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2"/>
  <rect x="40" y="30" width="720" height="40" rx="12" fill="#F1F5F9"/>
  <circle cx="65" cy="50" r="5" fill="#EF4444"/>
  <circle cx="82" cy="50" r="5" fill="#F59E0B"/>
  <circle cx="99" cy="50" r="5" fill="#10B981"/>
  <rect x="130" y="40" width="400" height="20" rx="4" fill="#FFFFFF" stroke="#E2E8F0"/>
  <text x="145" y="54" font-family="Inter, sans-serif" font-size="11" fill="#64748B">https://www.purnimagupta.com.np</text>
  
  <!-- Content Mockup -->
  <!-- Nav -->
  <line x1="40" y1="105" x2="760" y2="105" stroke="#E2E8F0" stroke-width="1"/>
  <text x="70" y="94" font-family="Inter, sans-serif" font-size="16" font-weight="bold" fill="#0F172A">Purnima Gupta</text>
  <rect x="580" y="80" width="130" height="28" rx="6" fill="#7C3AED"/>
  <text x="645" y="98" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#FFFFFF" text-anchor="middle">Hire Me</text>
  
  <!-- Hero Area -->
  <rect x="70" y="130" width="150" height="22" rx="11" fill="#F5F3FF" stroke="#DDD6FE"/>
  <circle cx="82" cy="141" r="3" fill="#10B981"/>
  <text x="94" y="145" font-family="Inter, sans-serif" font-size="10" font-weight="600" fill="#7C3AED">Available for opportunities</text>
  
  <text x="70" y="185" font-family="Inter, sans-serif" font-size="24" font-weight="800" fill="#0F172A">Designing thoughtful digital</text>
  <text x="70" y="215" font-family="Inter, sans-serif" font-size="24" font-weight="800" fill="#7C3AED">experiences &amp; frontend systems</text>
  
  <rect x="70" y="240" width="300" height="10" rx="4" fill="#E2E8F0"/>
  <rect x="70" y="258" width="240" height="10" rx="4" fill="#E2E8F0"/>
  
  <rect x="70" y="290" width="110" height="34" rx="6" fill="#7C3AED"/>
  <text x="125" y="311" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#FFFFFF" text-anchor="middle">View Projects</text>
  
  <rect x="195" y="290" width="110" height="34" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/>
  <text x="250" y="311" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#0F172A" text-anchor="middle">Download CV</text>
  
  <!-- Hero Card right side -->
  <rect x="460" y="135" width="250" height="235" rx="12" fill="#F5F3FF" stroke="#C4B5FD" stroke-width="1.5"/>
  <circle cx="585" cy="210" r="50" fill="#EDE9FE" stroke="#7C3AED" stroke-width="2"/>
  <text x="585" y="285" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#0F172A" text-anchor="middle">Purnima Gupta</text>
  <text x="585" y="304" font-family="Inter, sans-serif" font-size="11" fill="#7C3AED" text-anchor="middle">Frontend Developer &amp; UI/UX</text>
</svg>`;

// 2. Blog: Accessibility Guide SVG
const blogA11ySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="#FFFFFF"/>
  <rect x="20" y="20" width="760" height="410" rx="16" fill="#F5F3FF" stroke="#DDD6FE" stroke-width="1"/>
  
  <!-- Decorative grid -->
  <g opacity="0.3" stroke="#C4B5FD" stroke-width="1" stroke-dasharray="4 4">
    <line x1="80" y1="20" x2="80" y2="430"/>
    <line x1="200" y1="20" x2="200" y2="430"/>
    <line x1="600" y1="20" x2="600" y2="430"/>
    <line x1="720" y1="20" x2="720" y2="430"/>
  </g>

  <!-- Accessibility Badge & Icon -->
  <rect x="80" y="70" width="160" height="32" rx="16" fill="#FFFFFF" stroke="#C4B5FD"/>
  <text x="160" y="91" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#7C3AED" text-anchor="middle">WCAG 2.2 AA GUIDE</text>
  
  <text x="80" y="165" font-family="Inter, sans-serif" font-size="34" font-weight="800" fill="#0F172A">Building Accessible</text>
  <text x="80" y="210" font-family="Inter, sans-serif" font-size="34" font-weight="800" fill="#7C3AED">Web Interfaces</text>
  
  <text x="80" y="255" font-family="Inter, sans-serif" font-size="15" fill="#475569">Inclusive UX engineering, semantic HTML, and focus management.</text>
  
  <!-- Code Snippet Card in graphic -->
  <rect x="80" y="290" width="640" height="100" rx="10" fill="#0F172A"/>
  <text x="110" y="325" font-family="monospace" font-size="13" fill="#A78BFA">&lt;button</text>
  <text x="180" y="325" font-family="monospace" font-size="13" fill="#F8FAFC">type="submit" aria-label="Submit inquiry"&gt;</text>
  <text x="130" y="350" font-family="monospace" font-size="13" fill="#38BDF8">Send Message</text>
  <text x="110" y="375" font-family="monospace" font-size="13" fill="#A78BFA">&lt;/button&gt;</text>
  
  <!-- Visual Focus Ring demo in corner -->
  <rect x="540" y="80" width="180" height="60" rx="8" fill="#FFFFFF" stroke="#8B5CF6" stroke-width="3"/>
  <text x="630" y="115" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#7C3AED" text-anchor="middle">:focus-visible</text>
</svg>`;

// 3. Blog: CSS Grid & Flexbox SVG
const blogCssSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="#FFFFFF"/>
  <rect x="20" y="20" width="760" height="410" rx="16" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
  
  <rect x="80" y="70" width="130" height="32" rx="16" fill="#F5F3FF" stroke="#DDD6FE"/>
  <text x="145" y="91" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#7C3AED" text-anchor="middle">MODERN CSS</text>
  
  <text x="80" y="160" font-family="Inter, sans-serif" font-size="32" font-weight="800" fill="#0F172A">Mastering CSS Grid</text>
  <text x="80" y="205" font-family="Inter, sans-serif" font-size="32" font-weight="800" fill="#7C3AED">&amp; Flexbox Layouts</text>
  
  <text x="80" y="250" font-family="Inter, sans-serif" font-size="15" fill="#475569">Auto-fitting fluid grids and clamp() typography without media query fatigue.</text>
  
  <!-- Interactive Grid Diagram -->
  <g transform="translate(80, 280)">
    <rect x="0" y="0" width="190" height="110" rx="8" fill="#FFFFFF" stroke="#C4B5FD" stroke-width="2"/>
    <text x="95" y="60" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#7C3AED" text-anchor="middle">repeat(auto-fit)</text>
    
    <rect x="210" y="0" width="190" height="110" rx="8" fill="#FFFFFF" stroke="#C4B5FD" stroke-width="2"/>
    <text x="305" y="60" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#7C3AED" text-anchor="middle">minmax(300px, 1fr)</text>
    
    <rect x="420" y="0" width="220" height="110" rx="8" fill="#0F172A"/>
    <text x="530" y="50" font-family="monospace" font-size="12" fill="#C4B5FD" text-anchor="middle">clamp(1rem, 2vw, 3rem)</text>
    <text x="530" y="75" font-family="Inter, sans-serif" font-size="11" fill="#94A3B8" text-anchor="middle">Intrinsic Fluid Scaling</text>
  </g>
</svg>`;

// 4. Blog: Vanilla JS DOM SVG
const blogJsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="#FFFFFF"/>
  <rect x="20" y="20" width="760" height="410" rx="16" fill="#F5F3FF" stroke="#DDD6FE" stroke-width="1.5"/>
  
  <rect x="80" y="70" width="130" height="32" rx="16" fill="#FFFFFF" stroke="#C4B5FD"/>
  <text x="145" y="91" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#7C3AED" text-anchor="middle">JAVASCRIPT ES6+</text>
  
  <text x="80" y="160" font-family="Inter, sans-serif" font-size="32" font-weight="800" fill="#0F172A">Clean DOM Manipulation</text>
  <text x="80" y="205" font-family="Inter, sans-serif" font-size="32" font-weight="800" fill="#7C3AED">With Zero Frameworks</text>
  
  <text x="80" y="250" font-family="Inter, sans-serif" font-size="15" fill="#475569">Event delegation, Web APIs, and high performance client architectures.</text>
  
  <!-- Code block -->
  <rect x="80" y="280" width="640" height="115" rx="8" fill="#0F172A"/>
  <text x="105" y="315" font-family="monospace" font-size="13" fill="#F8FAFC">document.addEventListener('click', (e) =&gt; {</text>
  <text x="130" y="340" font-family="monospace" font-size="13" fill="#A78BFA">  const item = e.target.closest('[data-reveal]');</text>
  <text x="130" y="365" font-family="monospace" font-size="13" fill="#38BDF8">  if (item) item.classList.add('is-revealed');</text>
  <text x="105" y="385" font-family="monospace" font-size="13" fill="#F8FAFC">});</text>
</svg>`;

// 5. Blog: UI/UX Heuristics SVG
const blogUiUxSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="#FFFFFF"/>
  <rect x="20" y="20" width="760" height="410" rx="16" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
  
  <rect x="80" y="70" width="130" height="32" rx="16" fill="#F5F3FF" stroke="#DDD6FE"/>
  <text x="145" y="91" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#7C3AED" text-anchor="middle">UI/UX DESIGN</text>
  
  <text x="80" y="160" font-family="Inter, sans-serif" font-size="32" font-weight="800" fill="#0F172A">Designing for Humans</text>
  <text x="80" y="205" font-family="Inter, sans-serif" font-size="32" font-weight="800" fill="#7C3AED">7 Core Heuristics</text>
  
  <text x="80" y="250" font-family="Inter, sans-serif" font-size="15" fill="#475569">Bridging visual aesthetics, cognitive load, and clean component systems.</text>
  
  <!-- Diagram with circles and cards -->
  <g transform="translate(80, 280)">
    <rect x="0" y="0" width="145" height="110" rx="8" fill="#FFFFFF" stroke="#E2E8F0"/>
    <circle cx="72" cy="40" r="18" fill="#F5F3FF" stroke="#7C3AED" stroke-width="2"/>
    <text x="72" y="80" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0F172A" text-anchor="middle">Visual Hierarchy</text>

    <rect x="165" y="0" width="145" height="110" rx="8" fill="#FFFFFF" stroke="#E2E8F0"/>
    <circle cx="237" cy="40" r="18" fill="#F5F3FF" stroke="#7C3AED" stroke-width="2"/>
    <text x="237" y="80" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0F172A" text-anchor="middle">Spatial Rhythm</text>

    <rect x="330" y="0" width="145" height="110" rx="8" fill="#FFFFFF" stroke="#E2E8F0"/>
    <circle cx="402" cy="40" r="18" fill="#F5F3FF" stroke="#7C3AED" stroke-width="2"/>
    <text x="402" y="80" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#0F172A" text-anchor="middle">Feedback States</text>

    <rect x="495" y="0" width="145" height="110" rx="8" fill="#FFFFFF" stroke="#C4B5FD" stroke-width="1.5"/>
    <circle cx="567" cy="40" r="18" fill="#EDE9FE" stroke="#7C3AED" stroke-width="2"/>
    <text x="567" y="80" font-family="Inter, sans-serif" font-size="11" font-weight="600" fill="#7C3AED" text-anchor="middle">Cognitive Ease</text>
  </g>
</svg>`;

// 6. Favicon SVG
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#0F172A"/>
  <rect x="4" y="4" width="56" height="56" rx="10" fill="#7C3AED"/>
  <text x="32" y="43" font-family="Inter, -apple-system, sans-serif" font-size="30" font-weight="900" fill="#FFFFFF" text-anchor="middle">PG</text>
</svg>`;

// Write all SVGs
fs.writeFileSync(path.join(projectsDir, 'portfolio-platform.svg'), portfolioPlatformSvg);
fs.writeFileSync(path.join(blogsDir, 'accessibility-guide.svg'), blogA11ySvg);
fs.writeFileSync(path.join(blogsDir, 'css-grid-flexbox.svg'), blogCssSvg);
fs.writeFileSync(path.join(blogsDir, 'vanilla-js-dom.svg'), blogJsSvg);
fs.writeFileSync(path.join(blogsDir, 'ui-ux-design.svg'), blogUiUxSvg);
fs.writeFileSync(path.join(faviconDir, 'favicon.svg'), faviconSvg);

console.log('Successfully generated clean SVG assets for projects, blogs, and favicon.');
