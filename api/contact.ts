import { VercelRequest, VercelResponse } from '@vercel/node';
import { validateContactForm, isHoneypotFilled } from '../lib/validation.js';
import { getServerSupabaseClient, type ContactSubmission } from '../lib/supabase.js';
import { sendContactNotificationEmail, sendContactConfirmationEmail } from '../lib/mailer.js';

// Rate limiting: simple in-memory store (for production, use Redis)
const rateLimitStore: Record<string, number[]> = {};
const RATE_LIMIT_WINDOW = 3600000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  
  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = [];
  }

  // Clean old timestamps
  rateLimitStore[ip] = rateLimitStore[ip].filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (rateLimitStore[ip].length >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  rateLimitStore[ip].push(now);
  return false;
}

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const ip = typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket.remoteAddress;
  return ip || 'unknown';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('[API] Contact form request received:', {
    method: req.method,
    path: req.url,
    origin: req.headers.origin,
  });

  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://freeuplance.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[API] Environment variables check:', {
      hasSupabaseUrl: !!process.env.VITE_SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      hasEmailHost: !!process.env.EMAIL_HOST,
      hasTeamEmails: !!process.env.TEAM_EMAIL_1,
    });

    const clientIp = getClientIp(req);

    // Rate limiting
    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.',
        retryAfter: 3600,
      });
    }

    // Honeypot check (anti-spam)
    if (isHoneypotFilled(req.body.honeypot)) {
      // Return success but don't process (silent fail against bots)
      return res.status(200).json({ success: true, message: 'Message received' });
    }

    // Validate request data
    const validation = validateContactForm(req.body);

    if ('valid' in validation && !validation.valid) {
      console.warn('[API] Validation failed:', validation.errors);
      return res.status(400).json({
        error: 'Validation failed',
        details: validation.errors,
      });
    }

    const validData = validation as { name: string; email: string; subject: string; message: string };
    console.log('[API] Validation passed for:', validData.email);

    // Initialize Supabase client
    console.log('[API] Initializing Supabase client...');
    const supabase = getServerSupabaseClient();
    console.log('[API] Supabase client initialized');

    // Store in database
    const submission: ContactSubmission = {
      name: validData.name,
      email: validData.email,
      subject: validData.subject,
      message: validData.message,
      ip_address: clientIp,
      user_agent: req.headers['user-agent'],
    };

    console.log('[API] Inserting submission into Supabase...');
    const { data, error: dbError } = await supabase
      .from('contacts')
      .insert([submission])
      .select('id, created_at');

    if (dbError) {
      console.error('[API] Database insert FAILED:', dbError);
      return res.status(500).json({
        error: 'Failed to process submission. Please try again later.',
      });
    }

    console.log('[API] Database insert SUCCESS, ID:', data?.[0]?.id);

    // Get team member email
    const teamEmails = [
      process.env.TEAM_EMAIL_1,
    ].filter(Boolean) as string[]; // Remove undefined emails

    console.log('[API] Team emails configured:', teamEmails.length);

    // Send notification emails to the team member, if configured
    if (teamEmails.length > 0) {
      console.log('[API] Starting to send notification emails to', teamEmails.length, 'team members');
      const notificationResults = await Promise.all(
        teamEmails.map((teamEmail) =>
          sendContactNotificationEmail({
            name: validData.name,
            email: validData.email,
            subject: validData.subject,
            message: validData.message,
          }, teamEmail)
        )
      );

      const failedNotifications = notificationResults.filter(r => !r.success);
      console.log('[API] Notification emails sent:', teamEmails.length - failedNotifications.length, 'succeeded,', failedNotifications.length, 'failed');
      if (failedNotifications.length > 0) {
        console.warn(`[API] Failed to send ${failedNotifications.length} notification emails`);
        // Continue anyway - message was saved to database
      }
    } else {
      console.warn('[API] No team emails configured');
    }

    // Send confirmation email to user
    console.log('[API] Sending confirmation email to:', validData.email);
    const confirmationResult = await sendContactConfirmationEmail({
      name: validData.name,
      email: validData.email,
      subject: validData.subject,
      message: validData.message,
    });

    if (!confirmationResult.success) {
      console.warn('[API] Confirmation email failed:', confirmationResult.error);
      // Continue anyway - message was saved to database
    } else {
      console.log('[API] Confirmation email sent successfully');
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been received. We\'ll get back to you soon!',
      submissionId: data?.[0]?.id,
    });

  } catch (error) {
    console.error('[API] UNHANDLED ERROR:', error instanceof Error ? {
      message: error.message,
      stack: error.stack,
    } : String(error));
    return res.status(500).json({
      error: 'Internal server error. Please try again later.',
    });
  }
}
