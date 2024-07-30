// cs361courseproject / backend / server.js

const config = require('config'); 
const express = require('express'); 
const mongoose = require('mongoose'); 
const dotenv = require('dotenv'); 
const errorHandler = require('./middlewares/errorHandler'); 
const userRoutes = require('./routes/userRoutes'); 
const applicationRoutes = require('./routes/applicationRoutes'); 
const auditRoutes = require('./routes/auditRoutes'); 
const orgChartRoutes = require('./routes/orgchartRoutes'); 


dotenv.config(); 

const app = express(); 
const port = process.env.PORT || config.get('port') || 5050; 

// Middleware
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(config.get('mongoURI')) 
    .then(() => console.log('Connected to MongoDB')) 
    .catch(err => console.log(err)); 

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/applications', applicationRoutes);  
app.use('/api/audits', auditRoutes); 
app.use('/api/orgchart', orgChartRoutes); 

// root route
app.get('/', (req, res) => { 
    res.send('server is running'); 
});

// error handling
app.use(errorHandler); 

// listen on port
app.listen(port, () => { 
    console.log(`Server is running on port: ${port}`); 
});
