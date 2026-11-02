/**
 * Automated Service Verification Script
 * Validates Supabase database connection and Resend email credentials.
 * Run anytime with: npm run test:services (or: node scripts/test-services.js)
 */

const fs = require('fs');
const path = require('path');

// Colors for terminal output
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

console.log(`\n${BOLD}${CYAN}====================================================${RESET}`);
console.log(`${BOLD}${CYAN}  PURNIMA GUPTA PORTFOLIO — SERVICE DIAGNOSTICS   ${RESET}`);
console.log(`${BOLD}${CYAN}====================================================${RESET}\n`);

// 1. Load .env file manually
const envPath = path.join(__dirname, '..', '.env');
const envVars = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.substring(0, eqIdx).trim();
        const val = trimmed.substring(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
        envVars[key] = val;
      }
    }
  });
  console.log(`${GREEN}✔ .env file found and loaded.${RESET}\n`);
} else {
  console.log(`${YELLOW}⚠ No .env file found at: ${envPath}${RESET}`);
  console.log(`${CYAN}ℹ Checking system environment variables instead...${RESET}\n`);
}

const SUPABASE_URL = envVars.SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESEND_API_KEY = envVars.RESEND_API_KEY || process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = envVars.CONTACT_TO_EMAIL || process.env.CONTACT_TO_EMAIL || 'gpurnima966@gmail.com';
const CONTACT_FROM_EMAIL = envVars.CONTACT_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL;

let overallSuccess = true;

async function runDiagnostics() {
  // ---------------------------------------------------------------------------
  // Check 1: Supabase PostgreSQL
  // ---------------------------------------------------------------------------
  console.log(`${BOLD}1. Checking Supabase Database Connection:${RESET}`);
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.log(`  ${RED}✖ Missing Supabase credentials in .env${RESET}`);
    console.log(`    - SUPABASE_URL: ${SUPABASE_URL ? '✔ Present' : '❌ Missing'}`);
    console.log(`    - SUPABASE_SERVICE_ROLE_KEY: ${SUPABASE_SERVICE_ROLE_KEY ? '✔ Present' : '❌ Missing'}`);
    console.log(`    ${CYAN}Quick Fix: Open SETUP_GUIDE.md (Step 1) to get these from Supabase in 2 minutes.${RESET}\n`);
    overallSuccess = false;
  } else {
    try {
      const cleanUrl = SUPABASE_URL.replace(/\/$/, '');
      const testRes = await fetch(`${cleanUrl}/rest/v1/contact_submissions?select=id&limit=1`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
        }
      });

      if (testRes.ok) {
        console.log(`  ${GREEN}✔ CONNECTED: Successfully contacted Supabase database!${RESET}`);
        console.log(`  ${GREEN}✔ VERIFIED: 'contact_submissions' table exists and is ready to store inquiries.${RESET}\n`);
      } else if (testRes.status === 404) {
        console.log(`  ${YELLOW}⚠ Supabase connected, but the 'contact_submissions' table does not exist yet.${RESET}`);
        console.log(`  ${CYAN}  Fix: Open Supabase > SQL Editor > Paste 'database/schema.sql' > Click Run.${RESET}\n`);
        overallSuccess = false;
      } else if (testRes.status === 401 || testRes.status === 403) {
        console.log(`  ${RED}✖ Supabase authentication rejected. Check your SUPABASE_SERVICE_ROLE_KEY.${RESET}`);
        console.log(`  ${CYAN}  Tip: Make sure you copied the 'service_role' secret key, not the 'anon' public key.${RESET}\n`);
        overallSuccess = false;
      } else {
        const errText = await testRes.text();
        console.log(`  ${RED}✖ Supabase returned status ${testRes.status}: ${errText}${RESET}\n`);
        overallSuccess = false;
      }
    } catch (err) {
      console.log(`  ${RED}✖ Could not connect to Supabase: ${err.message}${RESET}\n`);
      overallSuccess = false;
    }
  }

  // ---------------------------------------------------------------------------
  // Check 2: Resend Email Service
  // ---------------------------------------------------------------------------
  console.log(`${BOLD}2. Checking Resend Email Service:${RESET}`);
  if (!RESEND_API_KEY) {
    console.log(`  ${RED}✖ Missing RESEND_API_KEY in .env${RESET}`);
    console.log(`    ${CYAN}Quick Fix: Open SETUP_GUIDE.md (Step 2) to generate a free API key at resend.com in 1 minute.${RESET}\n`);
    overallSuccess = false;
  } else {
    try {
      const resendRes = await fetch('https://api.resend.com/api-keys', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`
        }
      });

      if (resendRes.ok) {
        console.log(`  ${GREEN}✔ CONNECTED: Resend API Key is verified and active!${RESET}`);
        console.log(`  ${GREEN}✔ Inquiries will be delivered to: ${CONTACT_TO_EMAIL}${RESET}`);
        if (CONTACT_FROM_EMAIL) {
          console.log(`  ${GREEN}✔ Sender Address: ${CONTACT_FROM_EMAIL}${RESET}\n`);
        } else {
          console.log(`  ${YELLOW}ℹ CONTACT_FROM_EMAIL not set; will use 'onboarding@resend.dev' default.${RESET}\n`);
        }
      } else {
        const errJson = await resendRes.json().catch(() => ({}));
        console.log(`  ${RED}✖ Resend API error (${resendRes.status}): ${errJson.message || 'Invalid API Key'}${RESET}`);
        console.log(`  ${CYAN}  Tip: Generate a fresh key at https://resend.com/api-keys and paste it into .env.${RESET}\n`);
        overallSuccess = false;
      }
    } catch (err) {
      console.log(`  ${RED}✖ Could not connect to Resend: ${err.message}${RESET}\n`);
      overallSuccess = false;
    }
  }

  // ---------------------------------------------------------------------------
  // Overall Summary
  // ---------------------------------------------------------------------------
  console.log(`${BOLD}${CYAN}----------------------------------------------------${RESET}`);
  if (overallSuccess) {
    console.log(`${BOLD}${GREEN}✔ ALL SERVICES ARE FULLY CONFIGURED AND OPERATIONAL!${RESET}`);
    console.log(`${CYAN}You are ready to deploy to Vercel. See SETUP_GUIDE.md (Step 3).${RESET}`);
  } else {
    console.log(`${BOLD}${YELLOW}⚠ SOME CREDENTIALS NEED ATTENTION.${RESET}`);
    console.log(`Please follow the beginner-friendly ${BOLD}SETUP_GUIDE.md${RESET} to configure the missing items in under 5 minutes.`);
  }
  console.log(`${BOLD}${CYAN}====================================================${RESET}\n`);
}

runDiagnostics();
