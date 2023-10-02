const Transport = require('winston-transport');
const uniqid = require('uniqid');
const dotenv = require('dotenv');
const socket = require('./libs/socket-client');
/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();
//
// Inherit from `winston-transport` so you can take advantage
// of the base functionality and `.exceptions.handle()`.
//
module.exports = class LoggerSocketTransport extends Transport {
  log(info, callback) {
    setImmediate(() => {
      this.emit('logged', info);
    });

    socket.emit(process.env.APP_NAME, {
      id: uniqid(),
      ...info,
    });

    // Perform the writing to the remote service
    callback();
  }
};
