// cs361courseproject / backend / server.js

const express = require('express'); // import express
const mongoose = require('mongoose'); // import mongoose
const dotenv = require('dotenv'); // import dotenv
const errorHandler = require('./middlewares/errorHandler'); // import error handler

dotenv.config(); // get environment variables

const app = express(); // create express app
const port = process.env.PORT || 5000; // set port

// Middleware
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { // connect to MongoDB using environment variable MONGO_URI 
    useNewParser: true, // use new parser for mongoose connection to MongoDB
    useUnifiedTopology: true, // use unified topology for mongoose connection to MongoDB 
}).then(() => {
    console.log('Connected to MongoDB'); // log that we are connected to MongoDB
}).catch(err => console.log(err)); // log any errors connecting to MongoDB


// Routes


// error handling
app.use(errorHandler); // use error handler for any errors in the app 

// listen on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`); // log that the server is running on the port
});