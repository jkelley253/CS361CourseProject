// cs361courseproject / backend / routes / auditRoutes.js

const express = require('express'); //import express package to create router for audit collection in database
const Audit = require('../models/audit'); //import audit schema to create router for audit collection in database  
const User = require('../models/user'); //import user schema to create router for audit collection in database
const router = express.Router(); //create router for audit collection in database

// Log a new audit action
router.post('/', async (req, res) => { //create post request to log a new audit action 
    try { //try block to catch errors 
        const newAudit = new Audit(req.body); //create new audit object with request body 
        const savedAudit = await newAudit.save(); //save new audit object to database 
        res.status(201).json(savedAudit); // return status 201 and saved audit object 
    } catch (err) { //catch block to catch errors 
        res.status(400).json({ error: err.message }); //return status 400 and error message 
    }
});

// Get all audits
router.get('/', async (req, res) => { //create get request to get all audits 
    try { //try block to catch errors 
        const audits = await Audit.find().populate('userId'); //find all audits and populate userId field 
        res.status(200).json(audits); //return status 200 and all audits 
    } catch (err) { //catch block to catch errors 
        res.status(400).json({ error: err.message }); //return status 400 and error message 
    }
});

// Search for inactive users based on date range
router.get('/inactive', async (req, res) => { //create get request to search for inactive users based on date range 
    const { startDate, endDate } = req.query; //get start date and end date from query parameters 
    if (!startDate || !endDate) { //if start date or end date is not provided 
        return res.status(400).json({ error: 'Start date and end date are required' }); //return status 400 and error message 
    }

    try { //try block to catch errors 
        const inactiveUsers = await User.find().populate({ //find all users and populate audits field 
            path: 'audits', //populate audits field 
            match: { //match audits field based on date range 
                timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) }, //match audits field based on date range 
            },
        }).exec(); //execute query 

        const result = inactiveUsers.filter(user => !user.audits || user.audits.length === 0); //filter users based on audits field 

        res.status(200).json(result); //return status 200 and result 
    } catch (err) { //catch block to catch errors 
        res.status(400).json({ error: err.message }); //return status 400 and error message 
    }
});

module.exports = router; //export router for audit collection in database 