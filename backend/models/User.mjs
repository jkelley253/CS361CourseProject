//backend/models/User.mjs

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    manager: { type: String},
    team: { type: String},
    title: { type: String, required: true },
    status: { type: String, default: 'active' },
    groups: { type: [String], enum: ['dev', 'product', 'SRE', 'marketing'], default: [] },
    apps: { type: [String], enum: ['Slack', 'Jira', '1password', 'GitHub'], default: [] },
});

export default mongoose.model('User', UserSchema);
