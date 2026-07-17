import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import Setting from '../models/Setting.js';
import { sendEmail } from '../utils/email.js';

/**
 * @desc    Submit contact form
 * @route   POST /api/v1/public/contact
 * @access  Public
 */
export const submitContactForm = asyncHandler(async (req, res, next) => {
  const { name, phoneOrEmail, topic, message } = req.body;

  if (!name || !phoneOrEmail || !topic || !message) {
    return next(new AppError('Please provide all required fields (name, phone/email, topic, message)', 400));
  }

  // Fetch admin email from settings
  const adminEmailSetting = await Setting.findOne({ key: 'contact.adminEmail' });
  const adminEmail = adminEmailSetting?.value;

  if (!adminEmail) {
    return next(new AppError('Admin email is not configured to receive messages', 500));
  }

  // Prepare email text
  const emailSubject = `New Contact Form Submission: ${topic}`;
  const emailText = `
You have received a new message from the Mazlum Ummah Contact Form.

Name: ${name}
Phone/Email: ${phoneOrEmail}
Topic: ${topic}
Message:
${message}
`;

  // Send to Admin
  await sendEmail({
    to: adminEmail,
    subject: emailSubject,
    text: emailText
  });

  // Check if phoneOrEmail is a valid email address (simple check)
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phoneOrEmail);

  if (isEmail) {
    const userCopyText = `
Hello ${name},

Thank you for reaching out to us. We have received your message and will get back to you shortly.

Here is a copy of your submission:
Topic: ${topic}
Message:
${message}

Best Regards,
Mazlum Ummah Team
`;

    // Try sending copy to user, but don't fail the request if it fails
    try {
      await sendEmail({
        to: phoneOrEmail,
        subject: `Copy of your submission: ${topic}`,
        text: userCopyText
      });
    } catch (err) {
      console.error('Failed to send copy to user:', err);
    }
  }

  res.status(200).json({
    status: 'success',
    message: 'Your message has been sent successfully.'
  });
});
