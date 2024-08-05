// notifications/server.mjs

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import './notificationScheduler.mjs'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 5080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.log(err);
        process.exit(1); 
    }
};

// Routes
import notificationRoutes from './routes/notificationRoutes.mjs';
app.use('/api/notifications', notificationRoutes);

// Start Server
const startServer = async () => {
    await connectDB(); 
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

startServer();
