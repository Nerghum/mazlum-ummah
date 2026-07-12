import app from './app.js';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { startScheduledPublisher } from './jobs/scheduledPublisher.js';

await connectDatabase();

const server = app.listen(env.port, () => {
  console.log(`API running on port ${env.port}`);
  startScheduledPublisher();
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
