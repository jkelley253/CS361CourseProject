// admin/routes/userAccountRoutes.mjs

import express from 'express';
import userAccountController from '../controllers/userAccountController.mjs';

const router = express.Router();

// route to create a new admin account
router.post('/create-account', userAccountController.createAccount);

// route to login an admin
router.post('/login', userAccountController.login);

export default router;