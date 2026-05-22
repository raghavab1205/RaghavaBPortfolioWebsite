# Content Editing Guide - freeUPlance AI/ML Portfolio

## How to Update Content

### Home Page (`src/pages/home.tsx`)

#### Hero Section
**Location**: Lines 17-26
```typescript
<h1 className="hero-title">
  Advanced AI & ML Solutions for Your Business
</h1>
```
✏️ **Edit**: Update headline and subtitle with your actual team focus

#### Services Cards
**Location**: Lines 39-58
```typescript
{
  title: 'AI Chatbots & RAG',
  description: 'Intelligent conversational systems...'
}
```
✏️ **Edit**: Update title, description for your services

---

### About Page (`src/pages/about.tsx`)

#### Mission, Vision, Values
**Location**: Lines 25-63
```typescript
<p>
  To empower businesses with cutting-edge AI and ML solutions...
</p>
```
✏️ **Edit**: Replace placeholder text with your actual mission/vision

#### Team Members
**Location**: Lines 66-120

Current placeholders:
- AI/ML Engineer (LLMs & Natural Language Processing)
- ML Engineer (Model Development & Optimization)
- DevOps/MLOps Engineer (Deployment & Infrastructure)

✏️ **Edit**: 
1. Change titles if needed
2. Update specialties
3. Update expertise lists with actual skills

Example:
```typescript
<h3>AI Engineer - Sarah Chen</h3>
<p className="specialty">LLMs & Prompt Engineering Expert</p>
```

#### Why Choose Us Section
**Location**: Lines 133-184
```typescript
<h4>Specialized Expertise</h4>
<p>Focused entirely on AI and ML solutions...</p>
```
✏️ **Edit**: Update the 6 benefits to match your value proposition

---

### Services Page (`src/pages/services.tsx`)

#### Main Services (3 offerings)
**Location**: Lines 9-39

Current services:
1. AI Chatbots & RAG Systems
2. Automation Systems
3. ML & DevOps Solutions

✏️ **Edit**:
```typescript
const services = [
  {
    id: 1,
    title: 'Your Service Title',
    icon: '🤖',  // Change emoji
    description: 'Your description',
    features: ['Feature 1', 'Feature 2', ...],
    details: 'Detailed explanation...',
  },
  // Add/remove services as needed
];
```

#### Featured Projects
**Location**: Lines 41-58

Current projects:
1. E-Commerce Recommendation Engine
2. Customer Support Chatbot
3. Data Processing Pipeline

✏️ **Edit**:
```typescript
{
  id: 1,
  title: 'Your Project Name',
  description: 'What it does',
  tech: ['Technology 1', 'Technology 2'],
},
```

---

### Contact Page (`src/pages/contact.tsx`)

#### FAQ Section
**Location**: Lines 90-130

Current FAQs cover:
- Project timeline
- Post-deployment support
- Tech stack
- System integration
- Data privacy
- Pricing

✏️ **Edit**: Update answers to reflect your actual practices

```typescript
{
  <div className="faq-item">
    <h4>Your Question?</h4>
    <p>Your answer...</p>
  </div>
}
```

#### Contact Info Cards
**Location**: Lines 48-63

Current cards:
- Fast Response (24 hours)
- Tailored Solutions
- Professional Team
- Secure & Reliable

✏️ **Edit**: Update descriptions to match your service

---

## Styling Updates

### Update Colors
**File**: `src/styles/global.css`

**CSS Variables** (Lines 4-30):
```css
:root {
  /* Change primary color */
  --primary: #0f172a;           /* Dark blue-black */
  --secondary: #3b82f6;         /* Bright blue */
  --accent: #8b5cf6;            /* Purple */
  /* ... other colors ... */
}
```

### Update Fonts
**File**: `src/styles/global.css`

The custom fonts are available in `public/fonts/`:
- RacingEngine-Regular.otf
- Pro Racing.otf

To use them in specific elements:
```css
h1 {
  font-family: 'RacingEngine', sans-serif;
}

h2 {
  font-family: 'ProRacing', sans-serif;
}
```

---

## Image Updates

### Logo
**Current**: `public/images/freeuplance_motorsport_jssate_cover.jfif`
**Location**: `src/components/header.tsx` (line 30)

✏️ **To replace**:
1. Add new image to `public/images/`
2. Update path in header.tsx:
```typescript
<img src="/images/your-logo.png" alt="freeUPlance AI/ML" />
```

### Hero Background
**Current**: Gradient (no image)
**Location**: `src/pages/home.css` (line 22)

✏️ **To add background image**:
```css
.hero {
  background: linear-gradient(...), url('/images/bg.jpg');
  background-size: cover;
}
```

---

## Form Integration

### Contact Form Submission
**Current**: Local state (no backend)
**File**: `src/pages/contact.tsx` (line 19)

✏️ **To integrate with backend**:

#### Option 1: Firebase
```typescript
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

#### Option 2: REST API
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch('https://your-api.com/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      setSubmitted(true);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## SEO Updates

### Meta Tags
**File**: `index.html`

**Current** (lines 6-8):
```html
<meta name="description" content="freeUPlance AI/ML - Advanced artificial intelligence...">
<meta name="theme-color" content="#0f172a">
<title>freeUPlance AI/ML - Advanced AI & ML Solutions</title>
```

✏️ **To update**:
```html
<meta name="description" content="Your company description">
<title>Your Company Name - Your tagline</title>

<!-- Add these for better SEO -->
<meta name="keywords" content="AI, ML, automation, chatbots">
<meta property="og:title" content="Your Company">
<meta property="og:description" content="Your description">
```

---

## Navigation Updates

### Add New Page
**File**: `src/App.tsx`

1. Create new file `src/pages/yourpage.tsx`
2. Add import:
```typescript
import YourPage from './pages/yourpage';
```

3. Add route:
```typescript
<Route path="/yourpage" element={<YourPage />} />
```

4. Update header navigation in `src/components/header.tsx`:
```typescript
const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/yourpage', label: 'Your Page' },  // Add this
  { path: '/contact', label: 'Contact' },
];
```

---

## Content Checklist

Before deployment, verify:

- ✅ All team member names updated
- ✅ Service descriptions accurate
- ✅ Project details complete
- ✅ Contact form backend integrated (if needed)
- ✅ Company logo updated
- ✅ Meta tags/SEO updated
- ✅ FAQ answers reflect your policies
- ✅ CTA buttons link to correct pages
- ✅ No "TODO" or "placeholder" text remaining
- ✅ All external links working

---

## Best Practices

### Content Writing
- ✅ Use clear, professional language
- ✅ Keep sections concise
- ✅ Use bullet points for lists
- ✅ Include CTAs in key sections

### Images
- ✅ Compress before uploading
- ✅ Use descriptive alt text
- ✅ Maintain aspect ratios
- ✅ Keep file sizes < 500KB

### Links
- ✅ Test all links before deployment
- ✅ Use absolute URLs for external links
- ✅ Use React Router Link for internal pages
- ✅ Add rel="noopener noreferrer" for external links

---

## Quick Reference

| Section | File | Key Lines | Edit Type |
|---------|------|-----------|-----------|
| Home Hero | home.tsx | 17-26 | Headline/Subtitle |
| Services | services.tsx | 9-39 | Service descriptions |
| Projects | services.tsx | 41-58 | Project details |
| Team | about.tsx | 66-120 | Team bios |
| FAQ | contact.tsx | 90-130 | Answers |
| Colors | global.css | 4-30 | CSS Variables |
| Meta Tags | index.html | 6-8 | HTML attributes |

---

## Need Help?

Common tasks and solutions:

**Q: How do I change the color scheme?**
A: Edit CSS variables in `src/styles/global.css` lines 4-30

**Q: How do I add a new service?**
A: Update the `services` array in `src/pages/services.tsx`

**Q: How do I update team information?**
A: Edit the team cards in `src/pages/about.tsx`

**Q: How do I add backend to contact form?**
A: See "Form Integration" section above

**Q: How do I change the logo?**
A: Replace image and update path in `src/components/header.tsx`

---

**Last Updated**: May 1, 2026  
**Version**: 1.0  
**Status**: Ready for Customization
