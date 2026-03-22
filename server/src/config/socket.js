import { Server } from 'socket.io';
import { ENV } from './env.js';

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
    origin: [
      ENV.clientUrl,
      'https://dev-exe-portfolio.vercel.app',
      'http://localhost:5173',
    ],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  let onlineUsers = 0;

  io.on('connection', (socket) => {
    onlineUsers++;
    console.log(`User connected: ${socket.id} | Online: ${onlineUsers}`);

    io.emit('visitorCount', onlineUsers);

    socket.on('sendMessage', (data) => {
      io.emit('receiveMessage', {
        id: socket.id,
        name: data.name,
        message: data.message,
        time: new Date().toLocaleTimeString(),
      });
    });

    socket.on('disconnect', () => {
      onlineUsers--;
      console.log(`User disconnected: ${socket.id} | Online: ${onlineUsers}`);
      io.emit('visitorCount', onlineUsers);
    });
  });

  return io;
};

export default initSocket;