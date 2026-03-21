import nodemailer from 'nodemailer';
import { ENV } from '../config/env.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ENV.emailUser,
    pass: ENV.emailPass,
  },
});

export const sendContactEmail = async ({ name, email, subject, message }) => {
  const mailOptions = {
    from: `"${name}" <${ENV.emailUser}>`,
    to: ENV.emailTo,
    subject: `Portfolio Contact: ${subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #030712; padding: 30px; border-radius: 8px;">
          <h2 style="color: #00f5ff; font-family: monospace;">
            New Message from Portfolio
          </h2>
          <div style="background: #060d1f; padding: 20px; border-radius: 6px; margin: 20px 0;">
            <p style="color: #94a3b8; margin: 8px 0;">
              <strong style="color: #00f5ff;">Name:</strong> ${name}
            </p>
            <p style="color: #94a3b8; margin: 8px 0;">
              <strong style="color: #00f5ff;">Email:</strong> ${email}
            </p>
            <p style="color: #94a3b8; margin: 8px 0;">
              <strong style="color: #00f5ff;">Subject:</strong> ${subject}
            </p>
            <p style="color: #94a3b8; margin: 8px 0;">
              <strong style="color: #00f5ff;">Message:</strong>
            </p>
            <p style="color: #e2e8f0; background: #0a1628; padding: 15px; border-radius: 4px; border-left: 3px solid #00f5ff;">
              ${message}
            </p>
          </div>
          <p style="color: #64748b; font-size: 12px;">
            Sent from your Dev.exe Portfolio
          </p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}

export const sendAutoReply = async ({ name, email }) => {
  const mailOptions = {
    from: `"Dev.exe" <${ENV.emailUser}>`,
    to: email,
    subject: 'Got your message! — Dev.exe',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #030712; padding: 30px; border-radius: 8px;">
          <h2 style="color: #00f5ff; font-family: monospace;">
            Hey ${name}!
          </h2>
          <p style="color: #94a3b8; line-height: 1.7;">
            Thanks for reaching out! I've received your message and will 
            get back to you within 24 hours.
          </p>
          <p style="color: #94a3b8; line-height: 1.7;">
            In the meantime, feel free to check out my projects on GitHub.
          </p>
          <div style="margin: 30px 0;">
            <a href="https://github.com/yourusername" 
               style="background: #00f5ff; color: #000; padding: 12px 24px; 
                      border-radius: 4px; text-decoration: none; 
                      font-family: monospace; font-weight: bold;">
              View GitHub
            </a>
          </div>
          <p style="color: #64748b; font-size: 12px;">
            — Aditya Mishra | Dev.exe
          </p>
        </div>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}