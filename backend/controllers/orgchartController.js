// cs361courseproject / backend / controllers / orgchartController.js

const OrgChart = require('../models/OrgChart'); // import OrgChart model from models folder 

exports.createOrgChart = async (req, res, next) => {
    try { // try block to catch any errors 
        const newOrgChart = new OrgChart(req.body); // create a new orgChart object with the request body 
        const savedOrgChart = await newOrgChart.save(); // save the new orgChart object to the database 
        res.status(201).json(savedOrgChart); // send a response with the saved orgChart object 
    } catch (err) { // catch block to handle any errors 
        next(err); // pass the error to the next middleware function 
    }
};

exports.getOrgCharts = async (req, res, next) => { // function to get all orgCharts 
    try { // try block to catch any errors 
        const orgCharts = await OrgChart.find(); // find all orgCharts in the database 
        res.status(200).json(orgCharts); // send a response with the orgCharts array 
    } catch (err) { // catch block to handle any errors 
        next(err); // pass the error to the next middleware function 
    }
};

exports.getOrgChartById = async (req, res, next) => { // function to get an orgChart by id 
    try { // try block to catch any errors 
        const orgChart = await OrgChart.findById(req.params.id); // find the orgChart with the given id 
        if (!orgChart) { // if the orgChart is not found
            return res.status(404).json({ error: 'OrgChart not found' }); // send a response with an error message 
        }
        res.status(200).json(orgChart); // send a response with the orgChart object 
    } catch (err) { // catch block to handle any errors
        next(err); // pass the error to the next middleware function 
    }
};

exports.updateOrgChart = async (req, res, next) => { // function to update an orgChart 
    try { // try block to catch any errors 
            const updatedOrgChart = await OrgChart.findByIdAndUpdate(req.params.id, req.body, { new: true }); // find and update the orgChart with the given id 
            if (!updatedOrgChart) { // if the orgChart is not found 
                return res.status(404).json({ error: 'OrgChart not found' }); // send a response with an error message 
            }
            res.status(200).json(updatedOrgChart); // send a response with the updated orgChart object 
    } catch (err) { // catch block to handle any errors 
        next(err); // pass the error to the next middleware function
    }
};

exports.deleteOrgChart = async (req, res, next) => { // function to delete an orgChart 
    try { // try block to catch any errors 
        const deletedOrgChart = await OrgChart.findByIdAndDelete(req.params.id); // find and delete the orgChart with the given id 
        if (!deletedOrgChart) { // if the orgChart is not found 
            return res.status(404).json({ error: 'OrgChart not found' }); // send a response with an error message 
        }
        res.status(200).json({ message: 'OrgChart deleted' }); // send a response with a success message 
    } catch (err) { // catch block to handle any errors 
        next(err); // pass the error to the next middleware function 
    }
};
