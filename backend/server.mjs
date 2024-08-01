// backend/server.mjs
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Routes
import userRoutes from './routes/userRoutes.mjs';
import appRoutes from './routes/appRoutes.mjs';
import employeeRoutes from './routes/employeeRoutes.mjs';


app.use('/api/users', userRoutes);
app.use('/api/apps', appRoutes);
app.use('/api/employees', employeeRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
