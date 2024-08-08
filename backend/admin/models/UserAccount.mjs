// admin/models/UserAccount.mjs

import mongoose from 'mongoose';

// DB schema for creating a admin 
const UserAccountSchema = new mongoose.Schema ({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    createdAt: { type: Date, default: Date.now }
    // updatedAt: { type: Date, default: Date.now }, 

});

export default mongoose.model('UserAccount', UserAccountSchema);