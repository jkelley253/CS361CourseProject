// cs361courseproject / backend / routes / orgchartRoutes.js 

const express = require('express');  
const orgChartController = require('../controllers/orgchartController'); 
const router = express.Router(); 

// Create a new org chart entry
router.post('/', orgChartController.createOrgChart);

// Get all org chart entries
router.get('/', orgChartController.getOrgCharts);

// Get an org chart entry by ID
router.get('/:id', orgChartController.getOrgChartById);

// Update an org chart entry
router.put('/:id', orgChartController.updateOrgChart);

// Delete an org chart entry
router.delete('/:id', orgChartController.deleteOrgChart);

module.exports = router; 