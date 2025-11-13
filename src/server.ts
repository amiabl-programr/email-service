import { buildApp } from "./app.ts";

const start = async () => {
  const app = await buildApp();

  try {
    const port = process.env.PORT || 3003;
    await app.listen({ port: Number(port), host: "0.0.0.0" });
    console.log(`Email Service running on port ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start().catch((err) => {
  console.error("Fatal error starting server:", err);
  process.exit(1);
});
