import nodemailer from 'nodemailer';
import Setting from '../models/Setting.js';

/**
 * Get SMTP settings from database
 */
async function getEmailConfig() {
  const settings = await Setting.find({ key: { $in: ['contact.smtpHost', 'contact.smtpPort', 'contact.smtpUser', 'contact.smtpPass'] } });
  
  const config = {};
  settings.forEach(setting => {
    config[setting.key] = setting.value;
  });

  return config;
}

/**
 * Send an email
 * @param {Object} options - Email options
 * @param {String} options.to - Recipient email
 * @param {String} options.subject - Email subject
 * @param {String} options.text - Plaintext body
 * @param {String} options.html - HTML body
 */
export async function sendEmail({ to, subject, text, html }) {
  const config = await getEmailConfig();

  const host = config['contact.smtpHost'];
  const port = parseInt(config['contact.smtpPort'], 10) || 587;
  const user = config['contact.smtpUser'];
  const pass = config['contact.smtpPass'];

  if (!host || !user || !pass) {
    throw new Error('SMTP configuration is missing in Admin Settings. Please configure it in the Mail Settings area.');
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: `"Mazlum Ummah" <${user}>`,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}
