// cs361courseproject / backend / controllers / orgchartController.js

const OrgChart = require('../models/OrgChart'); 

exports.createOrgChart = async (req, res, next) => {
    try { 
        const newOrgChart = new OrgChart(req.body); 
        const savedOrgChart = await newOrgChart.save(); 
        res.status(201).json(savedOrgChart); 
    } catch (err) { 
        next(err); 
    }
};

exports.getOrgCharts = async (req, res, next) => { 
    try { 
        const orgCharts = await OrgChart.find(); 
        res.status(200).json(orgCharts); 
    } catch (err) { 
        next(err); 
    }
};

exports.getOrgChartById = async (req, res, next) => { 
    try { 
        const orgChart = await OrgChart.findById(req.params.id); 
        if (!orgChart) { 
            return res.status(404).json({ error: 'OrgChart not found' }); 
        }
        res.status(200).json(orgChart); 
    } catch (err) { 
        next(err); 
    }
};

exports.updateOrgChart = async (req, res, next) => { 
    try {  
            const updatedOrgChart = await OrgChart.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
            if (!updatedOrgChart) { 
                return res.status(404).json({ error: 'OrgChart not found' }); 
            }
            res.status(200).json(updatedOrgChart); 
    } catch (err) { 
        next(err); 
    }
};

exports.deleteOrgChart = async (req, res, next) => { 
    try { 
        const deletedOrgChart = await OrgChart.findByIdAndDelete(req.params.id); 
        if (!deletedOrgChart) { 
            return res.status(404).json({ error: 'OrgChart not found' }); 
        }
        res.status(200).json({ message: 'OrgChart deleted' }); 
    } catch (err) { 
        next(err);
    }
};
