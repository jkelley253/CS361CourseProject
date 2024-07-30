// cs361courseproject / backend / utils / logger.js

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format; 

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create logger
const logger = createLogger({
    level: 'info', // Log level
    format: combine(
        timestamp(),
        logFormat // Use custom log format
    ),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }), // Log only errors to error.log
        new transports.File({ filename: 'combined.log' }) // Log all messages to combined.log
    ]
});

// If we're not in production, log to the `console` with the format:
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple()
    }));
}

module.exports = logger;
