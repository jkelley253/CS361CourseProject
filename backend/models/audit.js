// cs361courseproject / backend / models / audit.js

const mongoose = require('mongoose'); //import mongoose package to create schema for audit collection in database 

const auditSchema = new mongoose.Schema({ //create schema for audit collection in database 
    userID: {type: String, required: ture }, 
    action: {type: String, required: true },
    timestamp: {type: Date, required: true, default: Date.now }, 
}); 

module.exports = mongoose.model('Audit', auditSchema); //export schema for audit collection in database