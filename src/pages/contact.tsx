// UI ONLY CHANGE
import React, { useState } from 'react';
import './contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validation rules
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 50) return 'Name must be less than 50 characters';
        return null;

      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return null;

      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 3) return 'Subject must be at least 3 characters';
        if (value.trim().length > 100) return 'Subject must be less than 100 characters';
        return null;

      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 2000) return 'Message must be less than 2000 characters';
        return null;

      default:
        return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    const fieldError = validateField(name, value);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));

    // Clear global error when user starts typing
    if (error) setError(null);
  };

  const validateForm = (): boolean => {
    const errors: typeof fieldErrors = {};

    ['name', 'email', 'subject', 'message'].forEach((fieldName) => {
      const error = validateField(fieldName, formData[fieldName as keyof typeof formData]);
      if (error) {
        errors[fieldName as keyof typeof fieldErrors] = error;
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate all fields before submitting
    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setFieldErrors({});
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Page Header */}
      <section className="section contact-header">
        <div className="container">
          <div className="section-title">
            <h1>Drop Me a Note</h1>
            <p className="handwritten">I'd love to hear from you — whether it's a project idea, a question, or just to say hi</p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h3 className="handwritten">Write me a letter</h3>
              {submitted && (
                <div className="success-message">
                  <p>✓ Thanks for writing! I'll get back to you soon.</p>
                </div>
              )}
              {error && (
                <div className="error-message">
                  <p>✗ {error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="Your name"
                    className={fieldErrors.name ? 'input-error' : ''}
                  />
                  {fieldErrors.name && (
                    <span className="field-error-message">⚠ {fieldErrors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="your@email.com"
                    className={fieldErrors.email ? 'input-error' : ''}
                  />
                  {fieldErrors.email && (
                    <span className="field-error-message">⚠ {fieldErrors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="What's on your mind?"
                    className={fieldErrors.subject ? 'input-error' : ''}
                  />
                  {fieldErrors.subject && (
                    <span className="field-error-message">⚠ {fieldErrors.subject}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    placeholder="Write your thoughts here..."
                    rows={6}
                    className={fieldErrors.message ? 'input-error' : ''}
                  />
                  {fieldErrors.message && (
                    <span className="field-error-message">⚠ {fieldErrors.message}</span>
                  )}
                </div>

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <button 
                  type="submit" 
                  className="btn submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Letter'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-wrapper">
              <h3>A few things about me</h3>

              <div className="info-card">
                <h4>Quick Reply</h4>
                <p>I usually respond within a day or two</p>
              </div>

              <div className="info-card">
                <h4>Always Learning</h4>
                <p>Currently exploring creative coding and AI art</p>
              </div>

              <div className="info-card">
                <h4>Open to Ideas</h4>
                <p>I love collaborating on interesting problems</p>
              </div>

              <div className="info-card">
                <h4>Chai Lover</h4>
                <p>Best ideas come with a good cup of chai ☕</p>
              </div>

              <div className="divider"></div>

              <div className="contact-details">
                <h4>What to expect</h4>
                <p>
                  Share whatever's on your mind. I read every message and love connecting with fellow builders, learners, and curious people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-title">
            <h2>Questions/Doubts</h2>
            <p>Things you might want to ask</p>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h4>Are you available for freelance work?</h4>
              <p>
                It depends on the project! I'm open to freelance and contract work. Send me a message with details about what you need and we can figure it out together.
              </p>
            </div>

            <div className="faq-item">
              <h4>What technologies do you use?</h4>
              <p>
                I work primarily with Python, JavaScript/TypeScript, React, and various AI/ML tools. I pick the best tool for each job rather than sticking to one stack.
              </p>
            </div>

            <div className="faq-item">
              <h4>Can I see your code?</h4>
              <p>
                Most of my projects are on GitHub! I believe in open source and share my work whenever I can. Check out my projects page for links.
              </p>
            </div>

            <div className="faq-item">
              <h4>Do you do design work too?</h4>
              <p>
                I enjoy the intersection of design and development. While I'm not a graphic designer, I care deeply about user experience and visual aesthetics.
              </p>
            </div>

            <div className="faq-item">
              <h4>What's your background?</h4>
              <p>
                I'm a self-taught developer with a passion for building things. Head over to my About page for the full story of my journey.
              </p>
            </div>

            <div className="faq-item">
              <h4>How can I support your work?</h4>
              <p>
                The best support is connecting, sharing feedback, or collaborating on something cool. Star my repos on GitHub or just drop me a nice note!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section final-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Still scrolling?</h2>
            <p className="handwritten">Go ahead, write me a letter. I promise I read every one.</p>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn btn-secondary">
              Back to top ↑
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
