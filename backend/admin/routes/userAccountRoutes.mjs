
import express from 'express';
import userAccountController from '../controllers/userAccountController.mjs';

const router = express.Router();

router.post('/create-account', userAccountController.createAccount);
router.post('/login', userAccountController.login);

export default router;