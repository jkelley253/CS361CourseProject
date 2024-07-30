// cs361courseproject / backend / controllers / auditController.js

const Audit = require('../models/audit');
const User = require('../models/users');
const logger = require('../utils/logger');

exports.createAudit = async (req, res, next) => {
    try {
        const newAudit = new Audit(req.body);
        const savedAudit = await newAudit.save();
        res.status(201).json(savedAudit);
    } catch (err) {
        logger.error(`Error creating audit: ${err.message}`);
        next(err);
    }
};

exports.getAudits = async (req, res, next) => {
    try {
        const audits = await Audit.find().populate('userId');
        res.status(200).json(audits);
    } catch (err) {
        logger.error(`Error fetching audits: ${err.message}`);
        next(err);
    }
};


exports.updateAudit = async (req, res, next) => {
    try {
        const updatedAudit = await Audit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAudit) {
            return res.status(404).json({ error: 'Audit not found' });
        }
        res.status(200).json(updatedAudit);
    } catch (err) {
        logger.error(`Error updating audit: ${err.message}`);
        next(err);
    }
};


exports.deleteAudit = async (req, res, next) => {
    try {
        const deletedAudit = await Audit.findByIdAndDelete(req.params.id);
        if (!deletedAudit) {
            return res.status(404).json({ error: 'Audit not found' });
        }
        res.status(200).json({ message: 'Audit deleted' });
    } catch (err) {
        logger.error(`Error deleting audit: ${err.message}`);
        next(err);
    }
};

exports.getInactiveUsers = async (req, res, next) => {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Start date and end date are required' });
    }

    try {
        const inactiveUsers = await User.find().populate({
            path: 'audits',
            match: {
                timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) },
            },
        }).exec();

        const result = inactiveUsers.filter(user => !user.audits || user.audits.length === 0);
        res.status(200).json(result);
    } catch (err) {
        logger.error(`Error fetching inactive users: ${err.message}`);
        next(err);
    }
};

