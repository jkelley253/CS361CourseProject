// cs361courseproject / backend / middlewares / errorHandler.js

const logger = require('../utils/logger'); //import logger from utils folder 

const errorHandler = (err, req, res, next) => { //error handler middleware function 
    logger.error(err.stack); //log the error stack to the console 
    res.status(err.status || 500).json({ //send a response with the error status or 500
        success: false, //send a success flag as false 
        message: err.message || 'Server Error', //send the error message or 'Server Error' 
    });
};

module.exports = errorHandler; //export the error handler middleware function 

