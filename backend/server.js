const express = require('express'); // import express
const mongoose = require('mongoose'); // import mongoose
const dotenv = require('dotenv'); // import dotenv
const errorHandler = require('./middlewares/errorHandler'); // import error handler
const userRoutes = require('./routes/userRoutes'); // import user routes
const applicationRoutes = require('./routes/applicationRoutes'); // import application routes

dotenv.config(); // get environment variables

const app = express(); // create express app
const port = process.env.PORT || 5000; // set port

// Middleware
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { // connect to MongoDB using environment variable MONGO_URI 
    useNewUrlParser: true, // use new parser for mongoose connection to MongoDB
    useUnifiedTopology: true, // use unified topology for mongoose connection to MongoDB 
}).then(() => { // if connected to MongoDB
    console.log('Connected to MongoDB'); // log that we are connected to MongoDB
}).catch(err => console.log(err)); // log any errors connecting to MongoDB

// Routes
app.use('/api/users', userRoutes); // use user routes for /api/users
app.use('/api/applications', applicationRoutes); // use application routes for /api/applications 

// root route
app.get('/', (req, res) => { // get request for the root route
    res.send('server is running'); // send a message that the server is running
});

// error handling
app.use(errorHandler); // use error handler for any errors in the app 

// listen on port
app.listen(port, () => { // listen on the port
    console.log(`Server is running on port: ${port}`); // log that the server is running on the port
});
