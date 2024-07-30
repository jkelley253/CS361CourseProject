// cs361courseproject / backend / models / audit.js

const mongoose = require('mongoose'); 

const auditSchema = new mongoose.Schema({ 
    userID: {type: String, ref: "User", required: true }, 
    action: {type: String, required: true },
    timestamp: {type: Date, required: true, default: Date.now }, 
}); 

module.exports = mongoose.model('Audit', auditSchema); 