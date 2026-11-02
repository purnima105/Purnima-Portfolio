# 🚀 Beginner-Friendly Setup Guide: Database & Email

> **No coding or database experience needed!**  
> Follow this simple, visual 3-step guide to set up your contact database (Supabase) and email delivery (Resend) in **less than 5 minutes**.

---

## 📋 Overview of What We Are Doing
Your portfolio website has a contact form where visitors, recruiters, and clients can message you.
1. **Supabase**: A free, secure cloud database that saves every message so you never lose an inquiry.
2. **Resend**: A free email notification service that instantly forwards every message to **`gpurnima966@gmail.com`**.

---

## ⚡ Quick Option: Interactive Setup Wizard (Fastest)

If you have a terminal open in your project folder, simply run:
```bash
npm run setup
```
The wizard will guide you step-by-step, prompt you for the keys, automatically write your `.env` file, and test the connection immediately!

To verify your configuration at any time, run:
```bash
npm run test:services
```

---

## 📖 Step-by-Step Manual Instructions

---

### Part 1: Setting Up the Supabase Database (2 Minutes)

#### 1. Create a Free Account
1. Open [https://supabase.com](https://supabase.com) in your browser.
2. Click **Start your project** (or **Sign In** with GitHub / Email).
3. Click the green button: **+ New Project**.
4. Enter:
   - **Name**: `purnima-portfolio` (or any name you like)
   - **Database Password**: Type a strong password (save it somewhere safe)
   - **Pricing Plan**: Free (included by default)
5. Click **Create new project** and wait ~1 minute for it to initialize.

---

#### 2. Create the Contact Messages Table (1 Click)
1. On the left sidebar menu of your Supabase dashboard, click the **SQL Editor** icon (looks like `>_` or a code terminal).
2. Click **+ Create query** (or **New Query**).
3. Open the file [database/schema.sql](file:///d:/Freelancing_projects/Purnima_portfolio/database/schema.sql) in this repository.
4. Copy all the text in `database/schema.sql` and paste it into the Supabase SQL Editor box.
5. Click the green **Run** button (or press `Ctrl + Enter`).
6. You will see: `Success. No rows returned.`  
   🎉 *Your database table is now created with bank-grade security!*

---

#### 3. Copy Your 2 Supabase Keys
1. In the left sidebar of Supabase, click the **Settings (gear icon)** at the bottom left.
2. Under "Project Settings", click **API** (or **Data API**).
3. Find these two items and copy them:
   - **Project URL**: Looks like `https://abcdefghijklm.supabase.co`  
     &rarr; This is your `SUPABASE_URL`.
   - **Project API Keys**: Look for the row named **`service_role`** (marked as *secret*). Click **Reveal** and copy the long key starting with `eyJ...`  
     &rarr; This is your `SUPABASE_SERVICE_ROLE_KEY`.

> ⚠️ **Important**: Make sure you copy the **`service_role`** secret key, **not** the `anon` key. The `service_role` key allows your serverless contact function to save inquiries while keeping the database private from the public.

---

### Part 2: Setting Up Resend Email Delivery (1 Minute)

#### 1. Create a Free Account
1. Open [https://resend.com](https://resend.com).
2. Click **Get Started** (Sign up free with your email).

#### 2. Create an API Key
1. In the Resend left sidebar, click **API Keys**.
2. Click the **+ Create API Key** button.
3. Name it: `Portfolio Contact Form`.
4. Permission: Full access.
5. Click **Add** and copy your key (starts with `re_...`).  
   &rarr; This is your `RESEND_API_KEY`.

#### 3. Sender Email Address
- During testing, you can use: `onboarding@resend.dev` (works immediately with no setup!).
- When your custom domain (`purnimagupta.com.np`) is live, you can add it under **Domains** in Resend to send from `notifications@purnimagupta.com.np`.

---

### Part 3: Connecting Them to Your Website

#### A. For Local Development:
Open or create a file named `.env` in the root of your project folder (you can duplicate `.env.example`), and paste your values:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
RESEND_API_KEY=re_your_resend_api_key_here
CONTACT_TO_EMAIL=gpurnima966@gmail.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
```

Then test it instantly:
```bash
npm run test:services
```
You will see:
```text
✔ CONNECTED: Successfully contacted Supabase database!
✔ VERIFIED: 'contact_submissions' table exists and is ready to store inquiries.
✔ CONNECTED: Resend API Key is verified and active!
✔ ALL SERVICES ARE FULLY CONFIGURED AND OPERATIONAL!
```

---

#### B. For Production on Vercel:
When your site is deployed on [Vercel](https://vercel.com):
1. Go to your **Vercel Project Dashboard**.
2. Click **Settings** (top navigation tab) &rarr; **Environment Variables** (left menu).
3. Add these 5 variables:

| Key | Value |
|---|---|
| `SUPABASE_URL` | Your Supabase Project URL (`https://xyz.supabase.co`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase `service_role` secret key (`eyJh...`) |
| `RESEND_API_KEY` | Your Resend key (`re_...`) |
| `CONTACT_TO_EMAIL` | `gpurnima966@gmail.com` |
| `CONTACT_FROM_EMAIL` | `Portfolio Contact <onboarding@resend.dev>` |

4. Click **Save**.
5. Go to the **Deployments** tab &rarr; Click the `...` on your latest deployment &rarr; Click **Redeploy**.

---

### Part 4: How to Test & Verify in Real Time (1 Minute)

1. Open your portfolio website (`http://localhost:3000` or your live URL `https://www.purnimagupta.com.np`).
2. Scroll down to the **Contact** section.
3. Fill in the form:
   - Full Name: `Test Recruiter`
   - Email: `your-email@example.com`
   - Subject: `Interview Invitation`
   - Message: `Hello Purnima, this is a test message to confirm everything works.`
   - Check the privacy agreement box.
4. Click **Send Message**.
5. You will see a green confirmation:  
   *`Thank you! Your message has been received. I will get back to you promptly.`*
6. **Check your Supabase Database**:
   - In Supabase, click **Table Editor** on the left menu.
   - Click `contact_submissions`.
   - You will see the new row with the name, email, and message you just submitted!
7. **Check your Email**:
   - Open `gpurnima966@gmail.com`.
   - You will see the formatted inquiry email with a direct Reply-To button!

---

## ❓ Frequently Asked Questions & Troubleshooting

| Question / Issue | Easy Fix |
|---|---|
| **"Supabase returned 401 or 403 error"** | You copied the `anon` public key by accident. Go to Supabase > Settings > API and copy the secret **`service_role`** key instead. |
| **"Table contact_submissions does not exist (404)"** | You haven't run the SQL script yet. Go to Supabase > SQL Editor > Paste [database/schema.sql](file:///d:/Freelancing_projects/Purnima_portfolio/database/schema.sql) > Click **Run**. |
| **"Resend returned 401 Invalid API Key"** | Check that you copied the complete key starting with `re_...` with no trailing spaces. |
| **"Can visitors see my database password or API keys?"** | **No, never.** All database and email actions run inside Vercel's secure serverless backend (`/api/contact.js`). None of these keys are ever included in the browser HTML or JavaScript. |
| **"What happens if Resend email has a temporary hiccup?"** | The website is built with a fail-safe: the visitor's message is **always saved in the Supabase database first**. You will never lose an inquiry even if an email is delayed. |
