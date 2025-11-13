import { connectRabbitMQ } from "../plugins/rabbitmq.ts";
import { fetch_template } from "../services/template.service.ts";
import { sendEmail } from "../services/email.service.ts";

export async function startEmailConsumer() {
  const channel = await connectRabbitMQ();
  const queue = "email.queue";

  await channel.consume(queue, async (msg) => {
    if (!msg) return;

    try {
      const payload = JSON.parse(msg.content.toString());
      console.log("📨 Received email message:", payload);

      const { template_type, language, to, data } = payload;

      // 1. Fetch template
      const template = await fetch_template(template_type, language);

      // 2. Render and send
      await sendEmail(to, template.subject, template.body, data);

      // 3. Acknowledge message
      channel.ack(msg);
    } catch (err) {
      console.error("❌ Failed to process message:", err);
      channel.nack(msg, false, false); // send to dead-letter queue
    }
  });

  console.log("🚀 Email consumer is running...");
}
