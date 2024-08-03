// backend/routes/userRoutes.mjs
import express from 'express';
import UserController from '../controllers/userController.mjs';

const router = express.Router();

// Route to create a new user
router.post('/', UserController.createUser);

// Route to get user by email
router.get('/:email', UserController.getUserByEmail);

// Route to get all active employees
router.get('/orgchart/active', UserController.getActiveEmployees);

// Route to update a user by email
router.put('/:email', UserController.updateUserByEmail);

// Route to offboard an employee (delete user)
router.delete('/offboard/:email', UserController.offboardEmployee);




export default router;
