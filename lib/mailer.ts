import nodemailer from 'nodemailer';

export interface ContactEmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Create nodemailer transporter
const createTransporter = () => {
  const emailHost = process.env.EMAIL_HOST;
  const emailPort = process.env.EMAIL_PORT;
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  console.log('[Nodemailer] Checking email config:', {
    hasHost: !!emailHost,
    hasPort: !!emailPort,
    hasUser: !!emailUser,
    hasPass: !!emailPass,
  });

  if (!emailHost || !emailPort || !emailUser || !emailPass) {
    console.error('[Nodemailer] Email configuration is INCOMPLETE. Missing:', {
      host: !emailHost,
      port: !emailPort,
      user: !emailUser,
      pass: !emailPass,
    });
    return null;
  }

  const portNum = parseInt(emailPort);
  const isSecure = portNum === 465;
  
  console.log('[Nodemailer] Creating transporter:', {
    host: emailHost,
    port: portNum,
    secure: isSecure,
    user: emailUser,
  });

  return nodemailer.createTransport({
    host: emailHost,
    port: portNum,
    secure: isSecure, // FIXED: true for 465, false for 587
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
};

export async function sendContactNotificationEmail(data: ContactEmailData, teamEmail?: string) {
  console.log('[sendContactNotificationEmail] Starting for:', teamEmail);
  const transporter = createTransporter();
  if (!transporter) {
    console.error('[sendContactNotificationEmail] Transporter is NULL - email config missing');
    return { success: false, error: 'Email service not configured' };
  }
  console.log('[sendContactNotificationEmail] Transporter created successfully');

  const recipientEmail = teamEmail || process.env.EMAIL_USER;
  const emailFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  if (!recipientEmail) {
    console.error('No recipient email configured');
    return { success: false, error: 'No recipient email configured' };
  }

  if (!emailFrom) {
    console.error('No sender email configured');
    return { success: false, error: 'No sender email configured' };
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #ff8c00; border-bottom: 2px solid #ff8c00; padding-bottom: 10px;">
        New Contact Form Submission
      </h2>
      
      <div style="margin: 20px 0; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
        <p style="margin: 10px 0;"><strong>Name:</strong> ${escapeHtmlNode(data.name)}</p>
        <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtmlNode(data.email)}">${escapeHtmlNode(data.email)}</a></p>
        <p style="margin: 10px 0;"><strong>Subject:</strong> ${escapeHtmlNode(data.subject)}</p>
        <p style="margin: 10px 0;"><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      </div>

      <h3 style="color: #0a0a0a; margin-top: 20px;">Message:</h3>
      <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #ff8c00; border-radius: 3px;">
        <p style="white-space: pre-wrap; word-wrap: break-word; margin: 0;">
          ${escapeHtmlNode(data.message)}
        </p>
      </div>

      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
      
      <p style="color: #666; font-size: 12px; margin-top: 20px;">
        Reply directly to the sender's email to get back to the client.
      </p>
    </div>
  `;

  try {
    console.log('[sendContactNotificationEmail] Sending to:', recipientEmail, 'from:', emailFrom);
    const result = await transporter.sendMail({
      from: emailFrom,
      to: recipientEmail,
      replyTo: data.email,
      subject: `New Contact: ${data.subject}`,
      html: htmlContent,
    });

    console.log('[sendContactNotificationEmail] SUCCESS to', recipientEmail, '- Message ID:', result.messageId);
    return { success: true, result };
  } catch (error) {
    console.error('[sendContactNotificationEmail] FAILED to', recipientEmail, '- Error:', error instanceof Error ? error.message : String(error));
    return { success: false, error };
  }
}

export async function sendContactConfirmationEmail(data: ContactEmailData) {
  console.log('[sendContactConfirmationEmail] Starting for:', data.email);
  const transporter = createTransporter();
  if (!transporter) {
    console.error('[sendContactConfirmationEmail] Transporter is NULL - email config missing');
    return { success: false, error: 'Email service not configured' };
  }
  console.log('[sendContactConfirmationEmail] Transporter created successfully');

  const emailFrom = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  if (!emailFrom) {
    console.error('No sender email configured');
    return { success: false, error: 'No sender email configured' };
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #ff8c00; text-align: center;">freeUPlance</h2>
      
      <h3 style="color: #0a0a0a;">Hi ${escapeHtmlNode(data.name.split(' ')[0])},</h3>
      
      <p style="line-height: 1.6; color: #333;">
        Thank you for reaching out to freeUPlance! We've received your message and appreciate your interest in our AI/ML services.
      </p>

      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Subject:</strong> ${escapeHtmlNode(data.subject)}</p>
        <p style="margin: 5px 0;"><strong>Received:</strong> ${new Date().toLocaleString()}</p>
      </div>

      <p style="line-height: 1.6; color: #333;">
        Our team will review your message and get back to you within 24 hours. In the meantime, feel free to explore our services at <a href="https://freeuplance.com" style="color: #ff8c00; text-decoration: none;">freeuplance.com</a>.
      </p>

      <p style="line-height: 1.6; color: #333;">
        Best regards,<br/>
        The freeUPlance Team
      </p>

      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
      
      <p style="color: #999; font-size: 12px; text-align: center;">
        This is an automated response. Please do not reply to this email.
      </p>
    </div>
  `;

  try {
    console.log('[sendContactConfirmationEmail] Sending to:', data.email, 'from:', emailFrom);
    const result = await transporter.sendMail({
      from: emailFrom,
      to: data.email,
      subject: 'We received your message - freeUPlance',
      html: htmlContent,
    });

    console.log('[sendContactConfirmationEmail] SUCCESS - Message ID:', result.messageId);
    return { success: true, result };
  } catch (error) {
    console.error('[sendContactConfirmationEmail] FAILED - Error:', error instanceof Error ? error.message : String(error));
    return { success: false, error };
  }
}

// HTML escaping for Node.js environment
export function escapeHtmlNode(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapeMap[char] || char);
}
