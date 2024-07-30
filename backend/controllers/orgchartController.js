// cs361courseproject / backend / controllers / orgchartController.js

const OrgChart = require('../models/orgChart');
const logger = require('../utils/logger');

exports.createOrgChart = async (req, res, next) => {
    try {
        const newOrgChart = new OrgChart(req.body);
        const savedOrgChart = await newOrgChart.save();
        res.status(201).json(savedOrgChart);
    } catch (err) {
        logger.error(`Error creating org chart: ${err.message}`);
        next(err);
    }
};

exports.getOrgCharts = async (req, res, next) => {
    try {
        const orgCharts = await OrgChart.find();
        res.status(200).json(orgCharts);
    } catch (err) {
        logger.error(`Error fetching org charts: ${err.message}`);
        next(err);
    }
};

exports.getOrgChartById = async (req, res, next) => {
    try {
        const orgChart = await OrgChart.findById(req.params.id);
        if (!orgChart) {
            return res.status(404).json({ error: 'Org chart not found' });
        }
        res.status(200).json(orgChart);
    } catch (err) {
        logger.error(`Error fetching org chart by ID: ${err.message}`);
        next(err);
    }
};

exports.updateOrgChart = async (req, res, next) => {
    try {
        const updatedOrgChart = await OrgChart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOrgChart) {
            return res.status(404).json({ error: 'Org chart not found' });
        }
        res.status(200).json(updatedOrgChart);
    } catch (err) {
        logger.error(`Error updating org chart: ${err.message}`);
        next(err);
    }
};

exports.deleteOrgChart = async (req, res, next) => {
    try {
        const deletedOrgChart = await OrgChart.findByIdAndDelete(req.params.id);
        if (!deletedOrgChart) {
            return res.status(404).json({ error: 'Org chart not found' });
        }
        res.status(200).json({ message: 'Org chart deleted' });
    } catch (err) {
        logger.error(`Error deleting org chart: ${err.message}`);
        next(err);
    }
};
