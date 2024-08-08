// admin/server.mjs

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5072;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Routes
import userAccountRoutes from './routes/userAccountRoutes.mjs';

// Use Routes
app.use('/api/admin', userAccountRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Admin server running on port ${port}`);
});