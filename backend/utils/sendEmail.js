const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendVerificationEmail = async (to, name, verifyUrl) => {
  const mailOptions = {
    from: `"Get-a-Developer" <${EMAIL_USER}>`,
    to,
    subject: "Verify Your Get-a-Developer Account",
    html: `
      <div style="background:#0e0f13;color:#e5e7eb;font-family:Arial, sans-serif;padding:30px;">
        <div style="max-width:600px;margin:0 auto;background:#1f2430;border:1px solid #2d3342;border-radius:16px;padding:28px;box-shadow:0 12px 30px rgba(0,0,0,0.35);">
          <h1 style="margin:0 0 12px;font-size:24px;color:#ffffff;">Verify Your Account</h1>
          <p style="color:#cfd6ee;font-size:16px;margin:0 0 16px;">Hi ${name},</p>
          <p style="color:#cfd6ee;font-size:16px;margin:0 0 24px;">Thank you for signing up with Get-a-Developer. Click the button below to verify your email address and activate your account.</p>
          <a href="${verifyUrl}" style="display:inline-block;width:100%;max-width:260px;text-align:center;padding:12px 18px;background:linear-gradient(90deg,#1e90ff,#3ea6ff);color:#fff;text-decoration:none;border-radius:8px;font-weight:700;">Verify My Account</a>
          <p style="color:#97a5ca;font-size:14px;margin:20px 0 8px;">If the button doesn’t work, copy and paste this link into your browser:</p>
          <p style="font-size:13px;word-break:break-all;color:#a8b7da;margin:0 0 20px;">${verifyUrl}</p>
          <p style="color:#97a5ca;font-size:12px;margin:0;">This link is valid for 24 hours.</p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
