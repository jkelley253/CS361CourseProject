// cs361courseproject / backend / models / orgChart.js

const mongoose = require('mongoose'); //import mongoose package to create schema for orgChart collection in MongoDB database 

const orgChartSchema = new mongoose.Schema({ //create schema for orgChart collection in MongoDB database
    employeeId: { type: String, required: true }, 
    managerId: { type: String, required: true}, 
    employeeName: { type: String, required: true },
    title: { type: String, required: true },
    team: { type: String, required: true },
}); 

module.exports = mongoose.model('orgChart', orgChartSchema); //export orgChart schema as a model to be used in other files