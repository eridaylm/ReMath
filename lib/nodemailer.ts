import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (to: string, code: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Quantiva - Kode Verifikasi Anda",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Verifikasi Akun Quantiva</h2>
        <p>Gunakan kode 6 digit berikut untuk memverifikasi akun Anda:</p>
        <div style="font-size: 24px; font-weight: bold; margin: 20px 0; padding: 10px; background-color: #f4f4f4; display: inline-block; border-radius: 8px;">
          ${code}
        </div>
        <p>Kode ini akan kedaluwarsa dalam 15 menit.</p>
        <p>Jika Anda tidak mendaftar di Quantiva, abaikan email ini.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
