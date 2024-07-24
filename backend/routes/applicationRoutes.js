// cs361courseproject / backend / routes / applicationRoutes.js

const express = require('express'); //import express package to create routes
const applicationController = require('../controllers/applicationController'); //import application model to use in routes
const router = express.Router(); //create router object to define routes 

// Create a new application
router.post('/', applicationController.createApplication);

// Get all applications
router.get('/', applicationController.getApplications);

// Get an application by ID
router.get('/:id', applicationController.getApplicationById);

// Update an application
router.put('/:id', applicationController.updateApplication);

// Delete an application
router.delete('/:id', applicationController.deleteApplication);

module.exports = router; //export the router object to use in the server file 