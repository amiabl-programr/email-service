import nodemailer from "nodemailer";
import Handlebars from "handlebars";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT!),
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export async function sendEmail(
  to: string,
  subject: string,
  templateBody: string,
  data: Record<string, any>,
) {
  const compile = Handlebars.compile(templateBody);
  const html = compile(data);

  await transporter.sendMail({
    from: process.env.SMTP_USER!,
    to,
    subject,
    html,
  });

  console.log(`📧 Sent email to ${to} - ${subject}`);
}
