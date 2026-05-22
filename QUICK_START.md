# Quick Start: Contact Form Backend

**Estimated Time**: 30 minutes

## What You Need

- Vercel account (free)
- Supabase account (free)  
- Resend account (free)
- GitHub repo (to deploy)

## Step-by-Step Setup

### 1. Install Dependencies (2 min)

```bash
npm install
```

### 2. Supabase Setup (5 min)

**Create Project:**
1. Go to [supabase.com](https://supabase.com) → Sign in
2. New Project → Name: `freeuplance`
3. Wait for setup (2 min)

**Create Table:**
1. SQL Editor → New Query
2. Paste and run this:

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

CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts" ON contacts FOR INSERT WITH CHECK (true);
```

**Get Credentials:**
1. Project Settings → API
2. Copy:
   - Project URL
   - Anon Public Key
   - Service Role Key (keep secret!)

### 3. Resend Setup (3 min)

1. Go to [resend.com](https://resend.com) → Sign up
2. API Keys → Copy your key
3. (Optional) Add domain in "Domains" section

### 4. Environment Variables (3 min)

Create `.env.local` in project root:

```bash
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
RESEND_API_KEY=your_api_key_here
CONTACT_ADMIN_EMAIL=your_email@example.com
ALLOWED_ORIGIN=http://localhost:5173
```

### 5. Test Locally (5 min)

```bash
npm run dev
```

1. Go to `http://localhost:5173/contact`
2. Fill form and submit
3. Check:
   - ✅ Email received
   - ✅ Data in Supabase table

### 6. Deploy to Vercel (7 min)

**Push to GitHub:**
```bash
git add .
git commit -m "Add contact form backend"
git push
```

**Deploy:**
1. [vercel.com](https://vercel.com) → Add Project
2. Select your GitHub repo
3. Environment Variables → Add all 6 variables
4. Deploy

**Update After Deploy:**
1. Get your Vercel URL (e.g., `https://freeuplance.vercel.app`)
2. Go to Vercel → Environment Variables
3. Change `ALLOWED_ORIGIN` to your domain
4. Redeploy

### 7. Final Test (2 min)

Go to your Vercel URL `/contact` page and test the form.

Done! ✅

---

## Troubleshooting

**Form not submitting?**
- Check browser console (F12) for errors
- Verify environment variables in Vercel
- Check ALLOWED_ORIGIN matches your domain

**Email not received?**
- Check spam folder
- Verify RESEND_API_KEY is correct
- Check Resend dashboard for delivery failures

**Data not in Supabase?**
- Verify table exists in Supabase
- Check database credentials are correct
- Look at Vercel logs for errors

---

## Where to Find Things

**Form Code**: `src/pages/contact.tsx`
**API Code**: `api/contact.ts`
**Validation**: `lib/validation.ts`
**Database**: `lib/supabase.ts`
**Email**: `lib/resend.ts`

**Full Guide**: See `BACKEND_SETUP.md`
**Env Reference**: See `ENV_REFERENCE.md`

---

**That's it!** Your contact form backend is now live! 🚀
