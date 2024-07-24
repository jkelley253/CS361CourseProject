// cs361courseproject / backend / routes / applicationRoutes.js

const express = require('express'); //import express package to create routes
const Application = require('../models/application'); //import application model to use in routes
const router = express.Router(); //create router object to define routes 

// Create a new application
router.post('/', async (req, res) => { //define post route for applications 
    try { //try to create a new application 
        const newApplication = new Application(req.body); //create a new application object with the request body 
        const savedApplication = await newApplication.save(); //save the new application to the database 
        res.status(201).json(savedApplication); //return the saved application if the post operation is successful 
    } catch (err) { //catch any errors that occur during the post operation 
        res.status(400).json({ error: err.message }); //return error message if there is an error 
    }
});

// Get all applications
router.get('/', async (req, res) => { //define get route for applications 
    try { //try to get all applications 
        const applications = await Application.find(); //find all applications in the database 
        res.status(200).json(applications); //return all applications if the get operation is successful 
    } catch (err) { //catch any errors that occur during the get operation 
        res.status(400).json({ error: err.message }); //return error message if there is an error 
    }
});

// Get an application by ID
router.get('/:id', async (req, res) => { //define get route for applications 
    try { //try to get the application 
        const application = await Application.findById(req.params.id); //find application by ID 
        if (!application) { //check if the application is not found 
            return res.status(404).json({ error: 'Application not found' }); //return error message if the application is not found 
        }
        res.status(200).json(application); //return application if it is found 
    } catch (err) { //catch any errors that occur during the get operation 
        res.status(400).json({ error: err.message }); // return error message if there is an error 
    }
});

// Update an application
router.put('/:id', async (req, res) => { //define put route for applications 
    try { //try to update the application 
        const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true }); //find and update the application by ID 
        if (!updatedApplication) { //check if the application is not found 
            return res.status(404).json({ error: 'Application not found' }); //return error message if the application is not found 
        }
        res.status(200).json(updatedApplication); //return updated application if the update operation is successful 
    } catch (err) { //catch any errors that occur during the update operation 
        res.status(400).json({ error: err.message }); // return error message if there is an error 
    }
});

// Delete an application
router.delete('/:id', async (req, res) => { //define delete route for applications 
    try { //try to delete the application 
        const deletedApplication = await Application.findByIdAndDelete(req.params.id); //find and delete the application by ID 
        if (!deletedApplication) { //check if the application is not found 
            return res.status(404).json({ error: 'Application not found' }); //return error message if the application is not found 
        }
        res.status(200).json({ message: 'Application deleted' }); //return success message if the delete operation is successful 
    } catch (err) { //catch any errors that occur during the delete operation 
        res.status(400).json({ error: err.message }); //return error message if there is an error 
    }
});

module.exports = router; //export the router object to use in the server file 