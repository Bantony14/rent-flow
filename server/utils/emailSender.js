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


const sendEmail = async ({ email, subject, message }) => {
  await transporter.sendMail({
    from: `Rent Management App <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject,
    html: message
  });
};

export default sendEmail;