-- ==============================================================================
-- Schema: contact_submissions for Purnima Gupta Portfolio
-- Platform: Supabase PostgreSQL
-- ==============================================================================

-- Enable UUID extension if not already available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create the contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(254) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    inquiry_type VARCHAR(50) DEFAULT 'General Inquiry',
    message TEXT NOT NULL,
    privacy_consent BOOLEAN NOT NULL DEFAULT TRUE,
    status VARCHAR(30) NOT NULL DEFAULT 'new',
    ip_hash TEXT,
    email_notification_sent BOOLEAN DEFAULT FALSE,
    email_notification_error TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexes for performance and quick searching
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions (email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions (status);

-- 3. Row Level Security (RLS)
-- Crucial Security Requirement: Prevent public read/write access via Supabase public anon key.
-- Only the backend Vercel serverless function using the SUPABASE_SERVICE_ROLE_KEY can insert/read.
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow inserts only through authenticated service role or backend API
CREATE POLICY "Allow service_role full access to contact_submissions"
ON public.contact_submissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Explicitly disallow anonymous public reads
-- (By default, when RLS is enabled with no anon policy, anon cannot select or delete rows)

-- 4. Comment on table and columns for documentation
COMMENT ON TABLE public.contact_submissions IS 'Stores visitor inquiries and hire-me contact submissions for Purnima Gupta portfolio.';
COMMENT ON COLUMN public.contact_submissions.ip_hash IS 'SHA-256 hash of visitor IP for rate-limiting and spam mitigation without storing raw PII.';
