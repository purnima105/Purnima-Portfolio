/**
 * Interactive Setup Wizard for Purnima Gupta Portfolio
 * Designed for non-technical users to configure Supabase and Resend in under 3 minutes.
 * Run with: npm run setup (or: node scripts/setup.js)
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

// ANSI Colors
const GREEN = '\x1b[32m';
const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

async function main() {
  console.log(`\n${BOLD}${CYAN}================================================================${RESET}`);
  console.log(`${BOLD}${CYAN}   PURNIMA GUPTA PORTFOLIO — EASY SETUP WIZARD (3 MINUTES)      ${RESET}`);
  console.log(`${BOLD}${CYAN}================================================================${RESET}\n`);

  console.log(`Welcome! This wizard will help you set up two essential services:`);
  console.log(`  1. ${BOLD}Supabase${RESET} (Stores contact messages securely in a database)`);
  console.log(`  2. ${BOLD}Resend${RESET} (Sends email alerts to gpurnima966@gmail.com)\n`);
  console.log(`${YELLOW}No coding knowledge is required. Just follow the prompts below.${RESET}\n`);

  // Existing .env check
  const envPath = path.join(__dirname, '..', '.env');
  const existingConfig = {};

  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(l => {
      const idx = l.indexOf('=');
      if (idx !== -1 && !l.trim().startsWith('#')) {
        existingConfig[l.substring(0, idx).trim()] = l.substring(idx + 1).trim().replace(/^["']|["']$/g, '');
      }
    });
    console.log(`${CYAN}ℹ An existing .env file was detected. Press [Enter] to keep current values.${RESET}\n`);
  }

  // ---------------------------------------------------------------------------
  // Step 1: Supabase
  // ---------------------------------------------------------------------------
  console.log(`${BOLD}${GREEN}--- STEP 1 of 3: SUPABASE DATABASE CONFIGURATION ---${RESET}`);
  console.log(`Where to get these:`);
  console.log(`  1. Go to https://supabase.com (Sign in or Create free account)`);
  console.log(`  2. Click your Project > Project Settings (gear icon) > API`);
  console.log(`  3. Copy your 'Project URL' and the 'service_role' secret key.\n`);

  const currentUrl = existingConfig.SUPABASE_URL || '';
  const promptUrl = currentUrl ? `Supabase Project URL [${currentUrl}]: ` : 'Paste your Supabase Project URL (e.g., https://xyz.supabase.co): ';
  const inputUrl = (await askQuestion(promptUrl)).trim() || currentUrl;

  const currentKey = existingConfig.SUPABASE_SERVICE_ROLE_KEY || '';
  const promptKey = currentKey ? `Supabase service_role Key [Keep Current]: ` : 'Paste your Supabase service_role secret key (eyJh...): ';
  const inputKey = (await askQuestion(promptKey)).trim() || currentKey;

  console.log('');

  // ---------------------------------------------------------------------------
  // Step 2: Resend Email Service
  // ---------------------------------------------------------------------------
  console.log(`${BOLD}${GREEN}--- STEP 2 of 3: RESEND EMAIL NOTIFICATIONS ---${RESET}`);
  console.log(`Where to get this:`);
  console.log(`  1. Go to https://resend.com (Sign in or Create free account)`);
  console.log(`  2. Go to 'API Keys' > Click 'Create API Key'`);
  console.log(`  3. Copy your key (starts with re_...).\n`);

  const currentResend = existingConfig.RESEND_API_KEY || '';
  const promptResend = currentResend ? `Resend API Key [Keep Current]: ` : 'Paste your Resend API Key (re_...): ';
  const inputResend = (await askQuestion(promptResend)).trim() || currentResend;

  const currentToEmail = existingConfig.CONTACT_TO_EMAIL || 'gpurnima966@gmail.com';
  const promptToEmail = `Owner Email to Receive Contact Messages [${currentToEmail}]: `;
  const inputToEmail = (await askQuestion(promptToEmail)).trim() || currentToEmail;

  const currentFromEmail = existingConfig.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
  const promptFromEmail = `Sender Email Address [${currentFromEmail}]: `;
  const inputFromEmail = (await askQuestion(promptFromEmail)).trim() || currentFromEmail;

  console.log('');

  // ---------------------------------------------------------------------------
  // Step 3: Save to .env
  // ---------------------------------------------------------------------------
  console.log(`${BOLD}${GREEN}--- STEP 3 of 3: SAVING CONFIGURATION ---${RESET}`);

  const envFileContent = `# ==============================================================================
# Environment Configuration for Purnima Gupta Portfolio
# Generated via npm run setup on ${new Date().toISOString()}
# ==============================================================================

# Supabase PostgreSQL Configuration
SUPABASE_URL=${inputUrl}
SUPABASE_SERVICE_ROLE_KEY=${inputKey}

# Resend Email Configuration
RESEND_API_KEY=${inputResend}
CONTACT_TO_EMAIL=${inputToEmail}
CONTACT_FROM_EMAIL=${inputFromEmail}
`;

  fs.writeFileSync(envPath, envFileContent, 'utf8');
  console.log(`${GREEN}✔ Configuration safely saved to .env file!${RESET}\n`);

  rl.close();

  // Run live verification test
  console.log(`${CYAN}Running live test to verify your credentials...${RESET}\n`);
  require('./test-services.js');
}

main().catch(err => {
  console.error('\nSetup error:', err);
  process.exit(1);
});
