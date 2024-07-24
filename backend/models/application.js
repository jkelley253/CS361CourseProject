// cs361courseproject / backend / models / applications.js

const mongoose = require('mongoose'); //import mongoose package to create schema for applications collection in database 

const applicationSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}, 
    users: [String], 
}); 

module.exports = mongoose.model('Application', applicationSchema); //export the schema as a model 