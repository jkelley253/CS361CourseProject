// cs361courseproject / backend / routes / orgchartRoutes.js 

const express = require('express'); //import express package to use express methods for routing 
const orgChart = require('../models/orgChart'); //import orgChart model to use its methods for routing
const router = express.Router(); //create router object to handle routing 

// Create a new org chart entry
router.post('/', async (req, res) => { //create a new org chart entry in MongoDB database 
    try { //try block to catch errors 
        const newOrgChart = new OrgChart(req.body); //create a new org chart entry using the request body 
        const savedOrgChart = await newOrgChart.save(); //save the new org chart entry in the database 
        res.status(201).json(savedOrgChart); //send a response with the saved org chart entry 
    } catch (err) { //catch block to handle errors 
        res.status(400).json({ error: err.message }); //send an error response with the error message 
    }
});

// Get all org chart entries
router.get('/', async (req, res) => { //get all org chart entries from MongoDB database 
    try { //try block to catch errors 
        const orgCharts = await OrgChart.find(); //find all org chart entries in the database 
        res.status(200).json(orgCharts); //send a response with all org chart entries 
    } catch (err) { //catch block to handle errors 
        res.status(400).json({ error: err.message }); //send an error response with the error message 
    }
});

// Get an org chart entry by ID
router.get('/:id', async (req, res) => { //get an org chart entry by ID from MongoDB database 
    try { //try block to catch errors 
        const orgChart = await OrgChart.findById(req.params.id); //find an org chart entry by ID in the database 
        if (!orgChart) { //if org chart entry is not found 
            return res.status(404).json({ error: 'OrgChart not found' }); //send a response with error message 
        }
        res.status(200).json(orgChart); //send a response with the org chart entry 
    } catch (err) { //catch block to handle errors 
        res.status(400).json({ error: err.message }); //send an error response with the error message 
    }
});

// Update an org chart entry
router.put('/:id', async (req, res) => { //update an org chart entry in MongoDB database 
    try { //try block to catch errors 
        const updatedOrgChart = await OrgChart.findByIdAndUpdate(req.params.id, req.body, { new: true }); //find and update an org chart entry by ID in the database
        if (!updatedOrgChart) { //if org chart entry is not found 
            return res.status(404).json({ error: 'OrgChart not found' }); //send a response with error message 
        }
        res.status(200).json(updatedOrgChart); //send a response with the updated org chart entry
    } catch (err) { //catch block to handle errors 
        res.status(400).json({ error: err.message }); //send an error response with the error message
    }
});

// Delete an org chart entry
router.delete('/:id', async (req, res) => { //delete an org chart entry by ID from MongoDB database 
    try {  //try block to catch errors
        const deletedOrgChart = await OrgChart.findByIdAndDelete(req.params.id); //find and delete an org chart entry by ID in the database
        if (!deletedOrgChart) { //if org chart entry is not found 
            return res.status(404).json({ error: 'OrgChart not found' }); //send a response with error message 
        }
        res.status(200).json({ message: 'OrgChart deleted' }); //send a response with success message 
    } catch (err) { //catch block to handle errors 
        res.status(400).json({ error: err.message }); //send an error response with the error message 
    }
});

module.exports = router; //export router object to be used in other files 