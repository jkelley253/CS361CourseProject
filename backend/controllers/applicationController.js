// cs361courseproject / backend / controllers / applicationController.js

const Application = require('../models/application'); // import Application model from models folder 

exports.createApplication = async (req, res, next) => { // function to create a new application 
    try { // try block to catch any errors 
        const newApplication = new Application(req.body); // create a new application object with the request body 
        const savedApplication = await newApplication.save(); // save the new application object to the database 
        res.status(201).json(savedApplication); // send a response with the saved application object 
    } catch (err) { // catch block to handle any errors 
        next(err); // pass the error to the next middleware function 
    } 
};

exports.getApplications = async (req, res, next) => { // function to get all applications 
    try { // try block to catch any errors 
        const applications = await Application.find().populate('users'); // find all applications in the database 
        res.status(200).json(applications); // send a response with the applications array 
    } catch (err) { // catch block to handle any errors 
        next(err); // pass the error to the next middleware function 
    }
};

exports.getApplicationById = async (req, res, next) => { // function to get an application by id 
    try { // try block to catch any errors 
        const application = await Application.findById(req.params.id).populate('users'); // find the application with the given id 
        if (!application) { // if the application is not found 
            return res.status(404).json({ error: 'Application not found' }); // send a response with an error message 
        }
        res.status(200).json(application); // send a response with the application object 
    } catch (err) { // catch block to handle any errors 
        next(err); // pass the error to the next middleware function 
    }
};

exports.updateApplication = async (req, res, next) => { // function to update an application 
    try { // try block to catch any errors 
        const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true }); // find and update the application with the given id 
        if (!updatedApplication) { // if the application is not found 
            return res.status(404).json({ error: 'Application not found' }); // send a response with an error message 
        }
        res.status(200).json(updatedApplication); // send a response with the updated application object 
    } catch (err) { // catch block to handle any errors 
        next(err); // pass the error to the next middleware function 
    }
};

exports.deleteApplication = async (req, res, next) => { // function to delete an application 
    try { // try block to catch any errors 
        const deletedApplication = await Application.findByIdAndDelete(req.params.id); // find and delete the application with the given id 
        if (!deletedApplication) { // if the application is not found 
            return res.status(404).json({ error: 'Application not found' }); // send a response with an error message 
        }
        res.status(200).json({ message: 'Application deleted' }); // send a response with a success message 
    } catch (err) { // catch block to handle any errors 
        next(err); // pass the error to the next middleware function 
    }
};
