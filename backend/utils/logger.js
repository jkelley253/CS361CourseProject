// cs361courseproject / backend / utils / logger.js

const winston = require('winston'); // import winston for logging 

const logger = winston.createLogger({ // create a new logger 
    level: 'info', // set the logging level to info 
    format: winston.format.json(), // set the logging format to json 
    defaultMeta: { service: 'user-service' }, // set the default meta data for the logger 
    transports: [ // set the transports for the logger 
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // log errors to error.log file 
        new winston.transports.File({ filename: 'combined.log' }), // log all messages to combined.log file 
    ],
});

if (process.env.NODE_ENV !== 'production') { // if not in production environment 
    logger.add(new winston.transports.Console({ // add a console transport for logging 
        format: winston.format.simple(), // set the format to simple 
    }));
}

module.exports = logger; // export the logger for use in other files 
