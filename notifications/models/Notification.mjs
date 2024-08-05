// notifications/models/Notification.mjs

import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Notification', NotificationSchema);