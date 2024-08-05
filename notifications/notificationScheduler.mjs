// notifications/notificationsScheduler.mjs

import cron from 'node-cron';
import Notification from './models/Notification.mjs';

// Function to create a new notification
const createNotification = async () => {
    try {
        // Delete old notifications of type 'daily-reminder'
        await Notification.deleteMany({ type: 'daily-reminder' });

        // Create a new notification of type 'daily-reminder'
        const newNotification = new Notification({
            title: 'Daily Reminder',
            message: 'This is your daily notification.',
            type: 'daily-reminder'
        });
        await newNotification.save();
        console.log('New notification created');
    } catch (error) {
        console.error('Error creating notification:', error);
    }
};

// Schedule the task to run every day at 8 AM
cron.schedule('0 8 * * *', () => {
    console.log('Running daily notification job');
    createNotification();
});

export default createNotification;
