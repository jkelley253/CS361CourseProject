// cs361courseproject / backend / models / orgChart.js

const mongoose = require('mongoose');  

const orgChartSchema = new mongoose.Schema({ 
    employeeId: { type: String, required: true, ref: 'User' }, 
    managerId: { type: String, required: true, ref: 'User'}, 
    employeeName: { type: String, required: true },
    title: { type: String, required: true },
    team: { type: String, required: true },
}); 

module.exports = mongoose.model('orgChart', orgChartSchema); 