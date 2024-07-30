// cs361courseproject / backend / controllers / auditController.js

const Audit = require('../models/audit'); 
const User = require('../models/users'); 

exports.createAudit = async (req, res, next) => { 
    try { 
        const newAudit = new Audit(req.body); 
        const savedAudit = await newAudit.save(); 
        res.status(201).json(savedAudit); 
    } catch (err) { 
        next(err);  
    }
};

exports.getAudits = async (req, res, next) => {  
    try {  
        const audits = await Audit.find().populate('userId');  
        res.status(200).json(audits);  
    } catch (err) {  
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
        next(err);  
    }
};
