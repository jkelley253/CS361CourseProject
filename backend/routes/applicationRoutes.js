// cs361courseproject / backend / routes / applicationRoutes.js

const express = require('express'); 
const applicationController = require('../controllers/applicationController'); 
const router = express.Router(); 

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

module.exports = router; 