// notifications/routes/notificationRoutes.mjs:

import express from 'express';
import {
    createNotification,
    getNotifications,
    updateNotification,
    deleteNotification,
    pushNotification,
} from '../controllers/notificationController.mjs';

const router = express.Router();

router.post('/', createNotification);
router.get('/', getNotifications);
router.put('/:id', updateNotification);
router.delete('/:id', deleteNotification);
router.post('/push', pushNotification);

export default router;
