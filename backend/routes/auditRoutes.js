// cs361courseproject / backend / routes / auditRoutes.js

const express = require('express'); //import express package to create router for audit collection in database
const auditController = require('../controllers/auditController'); //import audit schema to create router for audit collection in database  
const router = express.Router(); //create router for audit collection in database

// Log a new audit action
router.post('/', auditController.createAudit);

// Get all audits
router.get('/', auditController.getAudits);

// Search for inactive users based on date range
router.get('/inactive', auditController.getInactiveUsers);

module.exports = router; //export router for audit collection in database 