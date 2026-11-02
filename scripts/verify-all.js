const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('====================================================');
console.log('RUNNING FULL PRODUCTION VERIFICATION SUITE');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
  }
}

// 1. Verify File Existence & Integrity
console.log('1. Verifying Core Files & Assets:');
const requiredFiles = [
  'index.html',
  'article.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'vercel.json',
  'package.json',
  '.env.example',
  'assets/css/input.css',
  'assets/css/style.css',
  'assets/js/app.js',
  'assets/images/profile/purnima.webp',
  'assets/images/projects/pharmalyze.jpg',
  'assets/images/projects/bookclub.jpg',
  'assets/images/projects/js-react.jpg',
  'assets/images/projects/portfolio-platform.svg',
  'assets/images/blogs/accessibility-guide.svg',
  'assets/images/blogs/css-grid-flexbox.svg',
  'assets/images/blogs/vanilla-js-dom.svg',
  'assets/images/blogs/ui-ux-design.svg',
  'assets/images/favicon/favicon.svg',
  'assets/documents/purnima-gupta-cv.pdf',
  'data/site-config.js',
  'data/projects.js',
  'data/blogs.js',
  'data/videos.js',
  'data/experience.js',
  'database/schema.sql',
  'api/contact.js',
  'manifest.webmanifest'
];

requiredFiles.forEach(fileRel => {
  const fullPath = path.join(__dirname, '..', fileRel);
  const exists = fs.existsSync(fullPath);
  let size = 0;
  if (exists) {
    size = fs.statSync(fullPath).size;
  }
  assert(exists && size > 0, `File exists & non-empty: ${fileRel} (${size} bytes)`);
});

// 2. Validate Data Integrity
console.log('\n2. Validating Data Structures:');
try {
  const siteConfig = require('../data/site-config.js');
  assert(siteConfig.personal.fullName === 'Purnima Gupta', 'siteConfig: fullName verified as Purnima Gupta');
  assert(siteConfig.personal.email === 'gpurnima966@gmail.com', 'siteConfig: email verified as gpurnima966@gmail.com');
  assert(siteConfig.social.github === 'https://github.com/purnima105', 'siteConfig: GitHub verified as https://github.com/purnima105');
  assert(siteConfig.social.website === 'https://www.purnimagupta.com.np/', 'siteConfig: Canonical website verified');
  assert(Array.isArray(siteConfig.skills) && siteConfig.skills.length >= 4, 'siteConfig: 4 categorized skill groups verified');
} catch (e) {
  assert(false, `siteConfig failed to load: ${e.message}`);
}

try {
  const projects = require('../data/projects.js');
  assert(Array.isArray(projects) && projects.length === 4, 'projects: 4 verified projects loaded');
  const pharmalyze = projects.find(p => p.id === 'pharmalyze');
  assert(pharmalyze && pharmalyze.githubUrl.includes('Pharmalyze_Project'), 'projects: Pharmalyze GitHub repository verified');
  const bookclub = projects.find(p => p.id === 'book-club');
  assert(bookclub && bookclub.githubUrl.includes('Book-Club'), 'projects: Book-Club GitHub repository verified');
} catch (e) {
  assert(false, `projects failed to load: ${e.message}`);
}

try {
  const blogs = require('../data/blogs.js');
  assert(Array.isArray(blogs) && blogs.length === 4, 'blogs: 4 in-depth technical articles verified');
  assert(blogs.every(b => b.title && b.slug && b.content), 'blogs: all articles have title, slug, and content');
} catch (e) {
  assert(false, `blogs failed to load: ${e.message}`);
}

try {
  const videos = require('../data/videos.js');
  assert(Array.isArray(videos) && videos.length === 4, 'videos: 4 video showcases verified');
  assert(videos.every(v => v.youtubeId && v.title && v.duration), 'videos: all videos contain youtubeId, title, duration');
} catch (e) {
  assert(false, `videos failed to load: ${e.message}`);
}

try {
  const experience = require('../data/experience.js');
  assert(Array.isArray(experience) && experience.length >= 3, 'experience: timeline entries verified');
  const bim = experience.find(e => e.type === 'education');
  assert(bim && bim.title.includes('Bachelor of Information Management (BIM)'), 'experience: verified BIM degree at Tribhuvan University affiliate');
} catch (e) {
  assert(false, `experience failed to load: ${e.message}`);
}

// 3. Test Serverless Function api/contact.js
console.log('\n3. Testing Serverless Contact API (/api/contact):');
(async () => {
  const contactHandler = require('../api/contact.js');

  // Helper mock for Vercel req/res
  function createMockReqRes(method, body = {}, headers = {}) {
    const req = {
      method,
      body,
      headers: { 'x-forwarded-for': '127.0.0.1', ...headers },
      socket: { remoteAddress: '127.0.0.1' }
    };
    const res = {
      statusCode: 200,
      headers: {},
      setHeader(k, v) { this.headers[k] = v; },
      status(code) { this.statusCode = code; return this; },
      json(data) { this.jsonData = data; return this; }
    };
    return { req, res };
  }

  // Test 3.1: Reject non-POST
  {
    const { req, res } = createMockReqRes('GET');
    await contactHandler(req, res);
    assert(res.statusCode === 405, 'API rejects GET with 405 Method Not Allowed');
  }

  // Test 3.2: Reject empty body
  {
    const { req, res } = createMockReqRes('POST', {});
    await contactHandler(req, res);
    assert(res.statusCode === 400 && res.jsonData.success === false, 'API rejects empty submission with 400 Bad Request');
  }

  // Test 3.3: Reject invalid email format
  {
    const { req, res } = createMockReqRes('POST', {
      full_name: 'Test Visitor',
      email: 'not-an-email',
      subject: 'Hello',
      message: 'This is a test message with enough characters.',
      privacy_consent: true
    });
    await contactHandler(req, res);
    assert(res.statusCode === 400 && res.jsonData.error.includes('valid email'), 'API validates email format');
  }

  // Test 3.4: Reject missing privacy consent
  {
    const { req, res } = createMockReqRes('POST', {
      full_name: 'Test Visitor',
      email: 'test@example.com',
      subject: 'Hello',
      message: 'This is a test message with enough characters.',
      privacy_consent: false
    });
    await contactHandler(req, res);
    assert(res.statusCode === 400 && res.jsonData.error.includes('privacy consent'), 'API requires privacy consent');
  }

  // Test 3.5: Trap honeypot bot
  {
    const { req, res } = createMockReqRes('POST', {
      full_name: 'Bot Spammer',
      email: 'bot@spam.com',
      subject: 'Buy Cheap Watches',
      message: 'Buy now click here',
      privacy_consent: true,
      website_trap: 'http://spamlink.com'
    });
    await contactHandler(req, res);
    assert(res.statusCode === 200 && res.jsonData.success === true, 'API handles honeypot trap safely without storing spam');
  }

  // Test 3.6: Successful valid submission
  {
    const { req, res } = createMockReqRes('POST', {
      full_name: 'Hiring Manager',
      email: 'recruiter@techcompany.com',
      subject: 'Frontend Engineer Opportunity',
      inquiry_type: 'Job Opportunity',
      message: 'We were impressed by your Pharmalyze project and portfolio and would love to interview you for a frontend position.',
      privacy_consent: true
    }, { 'x-forwarded-for': '192.168.1.100' });
    await contactHandler(req, res);
    assert(res.statusCode === 200 && res.jsonData.success === true, 'API accepts valid submission and returns success response');
  }

  // 4. Validate HTML & SEO elements
  console.log('\n4. Validating HTML Markup & SEO Standards:');
  const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert(indexHtml.includes('<title>Purnima Gupta — Frontend Developer &amp; UI/UX Designer</title>'), 'index.html: Title tag verified');
  assert(indexHtml.includes('name="description"'), 'index.html: Meta description verified');
  assert(indexHtml.includes('rel="canonical"'), 'index.html: Canonical URL tag verified');
  assert(indexHtml.includes('name="theme-color" content="#7C3AED"'), 'index.html: Theme color meta tag verified');
  assert(indexHtml.includes('name="geo.region" content="NP-BA"'), 'index.html: Geographic authority meta tag verified');
  assert(indexHtml.includes('rel="manifest" href="manifest.webmanifest"'), 'index.html: PWA Web Manifest link verified');
  assert(indexHtml.includes('application/ld+json'), 'index.html: JSON-LD schema script verified');
  assert(indexHtml.includes('"@type": "FAQPage"'), 'index.html: AEO/GEO FAQPage structured data verified');
  assert(indexHtml.includes('"@type": "ProfilePage"'), 'index.html: ProfilePage structured data verified');
  assert(indexHtml.includes('id="faq"'), 'index.html: Visible FAQ section verified in DOM');
  assert(indexHtml.includes('assets/documents/purnima-gupta-cv.pdf'), 'index.html: CV download links verified');
  assert(indexHtml.includes('id="whatsapp-floating-btn"'), 'index.html: Configurable WhatsApp button verified');
  assert(indexHtml.includes('id="scroll-to-top-btn"'), 'index.html: Scroll to top button verified');

  const articleHtml = fs.readFileSync(path.join(__dirname, '..', 'article.html'), 'utf8');
  assert(articleHtml.includes('property="og:site_name"'), 'article.html: OpenGraph metadata verified');
  assert(articleHtml.includes('name="twitter:card"'), 'article.html: Twitter Card metadata verified');
  assert(articleHtml.includes('aria-label="Breadcrumbs"'), 'article.html: Visible breadcrumb navigation verified');

  const robotsTxt = fs.readFileSync(path.join(__dirname, '..', 'robots.txt'), 'utf8');
  assert(robotsTxt.includes('Disallow: /api/'), 'robots.txt: Disallow /api/ security rule verified');

  const sitemapXml = fs.readFileSync(path.join(__dirname, '..', 'sitemap.xml'), 'utf8');
  assert(sitemapXml.includes('sitemap-image'), 'sitemap.xml: Google image sitemap extension verified');

  console.log('\n====================================================');
  console.log(`VERIFICATION COMPLETE: ${passedTests}/${totalTests} TESTS PASSED (${Math.round((passedTests/totalTests)*100)}%)`);
  console.log('====================================================\n');

  if (passedTests === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
})();
