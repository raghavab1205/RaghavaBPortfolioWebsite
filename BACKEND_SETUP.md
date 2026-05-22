# Contact Form Backend Setup Guide

This guide walks you through setting up the production-ready contact form backend with Vercel Serverless Functions, Supabase, and Resend.

## Overview

The backend system includes:
- **API Endpoint**: Vercel Serverless Function (`/api/contact.ts`)
- **Database**: Supabase PostgreSQL for storing submissions
- **Email Service**: Resend for notification emails
- **Validation**: Zod schema validation
- **Security**: Rate limiting, honeypot anti-spam, input sanitization

## Prerequisites

- Git repository pushed to GitHub (for Vercel deployment)
- Vercel account (free tier is sufficient)
- Supabase account (free tier is sufficient)
- Resend account (free tier includes 100 emails/day)

---

## Step 1: Install Dependencies

Run this command in your project root:

```bash
npm install zod @supabase/supabase-js resend
npm install --save-dev @vercel/node
```

These packages are already added to `package.json`. Just run:

```bash
npm install
```

---

## Step 2: Supabase Setup

### 2.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign in with GitHub (easiest option)
3. Click "New Project"
4. Fill in project details:
   - **Name**: `freeuplance`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
5. Wait for project to initialize (2-3 minutes)

### 2.2 Create the Contacts Table

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL:

```sql
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (form submissions)
CREATE POLICY "Allow public inserts" ON contacts
  FOR INSERT WITH CHECK (true);

-- Only allow users to read their own submissions (optional, for future user accounts)
CREATE POLICY "Allow users to read own submissions" ON contacts
  FOR SELECT USING (auth.uid() IS NOT NULL);
```

4. Click **Run**
5. Verify the table appears in the left sidebar under "Tables"

### 2.3 Get Supabase Credentials

1. Go to **Project Settings** (gear icon)
2. Click **API** in left sidebar
3. Copy these values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon Public Key** → `VITE_SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

---

## Step 3: Resend Setup

### 3.1 Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up with email
3. Verify your email
4. Go to **API Keys** in dashboard
5. Copy your API key → `RESEND_API_KEY`

### 3.2 Add Sending Domain (Optional but Recommended)

For production, add your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter `freeuplance.com` (or your domain)
4. Follow DNS setup instructions
5. Once verified, emails will be sent from `noreply@freeuplance.com`

**For testing**: You can use default `noreply@resend.dev` (included in API)

---

## Step 4: Environment Variables

### 4.1 Local Development (.env.local)

Create a `.env.local` file in your project root:

```bash
# Supabase
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Backend only (never expose to frontend)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
RESEND_API_KEY=re_your-api-key-here
CONTACT_ADMIN_EMAIL=your-email@example.com
ALLOWED_ORIGIN=http://localhost:5173
```

### 4.2 Important Notes

- **VITE_** prefix: Frontend can access these via `process.env.VITE_*`
- **No VITE_ prefix**: Backend only, secure in Vercel
- Never commit `.env.local` to Git (already in `.gitignore`)
- Never expose `SUPABASE_SERVICE_ROLE_KEY` publicly

---

## Step 5: Test Locally

### 5.1 Start Development Server

```bash
npm run dev
```

### 5.2 Test the Endpoint

Open `http://localhost:5173/contact` and try submitting the form.

**Expected behavior**:
- Form validation runs
- Loading state shows "Sending..."
- Success message appears if valid
- Email sent to `CONTACT_ADMIN_EMAIL`
- Data stored in Supabase `contacts` table

### 5.3 Debug Issues

Check browser console for errors:

```javascript
// This will show API response details
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message',
    honeypot: ''
  })
})
.then(r => r.json())
.then(console.log)
```

---

## Step 6: Deploy to Vercel

### 6.1 Push to GitHub

```bash
git add .
git commit -m "Add contact form backend"
git push origin main
```

### 6.2 Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Select your GitHub repository
4. Click **Import**
5. In **Environment Variables**, add:

```
VITE_SUPABASE_URL = https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY = your-service-role-key-here
RESEND_API_KEY = re_your-api-key-here
CONTACT_ADMIN_EMAIL = your-email@example.com
ALLOWED_ORIGIN = https://freeuplance.com
```

6. Click **Deploy**
7. Wait for build to complete
8. Test the form at your deployment URL

### 6.3 Update ALLOWED_ORIGIN After Deployment

Once your site is deployed:

1. Go to Vercel project settings
2. Update **ALLOWED_ORIGIN** to your production URL
3. Redeploy (Vercel will auto-redeploy)

---

## Security Features Implemented

### 1. **Input Validation (Zod)**
- All fields validated against schema
- Type-safe data handling
- Clear error messages

### 2. **Honeypot Field**
- Hidden field to catch bots
- Simple but effective anti-spam
- Silent failure (returns success but doesn't process)

### 3. **Rate Limiting**
- 5 submissions per IP per hour
- Returns 429 status if exceeded
- In-memory store (for production, consider Redis)

### 4. **Data Security**
- Service Role key kept server-side only
- Anon key limited to inserts only
- No sensitive data exposed to frontend

### 5. **Input Sanitization**
- HTML escaping in email templates
- No script injection risks
- Safe database queries with parameterized statements

### 6. **CORS Protection**
- Whitelist allowed origins
- Prevents requests from unknown domains

---

## File Structure

```
frontend/
├── api/
│   └── contact.ts              ← Vercel serverless function
├── lib/
│   ├── supabase.ts             ← Supabase client setup
│   ├── resend.ts               ← Email templates & sending
│   └── validation.ts           ← Zod schemas & validation
├── src/
│   └── pages/
│       └── contact.tsx         ← Updated form component
├── .env.local                  ← Local environment variables (NOT in Git)
├── package.json                ← Updated with new dependencies
└── vercel.json                 ← Already configured for API routes
```

---

## Troubleshooting

### Issue: "SUPABASE_SERVICE_ROLE_KEY is not defined"

**Solution**: Add `SUPABASE_SERVICE_ROLE_KEY` to Vercel environment variables

### Issue: "Invalid RESEND_API_KEY"

**Solution**: 
1. Check key is correct in Vercel
2. Make sure it starts with `re_`
3. Try generating a new key in Resend dashboard

### Issue: "Submission inserted but email not sent"

**This is OK**. Emails are non-blocking - form is saved in database even if email fails. Check Resend dashboard for delivery details.

### Issue: "CORS error: blocked by browser"

**Solution**: Ensure `ALLOWED_ORIGIN` in Vercel matches your domain exactly:
- Local: `http://localhost:5173`
- Production: `https://freeuplance.com` (no trailing slash)

### Issue: Rate limit too strict/lenient

**Solution**: Edit `api/contact.ts`:
```typescript
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 5; // Change to desired limit
```

---

## Email Templates

### Admin Notification Email
- Sent to `CONTACT_ADMIN_EMAIL`
- Contains: Name, Email, Subject, Message
- Reply-To set to user's email

### User Confirmation Email
- Sent to user's email
- Confirms receipt of message
- Professional freeUPlance branding

Both templates are in `lib/resend.ts`

---

## Monitoring & Analytics

### View Submissions in Supabase

1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Select **contacts** table
4. See all submissions with timestamps

### Monitor Emails in Resend

1. Go to Resend Dashboard
2. Click **Logs**
3. See delivery status, bounces, etc.

### Check Vercel Logs

1. Go to Vercel Project
2. Click **Logs** tab
3. Filter by endpoint `/api/contact`
4. See errors and request details

---

## Next Steps (Optional Enhancements)

1. **Database**: Migrate to Redis for better rate limiting
2. **Analytics**: Add form submission analytics
3. **Notifications**: Send Slack/Discord alerts for new submissions
4. **Confirmation**: Add email confirmation links
5. **Storage**: Archive old submissions to long-term storage
6. **Automation**: Create Zapier integration to add submissions to CRM

---

## Support

For issues:
1. Check the **Troubleshooting** section
2. Review Vercel logs for API errors
3. Check Resend dashboard for email issues
4. Verify Supabase table structure matches SQL
5. Ensure all environment variables are set correctly

---

**Backend setup complete! Your contact form is now production-ready.** 🚀
