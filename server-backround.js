const dotenv = require('dotenv');
const cron = require('node-cron');
const { logger } = require('./logger');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();

let CURRENT_SCHEDULE = '';

if (cron.validate(process.env.SCHEDULE)) {
  logger.log(
    'info',
    `Background service is running on a schedule ${process.env.SCHEDULE}`,
  );
  CURRENT_SCHEDULE = process.env.SCHEDULE;
} else {
  logger.log(
    'warn',
    `SCHEDULE settings in the .env is not valid. Service will run every 10 seconds as default`,
  );

  CURRENT_SCHEDULE = '*/10 * * * * *';
}
let runDate = new Date();

const task = cron.schedule(
  CURRENT_SCHEDULE,
  async () => {
    logger.log(
      'info',
      `Background task is running. Last run took: ${Math.round(
        (new Date() - runDate) / 1000,
      )} seconds`,
    );

    runDate = new Date();
  },
  { scheduled: false, timezone: 'America/New_York' },
);

module.exports = {
  task,
};
