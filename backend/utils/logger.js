// cs361courseproject / backend / utils / logger.js

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format; 

// Custom log format
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create logger
const logger = createLogger({
    level: 'info', 
    format: combine(
        timestamp(),
        logFormat 
    ),
    transports: [
        new transports.File({ filename: 'error.log', level: 'error' }), 
        new transports.File({ filename: 'combined.log' }) 
    ]
});


if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple()
    }));
}

module.exports = logger;
