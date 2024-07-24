// cs361courseproject / backend / models / users.js

const mongoose = require('mongoose'); //import mongoose

const userSchema = new mongoose.Schema({ //create a new mongoose schema for the user model 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    manager: { type: String },
    team: { type: String },
    status: {type: String, default: 'active'},
    groups: [String], 
    apps: [String],
});

module.exports = mongoose.model('User', userSchema); //export the model