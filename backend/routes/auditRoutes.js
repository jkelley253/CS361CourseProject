// cs361courseproject / backend / routes / auditRoutes.js

const express = require('express'); 
const auditController = require('../controllers/auditController');  
const router = express.Router(); 

// Log a new audit action
router.post('/', auditController.createAudit);

// Get all audits
router.get('/', auditController.getAudits);

// Get inactive users based on audit data (requires query params)
router.get('/inactive', auditController.getInactiveUsers);

// Update an audit (if modification is allowed)
router.put('/:id', auditController.updateAudit);

// Delete an audit
router.delete('/:id', auditController.deleteAudit);

module.exports = router;