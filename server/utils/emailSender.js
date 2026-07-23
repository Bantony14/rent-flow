import nodemailer from "nodemailer";
import { config } from "dotenv";
import otpTemplate from "./optTemplate.js";
config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async ({ email, subject, message, pdfBuffer }) => {
  try {
    console.log("Before verify");

    await transporter.verify();

    console.log("SMTP Connected");
  } catch (err) {
    console.error("VERIFY ERROR:");
    console.error(err);
  }

  await transporter.sendMail({
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
};

export default sendEmail;
