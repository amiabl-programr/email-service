import amqplib from "amqplib";

export async function connectRabbitMQ() {
  const connection = await amqplib.connect(process.env.RABBITMQ_URL!);
  const channel = await connection.createChannel();

  const exchange = "notifications.direct";
  await channel.assertExchange(exchange, "direct", { durable: true });

  const queue = "email.queue";
  await channel.assertQueue(queue, { durable: true });
  await channel.bindQueue(queue, exchange, "email");

  console.log("✅ Connected to RabbitMQ and email.queue is ready");
  return channel;
}
