import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

console.log("===== SMTP CONFIG =====");
console.log({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  email: process.env.SMTP_EMAIL,
  hasPassword: !!process.env.SMTP_PASSWORD,
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // 587 ke liye
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

(async () => {
  try {
    console.log("Before verify...");
    await transporter.verify();
    console.log("✅ SMTP Connected");
  } catch (err) {
    console.error("❌ VERIFY ERROR");
    console.error(err);
    console.error(err.code);
    console.error(err.response);
    console.error(err.responseCode);
  }
})();

const sendEmail = async ({ email, subject, message, pdfBuffer }) => {
  try {
    console.log("===== SEND EMAIL START =====");
    console.log("To:", email);
    console.log("Subject:", subject);

    const info = await transporter.sendMail({
      from: `Rent Management App <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject,
      html: message,
      attachments: pdfBuffer
        ? [
            {
              filename: "receipt.pdf",
              content: pdfBuffer,
            },
          ]
        : [],
    });

    console.log("✅ EMAIL SENT");
    console.log(info);
    return info;
  } catch (err) {
    console.error("❌ SEND EMAIL ERROR");
    console.error(err);
    console.error(err.code);
    console.error(err.response);
    console.error(err.responseCode);
    throw err;
  }
};

export default sendEmail;
