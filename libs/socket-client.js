const dotenv = require('dotenv');
const io = require('socket.io-client');
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();

const socketClient = io(`http://localhost:${process.env.SOCKET_SERVER_PORT}`);

module.exports = socketClient;
