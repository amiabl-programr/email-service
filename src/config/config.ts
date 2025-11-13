import type { SMTPConfig, RabbitMQConfig } from "../types/types.ts";
import type { Config } from "../types/types.ts";
import dotenv from "dotenv";
dotenv.config();

export const config: Config = {
  rabbitmq: {
    url: process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672",
    emailQueue: "email_queue",
    deadLetterQueue: "email_dlq",
  },
  templateService: {
    baseUrl: process.env.TEMPLATE_SERVICE_URL || "http://localhost:3000",
  },
  smtp: {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
  service: {
    port: process.env.PORT || 3002,
    host: "0.0.0.0",
  },
};
