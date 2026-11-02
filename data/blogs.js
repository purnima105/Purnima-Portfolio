/**
 * Technical Articles & Insights for Purnima Gupta's Blog
 * High-value, genuine frontend engineering and UI/UX tutorials.
 */
const blogsData = [
  {
    id: "accessible-web-interfaces-wcag-guide",
    slug: "accessible-web-interfaces-wcag-guide",
    title: "Building Accessible Web Interfaces: A Practical WCAG 2.2 Guide for Frontend Developers",
    subtitle: "How to engineer inclusive digital experiences using semantic HTML, ARIA attributes, and accessible focus management.",
    category: "Frontend Development",
    date: "October 18, 2026",
    updatedDate: "October 24, 2026",
    readTime: "7 min read",
    author: "Purnima Gupta",
    authorRole: "Frontend Developer",
    thumbnail: "assets/images/blogs/accessibility-guide.svg",
    featured: true,
    excerpt: "Accessibility is not a checklist item at the end of a sprint—it is a fundamental principle of web architecture. Learn how to implement WCAG 2.2 standards without sacrificing modern visual aesthetics.",
    tags: ["Accessibility", "HTML5", "WCAG", "UX Engineering"],
    relatedVideoId: "dQw4w9WgXcQ", // Optional reference
    content: `
      <h2>Why Accessibility (A11y) is Essential Engineering</h2>
      <p>Building for the web means building for everyone. The Web Content Accessibility Guidelines (WCAG) 2.2 introduce critical success criteria targeting mobile usability, touch target sizes, and accessible authentication. When an interface is accessible, it's not just helpful for screen reader users—it is inherently cleaner, more robust, and more search-engine friendly.</p>

      <h3>1. Semantic HTML as the Foundation</h3>
      <p>Before reaching for an ARIA attribute, remember the golden rule of ARIA: <em>do not use ARIA if a native HTML element already exists that does the job.</em> Browsers have decades of built-in keyboard navigation, focus handling, and assistive tree mappings for native elements.</p>

      <pre><code class="language-html">&lt;!-- Poor practice: Non-semantic clickable element --&gt;
&lt;div class="custom-btn" onclick="submitForm()"&gt;Submit Inquiry&lt;/div&gt;

&lt;!-- Best practice: Semantic, keyboard-focusable button --&gt;
&lt;button type="submit" class="btn-primary" aria-label="Submit project inquiry"&gt;
  Submit Inquiry
&lt;/button&gt;</code></pre>

      <h3>2. Visible Focus Rings and Keyboard Trapping</h3>
      <p>One of the most common design mistakes is stripping away focus outlines using <code>outline: none;</code> without replacing them. Power users and keyboard navigators rely completely on visual indicators to understand where they are on a page.</p>

      <pre><code class="language-css">/* Provide high-contrast, accessible focus indicators */
button:focus-visible,
a:focus-visible {
  outline: 2px solid #8B5CF6;
  outline-offset: 3px;
  border-radius: 4px;
}</code></pre>

      <h3>3. Form Label Association and ARIA Live Regions</h3>
      <p>When displaying asynchronous errors or validation states on contact forms, screen readers must be notified dynamically. We achieve this using <code>aria-live="polite"</code> or explicit <code>aria-describedby</code> attributes.</p>

      <pre><code class="language-html">&lt;label for="user-email" class="form-label"&gt;Email Address&lt;/label&gt;
&lt;input 
  id="user-email" 
  type="email" 
  required 
  aria-describedby="email-error"
  class="input-field" 
/&gt;
&lt;span id="email-error" role="alert" class="error-msg"&gt;
  Please provide a valid email format.
&lt;/span&gt;</code></pre>

      <h2>Summary Checklist for Your Next Project</h2>
      <ul>
        <li>Ensure color contrast meets at least 4.5:1 for normal text and 3:1 for large text.</li>
        <li>Ensure interactive elements have at least 24x24 CSS pixels target area.</li>
        <li>Always respect the visitor's <code>prefers-reduced-motion</code> operating system settings.</li>
        <li>Test every screen using only the Tab, Enter, and Space keys on your keyboard.</li>
      </ul>
    `
  },
  {
    id: "mastering-css-grid-and-flexbox",
    slug: "mastering-css-grid-and-flexbox",
    title: "Mastering CSS Grid & Flexbox: Architecting Fluid Layouts Without Media Query Fatigue",
    subtitle: "A deep dive into intrinsic web design, CSS clamp(), minmax(), and creating truly fluid responsive interfaces.",
    category: "CSS",
    date: "September 28, 2026",
    updatedDate: "October 05, 2026",
    readTime: "6 min read",
    author: "Purnima Gupta",
    authorRole: "Frontend Developer",
    thumbnail: "assets/images/blogs/css-grid-flexbox.svg",
    featured: true,
    excerpt: "Modern CSS offers powerful mathematical functions and auto-fitting grid templates. Discover how to create self-adjusting card grids and typography without writing dozens of repetitive media queries.",
    tags: ["CSS3", "Responsive Design", "Grid", "Web Layouts"],
    content: `
      <h2>The Shift to Intrinsic Web Design</h2>
      <p>In traditional responsive web design, developers frequently defined arbitrary breakpoints for iPhone, iPad, and desktop screens. But devices today come in thousands of aspect ratios—from ultra-narrow foldables to 4K monitors. Intrinsic web design allows elements to negotiate their own size based on their content and available container space.</p>

      <h3>When to Use Flexbox vs. CSS Grid</h3>
      <p>The mental model is simple: Flexbox is primarily for one-dimensional layouts (a row <em>or</em> a column, such as a navigation bar or chip cluster), whereas CSS Grid is designed for two-dimensional layouts (aligning items simultaneously across rows and columns).</p>

      <pre><code class="language-css">/* Auto-fitting fluid grid without a single media query */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: 1.5rem;
}</code></pre>

      <h3>Fluid Typography with clamp()</h3>
      <p>Instead of manually changing <code>font-size</code> across four different media queries, the <code>clamp(min, preferred, max)</code> function smoothly interpolates text size based on the current viewport width.</p>

      <pre><code class="language-css">/* Scales smoothly from 2rem on small screens to 3.5rem on large desktops */
.hero-title {
  font-size: clamp(2rem, 1.5rem + 2.5vw, 3.5rem);
  line-height: 1.15;
  letter-spacing: -0.025em;
}</code></pre>

      <h2>Practical Takeaway</h2>
      <p>By leveraging <code>minmax()</code>, <code>clamp()</code>, and CSS Grid <code>auto-fit</code>, you write up to 60% less CSS while achieving significantly more resilient layouts that never overflow horizontally on small screens.</p>
    `
  },
  {
    id: "clean-dom-manipulation-vanilla-javascript",
    slug: "clean-dom-manipulation-vanilla-javascript",
    title: "Clean DOM Architecture with Modern Vanilla JavaScript (ES6+)",
    subtitle: "Building responsive, maintainable web components with native JavaScript, custom events, and zero framework overhead.",
    category: "JavaScript",
    date: "September 12, 2026",
    updatedDate: "September 19, 2026",
    readTime: "8 min read",
    author: "Purnima Gupta",
    authorRole: "Frontend Developer",
    thumbnail: "assets/images/blogs/vanilla-js-dom.svg",
    featured: true,
    excerpt: "You do not need a 100KB JavaScript framework just to render interactive filters, accessible modal dialogs, and dynamic search feeds. Explore modern patterns for organizing clean vanilla JavaScript applications.",
    tags: ["JavaScript", "ES6+", "Performance", "Web Development"],
    content: `
      <h2>The Re-Emergence of Vanilla JavaScript</h2>
      <p>Modern ECMAScript has evolved immensely. With native ES modules, template literals, optional chaining, and modern Web APIs like <code>IntersectionObserver</code> and <code>dialog</code>, developers can achieve clean state management and delightful interactions with zero bundle weight.</p>

      <h3>1. Declarative Event Delegation</h3>
      <p>Rather than attaching individual event listeners to dozens of project cards or list items, event delegation attaches a single listener to a common ancestor. This saves memory and automatically supports dynamically injected items.</p>

      <pre><code class="language-javascript">// Attach once on the parent container
const container = document.getElementById('project-filter-container');

container.addEventListener('click', (event) => {
  const filterBtn = event.target.closest('[data-category]');
  if (!filterBtn) return;

  const selectedCategory = filterBtn.dataset.category;
  updateActiveFilter(selectedCategory);
  renderFilteredList(selectedCategory);
});</code></pre>

      <h3>2. Leveraging the Native HTML &lt;dialog&gt; Element</h3>
      <p>Building accessible modals used to require complex focus trapping scripts and manual escape key listeners. The native HTML5 <code>&lt;dialog&gt;</code> element now handles keyboard trapping and backdrop dimming out of the box!</p>

      <pre><code class="language-javascript">const modal = document.getElementById('video-modal');

// Open as modal (automatically handles focus trap and backdrop)
modal.showModal();

// Close on escape or close button click
modal.addEventListener('close', () => {
  stopVideoPlayback();
});</code></pre>

      <h2>Conclusion</h2>
      <p>Choosing vanilla JavaScript for content platforms and portfolios yields instant page loads, 100 Lighthouse performance ratings, and zero dependency security vulnerabilities.</p>
    `
  },
  {
    id: "ui-ux-design-heuristics-for-developers",
    slug: "ui-ux-design-heuristics-for-developers",
    title: "Designing for Humans: 7 Core UI/UX Heuristics Every Developer Should Know",
    subtitle: "Bridging the gap between visual craft and code logic to create digital products that feel intuitive and refined.",
    category: "UI/UX Design",
    date: "August 25, 2026",
    updatedDate: "September 02, 2026",
    readTime: "5 min read",
    author: "Purnima Gupta",
    authorRole: "Frontend Developer & UI/UX Enthusiast",
    thumbnail: "assets/images/blogs/ui-ux-design.svg",
    featured: false,
    excerpt: "Good UI design is not about adding flashy decorative elements—it is about clear visual hierarchy, consistent spatial rhythm, and reducing cognitive friction for the user.",
    tags: ["UI/UX", "Design Systems", "Figma", "User Experience"],
    content: `
      <h2>Design is How it Works</h2>
      <p>As frontend engineers, our responsibility extends beyond writing syntactically correct code. We are the final gatekeepers of user experience. Understanding foundational UI/UX heuristics transforms a standard web page into an engaging product that instills trust.</p>

      <h3>Key Heuristics for Web Developers</h3>
      <ol>
        <li><strong>Consistency and Standards:</strong> Use predictable interaction patterns. Navigation belongs in predictable locations; primary actions must have distinct visual weight from destructive or secondary actions.</li>
        <li><strong>Visibility of System Status:</strong> Never leave the user guessing. When a user clicks "Submit Form", provide immediate feedback (loading spinner, disabled button state, clear success or error messaging).</li>
        <li><strong>Spatial Rhythm (The 4pt/8pt Grid):</strong> Maintain consistent padding and margins throughout the layout. Using mathematical multiples (8px, 16px, 24px, 32px) creates an subconscious sense of order.</li>
        <li><strong>Typography Hierarchy:</strong> Limit your design to two font families at most. Use font weight and subtle color shifts (e.g. #0F172A for headings vs #475569 for body text) to establish visual order.</li>
      </ol>
    `
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = blogsData;
}
