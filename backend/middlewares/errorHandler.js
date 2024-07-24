// cs361courseproject / backend / middlewares / errorHandler.js

const errorHandler = (err, req, res, next) => { //error handler middleware function with 4 parameters (err, req, res, next) 
    console.error(err.stack); //log the error stack to the console 
    res.status(err.status || 500).json({ //set the status of the response to the error status or 500 and send a JSON response with an error message 
        success: false, //set success to false 
        message: err.message || 'Server Error', //set the message to the error message or 'Server Error' 
    });
};

module.exports = errorHandler; //export the error handler middleware function 
