import { createLogger, format, transports } from 'winston';
import { MongoDB } from 'winston-mongodb';

const loggerFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.splat(),
  format.json()
);

const info = createLogger({
  level: 'info',
  format: loggerFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'activity.log' }),
    new MongoDB({
      level: 'info',
      db: 'mongodb://127.0.0.1:27017/pharmacist',
      collection: 'users',
      options: { useNewUrlParser: true, useUnifiedTopology: true }
    })
  ]
});

const error = createLogger({
  level: 'error',
  format: loggerFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log' }),
    new MongoDB({
      level: 'error',
      db: 'mongodb://127.0.0.1:27017/pharmacist',
      collection: 'errors',
      options: { useNewUrlParser: true, useUnifiedTopology: true }
    })
  ]
});

export { info, error };
