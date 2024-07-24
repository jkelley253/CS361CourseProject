// cs361courseproject / backend / controllers / auditController.js

const Audit = require('../models/audit'); // import Audit model from models folder 
const User = require('../models/users'); // import User model from models folder 

exports.createAudit = async (req, res, next) => { // function to create a new audit 
    try { // try block to catch any errors 
        const newAudit = new Audit(req.body); // create a new audit object with the request body 
        const savedAudit = await newAudit.save(); // save the new audit object to the database 
        res.status(201).json(savedAudit); // send a response with the saved audit object 
    } catch (err) { // catch block to handle any errors 
        next(err); // pass the error to the next middleware function 
    }
};

exports.getAudits = async (req, res, next) => { // function to get all audits 
    try { // try block to catch any errors 
        const audits = await Audit.find().populate('userId'); // find all audits in the database 
        res.status(200).json(audits); // send a response with the audits array 
    } catch (err) { // catch block to handle any errors 
        next(err); // pass the error to the next middleware function 
    }
};

exports.getInactiveUsers = async (req, res, next) => { // function to get inactive users 
    const { startDate, endDate } = req.query; // get start date and end date from query parameters 
    if (!startDate || !endDate) { // if start date or end date is missing 
        return res.status(400).json({ error: 'Start date and end date are required' }); // send a response with an error message 
    }    

    try { // try block to catch any errors 
        const inactiveUsers = await User.find().populate({ // find all users in the database and populate the audits field 
        path: 'audits',
        match: { // filter audits by timestamp 
            timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) }, // filter audits by start date and end date 
        }, 
        }).exec(); // execute the query 

    const result = inactiveUsers.filter(user => !user.audits || user.audits.length === 0); // filter users with no audits or empty audits array 

    res.status(200).json(result); // send a response with the filtered users array 
    } catch (err) { // catch block to handle any errors 
        next(err); // pass the error to the next middleware function 
    }
};
