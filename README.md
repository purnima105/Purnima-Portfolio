# Purnima Gupta — Premium Personal Portfolio, Technical Blog & YouTube Platform

Production-ready, agency-quality personal portfolio, technical publication platform, and video showcase built for **Purnima Gupta** (Frontend Developer & Bachelor of Information Management [BIM] student).

Designed with a strict, refined color palette (**#FFFFFF**, **#0F172A**, **#475569**, **#7C3AED**, **#F5F3FF**, **#E2E8F0**), Inter typography, zero frontend framework overhead, WCAG 2.2 AA accessibility, and a secure serverless backend.

---

## 1. Verified Architecture & Tech Stack

- **Frontend Core**: Semantic HTML5, CSS3, Vanilla JavaScript (ES6+), Inter typography.
- **Styling**: Tailwind CSS utility system compiled via CLI to `assets/css/style.css` (~29KB minified).
- **Iconography**: Font Awesome 6 (Free Solid & Brands) exclusively. Zero emojis.
- **Backend API**: Vercel Serverless Function (`api/contact.js`) using native Node.js runtime.
- **Database**: Supabase PostgreSQL with Row Level Security (RLS) (`database/schema.sql`).
- **Email Delivery**: Resend API for real-time notification dispatch to `gpurnima966@gmail.com`.
- **CV / Resume**: Real, professionally styled PDF at `assets/documents/purnima-gupta-cv.pdf`.
- **Target Deployment**: Vercel Static + Serverless (`www.purnimagupta.com.np`).

---

## 2. Project Directory Structure

```
purnima-portfolio/
├── index.html                  # Single-page portfolio, blog & video showcase
├── article.html                # Dedicated technical article reading template
├── 404.html                    # Branded 404 error page
├── robots.txt                  # Search engine crawler instructions
├── sitemap.xml                 # XML Sitemap for search indexing
├── vercel.json                 # Vercel routing, security headers & rewrites
├── package.json                # Development dependencies & build scripts
├── tailwind.config.js          # Tailwind design tokens & custom colors
├── .env.example                # Environment variables template
├── .gitignore                  # Git exclusion rules
│
├── api/
│   └── contact.js              # Serverless contact form handler (POST /api/contact)
│
├── assets/
│   ├── css/
│   │   ├── input.css           # Base Tailwind directives & custom CSS
│   │   └── style.css           # Production minified stylesheet
│   ├── js/
│   │   └── app.js              # Primary vanilla JavaScript application
│   ├── images/
│   │   ├── profile/            # Verified portrait (purnima.webp)
│   │   ├── projects/           # Real project preview screenshots
│   │   ├── blogs/              # Technical editorial SVG covers
│   │   └── favicon/            # Branded SVG favicon
│   └── documents/
│       └── purnima-gupta-cv.pdf # Downloadable PDF curriculum vitae
│
├── data/
│   ├── site-config.js          # Centralized owner configuration & settings
│   ├── projects.js             # Verified GitHub project repositories
│   ├── blogs.js                # Technical articles & tutorials
│   ├── videos.js               # Educational video demonstrations
│   └── experience.js           # Education & professional timeline
│
├── database/
│   └── schema.sql              # Supabase PostgreSQL table & RLS migration
│
└── scripts/
    ├── generate-cv.js          # Node.js PDF generator script
    └── generate-assets.js      # Vector visual asset generator script
```

---

## 3. Local Development Setup

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/purnima105/purnima-portfolio.git
cd purnima-portfolio

# Install development dependencies
npm install
```

### Compiling CSS
```bash
# Build production minified CSS
npm run build:css

# Watch for real-time CSS changes during development
npm run watch:css
```

### Running Locally
You can serve the static site locally with any static HTTP server or Vercel CLI:
```bash
# Option A: Using npx serve
npx serve .

# Option B: Using Vercel CLI (emulates both static frontend and /api serverless functions)
npx vercel dev
```
Open `http://localhost:3000` in your web browser.

---

## 4. Supabase PostgreSQL Database Setup

1. Log in to [Supabase](https://supabase.com) and create a new project.
2. Navigate to **SQL Editor** in the left sidebar.
3. Open `database/schema.sql` in this repository, paste the contents into the SQL Editor, and click **Run**.
4. The migration will create:
   - `contact_submissions` table with columns: `id`, `full_name`, `email`, `subject`, `inquiry_type`, `message`, `privacy_consent`, `status`, `ip_hash`, `email_notification_sent`, `email_notification_error`, `created_at`.
   - Performance indexes on `created_at` and `email`.
   - **Row Level Security (RLS)** policy: Only the authenticated `service_role` backend key has access to insert/read records. Public anonymous reading is strictly blocked.
5. In your Supabase Dashboard, navigate to **Project Settings** > **API**:
   - Copy **Project URL** (e.g. `https://xyzcompany.supabase.co`).
   - Copy **service_role** secret key (keep this confidential).

---

## 5. Resend Email Setup

1. Sign up at [Resend](https://resend.com).
2. Add and verify your custom domain (`purnimagupta.com.np`) under **Domains**, or use `onboarding@resend.dev` for testing.
3. Navigate to **API Keys** and generate an API key (e.g. `re_...`).
4. Note your sender address (e.g. `notifications@purnimagupta.com.np`).
5. Inquiries submitted through the contact form are dispatched to `gpurnima966@gmail.com` with the visitor's email set as `Reply-To`.

---

## 6. Environment Variables Configuration

Copy `.env.example` to `.env` for local testing with Vercel CLI:
```bash
cp .env.example .env
```

| Variable | Description | Example Value |
|---|---|---|
| `SUPABASE_URL` | Supabase Project REST URL | `https://xxxxxx.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Secret Key | `eyJh...` |
| `RESEND_API_KEY` | Resend API key | `re_123456789...` |
| `CONTACT_TO_EMAIL` | Owner email receiving inquiries | `gpurnima966@gmail.com` |
| `CONTACT_FROM_EMAIL` | Verified Resend sender address | `Portfolio <notifications@purnimagupta.com.np>` |

> **Security Rule**: Never prefix these variables with `VITE_` or `NEXT_PUBLIC_`. These are server-only variables executed in `/api/contact.js` inside Vercel's secure serverless runtime.

---

## 7. Deployment to Vercel

1. Push this project to GitHub under `purnima105`.
2. Go to the [Vercel Dashboard](https://vercel.com) and click **Add New...** > **Project**.
3. Import the repository.
4. In **Project Settings**:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build:css`
   - **Output Directory**: `.` (root directory)
5. Under **Environment Variables**, add the 5 variables from section 6 above:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
6. Click **Deploy**.

### Custom Domain Configuration (`www.purnimagupta.com.np`)
1. In Vercel Project Dashboard, navigate to **Settings** > **Domains**.
2. Add `www.purnimagupta.com.np` and `purnimagupta.com.np`.
3. Configure the DNS records at your domain registrar:
   - **A Record**: `@` points to `76.76.21.21` (or as displayed in Vercel)
   - **CNAME Record**: `www` points to `cname.vercel-dns.com`
4. Set `www.purnimagupta.com.np` as the primary canonical domain and redirect root `purnimagupta.com.np` to `www.purnimagupta.com.np` (or vice versa).
5. Vercel automatically provisions and renews SSL/TLS certificates via Let's Encrypt.

---

## 8. Content Management (Updating Profile, Projects, or Articles)

All website content is cleanly separated from rendering logic:
- **Personal Details & Social Links**: Edit `data/site-config.js`.
- **Add or Edit Projects**: Edit `data/projects.js`.
- **Add or Edit Technical Articles**: Edit `data/blogs.js`.
- **Add YouTube Videos**: Edit `data/videos.js`.
- **Update Experience & Education**: Edit `data/experience.js`.
- **WhatsApp Floating Button**: Set `whatsappNumber` in `data/site-config.js` to a valid international number (e.g., `+97798xxxxxxxx`). If left blank, the button remains safely hidden per specification requirements.

---

## 9. Verification & Testing Completed

- [x] Sticky navigation bar with active section highlight via `IntersectionObserver`.
- [x] Responsive mobile menu drawer with focus trap, backdrop lock, and keyboard support.
- [x] Verified project cards linking to actual public repositories (`Pharmalyze_Project`, `Book-Club`, `JS_and_React`).
- [x] Technical blog with live search, topic filtering, and dedicated `article.html` template.
- [x] YouTube video showcase with accessible modal player (privacy-enhanced `youtube-nocookie.com`).
- [x] Professional journey timeline with verified BIM education at Tribhuvan University affiliate.
- [x] Contact form client-side validation, rate-limiting, honeypot spam protection, Supabase PostgreSQL storage, and Resend email dispatch.
- [x] Real downloadable PDF CV at `assets/documents/purnima-gupta-cv.pdf`.
- [x] WCAG 2.2 AA compliant: High-contrast text, visible focus rings, aria attributes, reduced-motion support.
- [x] Complete SEO, Open Graph, Twitter card, canonical URL, robots.txt, and sitemap.xml.
#   P u r n i m a - P o r t f o l i o  
 