// cs361courseproject / backend / models / users.js

const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({ 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    manager: { type: String, required: true },
    team: { type: String, required: true  },
    status: {type: String, default: 'active'},
    groups: [String], 
    apps: [String],
    title: { type: String, required: true  },
});

const User = mongoose.model('User', userSchema); 

module.exports = User; 