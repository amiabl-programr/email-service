// src/app.ts
import Fastify from 'fastify';
import dotenv from 'dotenv';
import { connectRabbitMQ } from './plugins/rabbitmq.ts';
import { startEmailConsumer } from './consumers/email.consumer.ts';
import { loggerOptions } from './config/logger_options.ts';
import type { FastifyInstance } from 'fastify';

dotenv.config();

export const buildApp = async (): Promise<FastifyInstance> => {
  const app = Fastify({ logger: loggerOptions });

  // Health check route
  app.get('/health', async () => {
    return { status: 'ok', service: 'email-service', uptime: process.uptime() };
  });

  try {
    // Initialize RabbitMQ and start consuming
    await connectRabbitMQ();
    startEmailConsumer();
  } catch (error) {
    app.log.error(error, 'Failed to initialize RabbitMQ:');
    // Optionally: throw error to prevent app startup, or continue without RabbitMQ
    // throw error;
  }

  return app;
};


