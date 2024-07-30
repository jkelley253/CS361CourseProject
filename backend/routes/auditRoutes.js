// cs361courseproject / backend / routes / auditRoutes.js

const express = require('express'); 
const auditController = require('../controllers/auditController');  
const router = express.Router(); 

// Log a new audit action
router.post('/', auditController.createAudit);

// Get all audits
router.get('/', auditController.getAudits);

// Search for inactive users based on date range
router.get('/inactive', auditController.getInactiveUsers);

module.exports = router; 