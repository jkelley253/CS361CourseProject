// cs361courseproject / backend / routes / userRoutes.js

const express = require('express'); 
const userController = require('../controllers/userController'); 
const router = express.Router(); 

// Create a new user
router.post('/', userController.createUser);

// Onboard a new employee (specific to employee data and onboarding process)
router.post('/api/users', userController.onboardEmployee);

// Get all users
router.get('/', userController.getUsers);

// Get a user by ID
router.get('/:id', userController.getUserById);

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router; 
