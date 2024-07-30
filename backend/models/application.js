// cs361courseproject / backend / models / applications.js

const mongoose = require('mongoose'); 

const applicationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}, 
    users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], 
}); 

module.exports = mongoose.model('Application', applicationSchema); 