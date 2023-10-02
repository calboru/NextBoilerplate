const express = require('express');
const http = require('http');

const socketIO = require('socket.io');
const dotenv = require('dotenv');
const { logger, morganMiddleware } = require('./logger');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();

// our localhost port
const port = process.env.SOCKET_SERVER_PORT || 8082;

const app = express();

app.use(morganMiddleware);

app.get("/socket", (_, res) => {
  return res.send(`Server is up and running on ${port} `);
});

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// This is what the socket.io syntax is like, we will work this later
io.on('connection', (socket) => {
  socket.on(process.env.APP_NAME, (data) => {
    socket.broadcast.emit(process.env.APP_NAME, data);
  });
  socket.on('disconnect', () => {});
});

const startSocketServer = () => {
  try {
    server.listen(port, () =>
      logger.log('info', `Socket Server Started on port ${port}`),
    );
  } catch (error) {
    logger.log('error', 'Unable to create socket server', error);
  }
};

module.exports = {
  startSocketServer,
};
