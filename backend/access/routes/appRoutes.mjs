//backend/routes/appRoutes.mjs

import express from 'express';
import AppController from '../controllers/appController.mjs';

const router = express.Router();

// Route to get users by app name
router.get('/:appName/users', AppController.getUsersByApp);

// Route to remove users from app
router.put('/:appName/remove-users', AppController.removeUsersFromApp);

export default router;
