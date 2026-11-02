/**
 * Vercel Serverless Function: /api/contact
 * Handles contact form submissions, Supabase PostgreSQL storage, and Resend email dispatch.
 * Uses native fetch and crypto (no heavy dependencies).
 */

const crypto = require('crypto');

// In-memory rate limiting map for basic abuse prevention
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimitMap.entries()) {
    if (now - data.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000).unref();

function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return typeof email === 'string' && email.length <= 254 && emailRegex.test(email.trim());
}

module.exports = async function handler(req, res) {
  // Set CORS and JSON security headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  try {
    const body = req.body || {};

    // 1. Honeypot check for automated spam bots
    if (body.website_trap || body._gotcha) {
      // Silently accept to thwart bot retries without storing
      return res.status(200).json({
        success: true,
        message: 'Your inquiry has been received.'
      });
    }

    // 2. Client IP & Rate Limiting
    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';
    const ipHash = crypto.createHash('sha256').update(clientIp + (process.env.IP_SALT || 'purnima_portfolio_salt')).digest('hex');

    const now = Date.now();
    const rateData = rateLimitMap.get(ipHash) || { count: 0, firstRequestTime: now };

    if (now - rateData.firstRequestTime > RATE_LIMIT_WINDOW_MS) {
      rateData.count = 1;
      rateData.firstRequestTime = now;
    } else {
      rateData.count += 1;
      if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({
          success: false,
          error: 'Too many submissions from this connection. Please wait a few minutes before trying again.'
        });
      }
    }
    rateLimitMap.set(ipHash, rateData);

    // 3. Extract and Validate Input
    const fullName = sanitizeText(body.full_name);
    const email = (body.email || '').trim().toLowerCase();
    const subject = sanitizeText(body.subject);
    const inquiryType = sanitizeText(body.inquiry_type) || 'General Inquiry';
    const message = (body.message || '').trim();
    const privacyConsent = Boolean(body.privacy_consent);

    const validationErrors = [];
    if (!fullName || fullName.length < 2 || fullName.length > 120) {
      validationErrors.push('Full name must be between 2 and 120 characters.');
    }
    if (!isValidEmail(email)) {
      validationErrors.push('A valid email address is required.');
    }
    if (!subject || subject.length < 3 || subject.length > 200) {
      validationErrors.push('Subject must be between 3 and 200 characters.');
    }
    if (!message || message.length < 10 || message.length > 3000) {
      validationErrors.push('Message must be between 10 and 3,000 characters.');
    }
    if (!privacyConsent) {
      validationErrors.push('You must agree to the privacy consent to submit.');
    }

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: validationErrors[0],
        errors: validationErrors
      });
    }

    // 4. Supabase Database Storage
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    let submissionId = null;
    let dbSuccess = false;

    if (supabaseUrl && supabaseKey) {
      try {
        const dbResponse = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/contact_submissions`, {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({
            full_name: fullName,
            email: email,
            subject: subject,
            inquiry_type: inquiryType,
            message: message,
            privacy_consent: privacyConsent,
            ip_hash: ipHash,
            status: 'new'
          })
        });

        if (!dbResponse.ok) {
          const dbErrorText = await dbResponse.text();
          console.error('[Database Error] Failed to insert contact submission:', dbResponse.status, dbErrorText);
          return res.status(500).json({
            success: false,
            error: 'Database storage error. Please reach out directly to gpurnima966@gmail.com.'
          });
        }

        const insertedRecords = await dbResponse.json();
        submissionId = insertedRecords[0]?.id || null;
        dbSuccess = true;
      } catch (dbErr) {
        console.error('[Database Exception]:', dbErr);
        return res.status(500).json({
          success: false,
          error: 'Could not connect to database storage. Please email gpurnima966@gmail.com directly.'
        });
      }
    } else {
      console.warn('[Environment Warning] Supabase credentials not yet configured in environment variables.');
      // When deployed in staging without keys configured yet, acknowledge data to allow testing
      submissionId = 'local-staging-' + Date.now();
      dbSuccess = true;
    }

    // 5. Resend Email Notification
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || 'gpurnima966@gmail.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    let emailSent = false;
    let emailErrorMsg = null;

    if (resendApiKey) {
      try {
        const submissionDate = new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Kathmandu',
          dateStyle: 'full',
          timeStyle: 'long'
        });

        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F172A; background-color: #F8FAFC; margin: 0; padding: 24px; }
                .card { background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; max-width: 600px; margin: 0 auto; padding: 32px; box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.05); }
                .header { border-bottom: 2px solid #7C3AED; padding-bottom: 16px; margin-bottom: 24px; }
                .badge { display: inline-block; background-color: #F5F3FF; color: #7C3AED; font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.05em; }
                .title { font-size: 20px; font-weight: 700; color: #0F172A; margin: 12px 0 4px 0; }
                .field { margin-bottom: 16px; }
                .label { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #64748B; margin-bottom: 4px; }
                .value { font-size: 15px; color: #334155; }
                .message-box { background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 6px; padding: 16px; font-size: 15px; line-height: 1.6; color: #1E293B; white-space: pre-wrap; }
                .footer { font-size: 12px; color: #94A3B8; margin-top: 24px; padding-top: 16px; border-top: 1px solid #F1F5F9; }
              </style>
            </head>
            <body>
              <div class="card">
                <div class="header">
                  <span class="badge">${escapeHtml(inquiryType)}</span>
                  <h1 class="title">New Portfolio Contact Submission</h1>
                  <div style="font-size: 13px; color: #64748B;">Received: ${submissionDate} (Nepal Time)</div>
                </div>

                <div class="field">
                  <div class="label">Sender Name</div>
                  <div class="value"><strong>${escapeHtml(fullName)}</strong></div>
                </div>

                <div class="field">
                  <div class="label">Sender Email</div>
                  <div class="value"><a href="mailto:${escapeHtml(email)}" style="color: #7C3AED; text-decoration: none;">${escapeHtml(email)}</a></div>
                </div>

                <div class="field">
                  <div class="label">Subject</div>
                  <div class="value"><strong>${escapeHtml(subject)}</strong></div>
                </div>

                <div class="field">
                  <div class="label">Message</div>
                  <div class="message-box">${escapeHtml(message)}</div>
                </div>

                <div class="footer">
                  This message was submitted via the contact form on <a href="https://www.purnimagupta.com.np/" style="color: #7C3AED;">purnimagupta.com.np</a>.<br>
                  Hit "Reply" in your email client to respond directly to ${escapeHtml(fullName)} (${escapeHtml(email)}).
                </div>
              </div>
            </body>
          </html>
        `;

        const emailPayload = {
          from: fromEmail,
          to: [toEmail],
          reply_to: email,
          subject: `New Portfolio Inquiry — ${fullName} [${inquiryType}]`,
          html: emailHtml,
          text: `New Portfolio Inquiry\nFrom: ${fullName} (${email})\nType: ${inquiryType}\nSubject: ${subject}\nDate: ${submissionDate}\n\nMessage:\n${message}\n`
        };

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailPayload)
        });

        if (resendRes.ok) {
          emailSent = true;
        } else {
          const resendErr = await resendRes.text();
          emailErrorMsg = `Resend API error (${resendRes.status}): ${resendErr}`;
          console.error('[Resend Error]', emailErrorMsg);
        }
      } catch (mailEx) {
        emailErrorMsg = mailEx.message || 'Unknown email dispatch exception';
        console.error('[Resend Exception]', mailEx);
      }
    } else {
      console.warn('[Environment Warning] RESEND_API_KEY is not configured in environment variables.');
    }

    // 6. Asynchronously update Supabase with email delivery status if available
    if (supabaseUrl && supabaseKey && submissionId && typeof submissionId === 'string' && !submissionId.startsWith('local-')) {
      try {
        await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/contact_submissions?id=eq.${submissionId}`, {
          method: 'PATCH',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email_notification_sent: emailSent,
            email_notification_error: emailErrorMsg
          })
        });
      } catch (patchErr) {
        console.error('[Status Update Error]', patchErr);
      }
    }

    // 7. Formulate Final Response to User
    if (dbSuccess) {
      if (!resendApiKey || emailSent) {
        return res.status(200).json({
          success: true,
          message: 'Thank you! Your message has been received. I will get back to you promptly.',
          submissionId: submissionId
        });
      } else {
        // Message is safely in the database, but email dispatch had a delay
        return res.status(200).json({
          success: true,
          warning: 'Your inquiry was safely saved to the database, though real-time email dispatch experienced a brief delay.',
          message: 'Thank you! Your message has been stored and Purnima will review it shortly.',
          submissionId: submissionId
        });
      }
    }

    return res.status(500).json({
      success: false,
      error: 'Unable to process your request at this time. Please email gpurnima966@gmail.com directly.'
    });

  } catch (err) {
    console.error('[API Contact Handler Fatal Error]:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred. Please contact gpurnima966@gmail.com directly.'
    });
  }
};
