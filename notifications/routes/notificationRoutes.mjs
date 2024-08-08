// notifications/routes/notificationRoutes.mjs:

import express from 'express';
import notificationController from '../controllers/notificationController.mjs';

const router = express.Router();

// route to create a notification
router.post('/', notificationController.createNotification);

// route to get all notifications
router.get('/', notificationController.getNotifications);

// route to update a notification
router.put('/:id', notificationController.updateNotification);

// route to delete a notification
router.delete('/:id', notificationController.deleteNotification);

// route to push notifications
router.post('/push', notificationController.pushNotification);

export default router;
