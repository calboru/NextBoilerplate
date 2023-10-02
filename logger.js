const { createLogger, format, transports } = require('winston');
const morgan = require('morgan');
require('winston-daily-rotate-file');
const { consoleFormat } = require('winston-console-format');
const dotenv = require('dotenv');
const LoggerSocketTransport = require("./logger-socket-transport");
dotenv.config();

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MMMM-DD HH:mm:ss',
    }),
    format.ms(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: process.env.DAILY_LOG_FILE_NAME },
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.padLevels(),
        consoleFormat({
          showMeta: true,
          metaStrip: ['timestamp', 'service'],
          inspectOptions: {
            depth: Infinity,
            colors: true,
            maxArrayLength: Infinity,
            breakLength: 120,
            compact: Infinity,
          },
        }),
      ),
    }),
    new LoggerSocketTransport(),
    
  ],
});


require('winston-daily-rotate-file');
  logger.configure({
    level: 'error',
    transports: [
      new transports.DailyRotateFile(
      {
        filename: `/var/log/${process.env.DAILY_LOG_FILE_NAME}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
      })
  ]
});


 
const morganMiddleware = morgan(
  (tokens, req, res) => {
    return JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, 'content-length'),
      response_time: Number.parseFloat(tokens['response-time'](req, res)),
    });
  },
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => {
        const data = JSON.parse(message);
        logger.log('info', `incoming-request`, data);
      },
    },
  },
);

module.exports = {
  logger,
  morganMiddleware,
};
