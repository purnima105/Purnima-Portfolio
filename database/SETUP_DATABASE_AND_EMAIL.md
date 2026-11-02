# Database & Email Setup Instructions

Looking for the beginner-friendly setup guide?

Please check the complete visual setup guide in the root directory:
👉 **[SETUP_GUIDE.md](../SETUP_GUIDE.md)**

---

### Quick 30-Second Summary:

1. **Database (Supabase)**:
   - Go to [Supabase](https://supabase.com).
   - In **SQL Editor**, paste the code from [schema.sql](./schema.sql) and click **Run**.
   - Copy your **Project URL** and **`service_role`** secret key from **Settings > API**.

2. **Email (Resend)**:
   - Go to [Resend](https://resend.com).
   - Create an API key under **API Keys** (`re_...`).

3. **One-Command Setup**:
   Run in your terminal:
   ```bash
   npm run setup
   ```
   Or to test your connection at any time:
   ```bash
   npm run test:services
   ```
