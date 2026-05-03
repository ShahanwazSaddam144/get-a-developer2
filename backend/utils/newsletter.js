const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendNewsletterEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
      family: 4,
    });

    const mailOptions = {
      from: `"Butt Networks" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Our Newsletter 🚀",
      html: `
        <div style="background:#0b0d13;color:#e5e7eb;font-family:Arial, sans-serif;padding:24px;">
          <div style="max-width:600px;margin:0 auto;background:#111827;border:1px solid #1f2937;border-radius:20px;padding:28px;box-shadow:0 18px 45px rgba(0,0,0,0.45);">
            <div style="margin-bottom:24px;">
              <h1 style="margin:0;font-size:26px;color:#ffffff;">Welcome to Butt Networks</h1>
              <p style="margin:8px 0 0;color:#9ca3af;font-size:15px;">You're now subscribed to weekly updates for developers, projects, and career growth.</p>
            </div>

            <div style="background:#111827;border:1px solid #374151;border-radius:16px;padding:20px;margin-bottom:24px;">
              <p style="margin:0;color:#d1d5db;font-size:15px;line-height:1.75;">Expect curated developer stories, portfolio inspiration, and gated opportunities delivered with a clean, modern experience.</p>
            </div>

            <a href="https://get-a-developer.buttnetworks.com" style="display:inline-flex;align-items:center;justify-content:center;padding:12px 22px;background:linear-gradient(90deg,#1e90ff,#2563eb);color:#ffffff;text-decoration:none;border-radius:12px;font-weight:700;">Visit Butt Networks</a>

            <div style="margin-top:32px;padding:20px;background:#0f172a;border:1px solid #1e293b;border-radius:16px;">
              <p style="margin:0 0 14px;color:#94a3b8;font-size:13px;">Quick links:</p>
              <div style="display:flex;flex-wrap:wrap;gap:10px;">
                <a href="https://get-a-developer.buttnetworks.com" style="color:#93c5fd;text-decoration:none;font-size:13px;">Home</a>
                <a href="/developer" style="color:https://get-a-developer.buttnetworks.com/Auth#93c5fd;text-decoration:none;font-size:13px;">Developers</a>
                <a href="https://buttnetworks.com/auth" style="color:#93c5fd;text-decoration:none;font-size:13px;">Sign In</a>
                <a href="https://buttnetworks.com/support" style="color:#93c5fd;text-decoration:none;font-size:13px;">Support</a>
              </div>
            </div>

            <p style="margin:24px 0 8px;color:#94a3b8;font-size:13px;">No spam. Only value. Delivered to your inbox every week.</p>
            <p style="margin:0;color:#6b7280;font-size:12px;">If you didn't sign up for this newsletter, simply ignore this message.</p>

            <div style="margin-top:28px;border-top:1px solid #1f2937;padding-top:18px;color:#6b7280;font-size:12px;line-height:1.6;">
              <p style="margin:0;">Butt Networks • Crafted for developers and teams.</p>
              <p style="margin:4px 0 0;">Need help? Reply to this email or visit our support page.</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email Error:", error);
  }
};

module.exports = sendNewsletterEmail;
