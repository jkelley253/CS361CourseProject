// cs361courseproject / backend / controllers / applicationController.js

const Application = require('../models/application');
const logger = require('../utils/logger');

exports.createApplication = async (req, res, next) => {
    try {
        const newApplication = new Application(req.body);
        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (err) {
        logger.error(`Error creating application: ${err.message}`);
        next(err);
    }
};

exports.getApplications = async (req, res, next) => {
    try {
        const applications = await Application.find().populate('users');
        res.status(200).json(applications);
    } catch (err) {
        logger.error(`Error fetching applications: ${err.message}`);
        next(err);
    }
};

exports.getApplicationById = async (req, res, next) => {
    try {
        const application = await Application.findById(req.params.id).populate('users');
        if (!application) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json(application);
    } catch (err) {
        logger.error(`Error fetching application by ID: ${err.message}`);
        next(err);
    }
};

exports.updateApplication = async (req, res, next) => {
    try {
        const updatedApplication = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json(updatedApplication);
    } catch (err) {
        logger.error(`Error updating application: ${err.message}`);
        next(err);
    }
};

exports.deleteApplication = async (req, res, next) => {
    try {
        const deletedApplication = await Application.findByIdAndDelete(req.params.id);
        if (!deletedApplication) {
            return res.status(404).json({ error: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted' });
    } catch (err) {
        logger.error(`Error deleting application: ${err.message}`);
        next(err);
    }
};
