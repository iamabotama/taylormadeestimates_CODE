// Edge Function: send-contact-email
// Sends notification to Melissa + info@, and auto-reply to customer
// Uses Gmail SMTP via nodemailer with app password

import nodemailer from 'npm:nodemailer@6.9.13'

const MELISSA_EMAIL = 'melissa@taylormadeestimates.com'
const INFO_EMAIL = 'info@taylormadeestimates.com'
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? ''

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: MELISSA_EMAIL,
    pass: Deno.env.get('GMAIL_APP_PASSWORD'),
  },
})

function sanitize(str: string): string {
  return String(str ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': 'https://www.taylormadeestimates.com',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 })
  }

  // Verify anon key header so only our site can call this
  const authHeader = req.headers.get('Authorization') ?? ''
  if (!authHeader.includes(SUPABASE_ANON_KEY)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const { name, email, phone, service, message, company } = await req.json()

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields: name, email, message' }), { status: 400 })
    }

    const safeName = sanitize(name)
    const safeEmail = sanitize(email)
    const safePhone = sanitize(phone ?? 'Not provided')
    const safeService = sanitize(service ?? 'Not specified')
    const safeCompany = sanitize(company ?? 'Not provided')
    const safeMessage = sanitize(message).replace(/\n/g, '<br>')

    // ── Email 1: Notification to Melissa + info@ ─────────────────────────
    await transporter.sendMail({
      from: `"Taylor Made Estimates" <${MELISSA_EMAIL}>`,
      to: [MELISSA_EMAIL, INFO_EMAIL],
      replyTo: `"${safeName}" <${email}>`,
      subject: `New Quote Request from ${safeName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a2e1a;">
          <div style="background: #2d5a27; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 20px;">New Quote Request</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">taylormadeestimates.com</p>
          </div>
          <div style="background: #f7faf7; padding: 32px; border: 1px solid #d4e8d0; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #e0ede0; font-weight: bold; width: 140px; color: #4a7a44;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #e0ede0;">${safeName}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #e0ede0; font-weight: bold; color: #4a7a44;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e0ede0;"><a href="mailto:${email}" style="color: #2d5a27;">${safeEmail}</a></td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #e0ede0; font-weight: bold; color: #4a7a44;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #e0ede0;">${safePhone}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #e0ede0; font-weight: bold; color: #4a7a44;">Company</td><td style="padding: 10px 0; border-bottom: 1px solid #e0ede0;">${safeCompany}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #e0ede0; font-weight: bold; color: #4a7a44;">Service</td><td style="padding: 10px 0; border-bottom: 1px solid #e0ede0;">${safeService}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold; color: #4a7a44; vertical-align: top;">Message</td><td style="padding: 10px 0;">${safeMessage}</td></tr>
            </table>
            <div style="margin-top: 24px; padding: 16px; background: #2d5a27; border-radius: 6px; text-align: center;">
              <a href="mailto:${email}" style="color: white; font-weight: bold; text-decoration: none; font-size: 15px;">↩ Reply to ${safeName}</a>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    // ── Email 2: Auto-reply to customer ───────────────────────────────────
    await transporter.sendMail({
      from: `"Taylor Made Estimates" <${MELISSA_EMAIL}>`,
      replyTo: INFO_EMAIL,
      to: email,
      subject: 'We received your request — Taylor Made Estimates',
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a2e1a;">
          <div style="background: #2d5a27; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h2 style="color: white; margin: 0; font-size: 20px;">Taylor Made Estimates</h2>
            <p style="color: rgba(255,255,255,0.8); margin: 4px 0 0; font-size: 14px;">Professional Xactimate Estimating Services</p>
          </div>
          <div style="background: #f7faf7; padding: 32px; border: 1px solid #d4e8d0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 16px; margin-top: 0;">Hi ${safeName},</p>
            <p>Thank you for reaching out to Taylor Made Estimates. We've received your request and will be in touch within <strong>24–48 hours</strong>.</p>
            <p>If you need immediate assistance, you can reach us directly:</p>
            <ul style="line-height: 2;">
              <li>📧 <a href="mailto:info@taylormadeestimates.com" style="color: #2d5a27;">info@taylormadeestimates.com</a></li>
              <li>📞 <a href="tel:+16199554588" style="color: #2d5a27;">(619) 955-4588</a></li>
            </ul>
            <p style="margin-bottom: 0; color: #555;">Best regards,<br><strong>Melissa</strong><br>Taylor Made Estimates</p>
          </div>
          <p style="text-align: center; font-size: 12px; color: #999; margin-top: 16px;">
            © 2025 Taylor Made Estimates · <a href="https://www.taylormadeestimates.com" style="color: #999;">taylormadeestimates.com</a>
          </p>
        </body>
        </html>
      `,
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://www.taylormadeestimates.com',
      },
    })

  } catch (error) {
    console.error('send-contact-email error:', error)
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
