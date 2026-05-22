# Environment Variables Reference

## Local Development (.env.local)

Copy this template to `.env.local` in your project root:

```bash
# ===== FRONTEND (Public) =====
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ===== BACKEND (Secret - Never expose!) =====
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
CONTACT_ADMIN_EMAIL=your-email@example.com
ALLOWED_ORIGIN=http://localhost:5173
```

## Where to Find Each Value

### VITE_SUPABASE_URL
1. Supabase Dashboard → Project Settings → API
2. Copy "Project URL"
3. Format: `https://xxxxxxxxxxxxx.supabase.co`

### VITE_SUPABASE_ANON_KEY
1. Supabase Dashboard → Project Settings → API
2. Copy "Anon public key"
3. Long string starting with `eyJ...`

### SUPABASE_SERVICE_ROLE_KEY
1. Supabase Dashboard → Project Settings → API
2. Copy "Service role key"
3. ⚠️ **KEEP THIS SECRET!** Never expose publicly
4. Never commit to Git

### RESEND_API_KEY
1. Resend Dashboard → API Keys
2. Copy your API key
3. Format: `re_xxxxxxxxxxxxxxxxxxxxx`
4. ⚠️ **KEEP THIS SECRET!**

### CONTACT_ADMIN_EMAIL
- Your email address where form submissions will be sent
- Example: `admin@example.com`

### ALLOWED_ORIGIN
- **Development**: `http://localhost:5173`
- **Production**: `https://freeuplance.com` (your domain)
- Used for CORS protection

## Vercel Deployment

Add these same variables in Vercel:

1. Vercel Project → Settings → Environment Variables
2. Add each variable above
3. Set environment to: Production, Preview, Development (all three)
4. Redeploy project

## ⚠️ Security Checklist

- [ ] `.env.local` is in `.gitignore` (don't commit)
- [ ] Service Role Key never exposed in frontend code
- [ ] Only `VITE_` prefixed variables sent to browser
- [ ] All backend keys only in Vercel environment
- [ ] Regenerate keys if accidentally committed
- [ ] Use strong password for Supabase
- [ ] Enable Supabase HTTPS enforcement

## Testing Environment Variables

Run this in your terminal to verify setup:

```bash
# Should output your Supabase URL
echo $VITE_SUPABASE_URL

# Should output the anon key
echo $VITE_SUPABASE_ANON_KEY

# Should output the service role key
echo $SUPABASE_SERVICE_ROLE_KEY

# Should output the API key
echo $RESEND_API_KEY
```

## Common Issues

### Variables not loading in Vercel
- Restart deployment after adding variables
- Check variable names match exactly (case-sensitive)
- Ensure no extra spaces or quotes

### Frontend can't access VITE_ variables
- Make sure variable name starts with `VITE_`
- Rebuild after changing env variables
- Check `.env.local` file exists

### Backend can't access server variables
- Make sure variable does NOT start with `VITE_`
- Variable must be set in Vercel environment
- Redeploy after adding variables

---

**Remember**: Never share your API keys publicly! 🔒
