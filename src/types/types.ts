export interface Config {
  rabbitmq: RabbitMQConfig;
  templateService: {
    baseUrl: string;
  };
  smtp: SMTPConfig;
  service: {
    port: number | string;
    host: string;
  };
}

export interface EmailMessage {
  template_type: string;
  language?: string;
  to: string;
  data: Record<string, string | number | boolean>;
}

export interface Template {
  subject: string;
  html: string;
  text?: string;
}

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

export interface SMTPConfig {
  host: string;
  port: number | string;
  secure: boolean;
  user: string;
  pass: string;
}

export interface RabbitMQConfig {
  url: string;
  emailQueue: string;
  deadLetterQueue: string;
}