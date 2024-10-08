// notifications/controllers/notificationController.mjs

import Notification from '../models/Notification.mjs';

// controller to create a notification
const createNotification = async (req, res) => {
    try {
        const notification = new Notification({ ...req.body, type: req.body.type || 'general' }); 
        await notification.save();
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// controller to get all notifications
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// controller to update a notification
const updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndUpdate(id, req.body, { new: true });
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// controller to delete a notification
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// controller to push notifications... not active yet 
const pushNotification = async (req, res) => {
    try {
        const notifications = await Notification.find();

        res.status(200).json({ message: 'Notifications pushed successfully', notifications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export default {
    createNotification,
    getNotifications,
    updateNotification,
    deleteNotification,
    pushNotification,
};