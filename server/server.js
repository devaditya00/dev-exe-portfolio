import http from 'http';
import { ENV } from './src/config/env.js';
import connectDB from './src/config/db.js';
import app from './src/app.js';
import initSocket from './src/config/socket.js';

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);

  initSocket(server);

  server.listen(ENV.port, () => {
    console.log(`Server running on http://localhost:${ENV.port}`);
    console.log(`Environment: ${ENV.nodeEnv}`);
    console.log(`Socket.io ready`);
  });
};

startServer();