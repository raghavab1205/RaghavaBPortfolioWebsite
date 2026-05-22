# Deployment Guide - freeUPlance AI/ML Website

## Quick Start: Deploy to Vercel in 5 Minutes

### Prerequisites
- GitHub/GitLab account
- Vercel account (free at vercel.com)
- Git installed on your machine

### Step 1: Push to Git Repository

```bash
# From the project root
git init
git add .
git commit -m "Initial freeUPlance AI/ML portfolio commit"
git remote add origin https://github.com/YOUR_USERNAME/freeuplance-portfolio.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub/GitLab account
3. Click "New Project"
4. Select your repository
5. Click "Import"

### Step 3: Configure Build Settings

**Root Directory**: `frontend`
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Environment Variables**: None required

### Step 4: Deploy

Click "Deploy" - Vercel will automatically:
- Install dependencies
- Build the project
- Deploy to a live URL

---

## Custom Domain Setup

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

---

## Continuous Deployment

After initial setup, every push to your repository will automatically:
1. Trigger a build
2. Run tests
3. Deploy to production (if successful)

---

## Environment Variables (Optional)

If you add backend integration later:

1. Go to Project Settings → Environment Variables
2. Add variables like:
   ```
   VITE_API_URL=https://your-api.com
   VITE_CONTACT_EMAIL=contact@example.com
   ```

3. Use in code:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL;
   ```

---

## Local Development

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Troubleshooting

### Build Fails
- Check that all imports are correct
- Run `npm install` to ensure dependencies
- Check TypeScript errors: `npx tsc --noEmit`

### Styles Not Loading
- Verify CSS files are imported in `src/main.tsx`
- Check that CSS file paths are relative to `src/`

### Images Not Showing
- Ensure image paths start with `/`
- Images should be in `public/` folder
- Current images: `/images/freeuplance_motorsport_jssate_cover.jfif`

### Links Not Working
- Use React Router Link for internal navigation
- Only use `<a>` tags for external links
- Verify routes in `src/App.tsx`

---

## Performance Tips

1. **Image Optimization**
   - Use modern formats (WebP)
   - Compress images before upload
   - Use responsive images

2. **Code Splitting**
   - Vite automatically handles this
   - No additional configuration needed

3. **Caching**
   - Vercel caches assets automatically
   - Set cache headers in `vercel.json` if needed

---

## Monitoring & Analytics

### Add Google Analytics (Optional)

1. Create property at [google.com/analytics](https://analytics.google.com)
2. Install package: `npm install -D @vite-pwa/assets-generator`
3. Add tracking code to `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## Backend Integration

### Contact Form Integration (Example: Firebase)

1. Install Firebase: `npm install firebase`
2. Initialize in `src/pages/contact.tsx`:

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// In handleSubmit:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await addDoc(collection(db, 'contacts'), formData);
    setSubmitted(true);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## Security Checklist

- ✅ No sensitive data in code
- ✅ Environment variables for secrets
- ✅ HTTPS enabled (Vercel default)
- ✅ Form validation implemented
- ✅ No console logging in production

---

## Success Metrics

After deployment, verify:
- ✅ All pages load
- ✅ Navigation works
- ✅ Responsive design works
- ✅ Forms functional (if backend added)
- ✅ Images load correctly
- ✅ Animations smooth

---

## Support & Documentation

- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Vercel Docs**: https://vercel.com/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs

---

**Status**: Ready to Deploy 🚀

For questions or issues, refer to the official documentation for each tool/service.
