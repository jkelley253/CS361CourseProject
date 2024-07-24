// cs361courseproject / backend / routes / orgchartRoutes.js 

const express = require('express'); //import express package to use express methods for routing 
const orgChartController = require('../controllers/orgchartController'); //import orgChart model to use its methods for routing
const router = express.Router(); //create router object to handle routing 

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

module.exports = router; //export router object to be used in other files 