// cs361courseproject / backend / routes / userRoutes.js

const express = require('express'); //import express
const userController = require('../controllers/userController'); //import the user model
const router = express.Router(); //create a new router

// Create a new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getUsers);

// Get a user by ID
router.get('/:id', userController.getUserById);

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router; //export the router
