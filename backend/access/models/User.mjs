// access/models/User.mjs

import mongoose from 'mongoose';


// DB schema for createing a new employee 
const userSchema = new mongoose.Schema ({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    manager: { type: String}, 
    team: { type: String}, 
    // password: { type: String, required: true },
    title: { 
        type: String, 
        required: true, 
        enum: [
            'CEO', 
            'Dev Director', 'Product Director', 'SRE Director', 'Marketing Director',
            'Dev Manager', 'Product Manager', 'SRE Manager', 'Marketing Manager',
            'Dev', 'Product', 'SRE', 'Marketing'
        ]
    },
    status: { type: String, default: 'active'}, 
    groups: { type: [String], enum: [ 'dev', 'product', 'sre', 'marketing'], default: []},
    //created: { type: Date, default: Date.now },
    //updated: { type: Date, default: Date.now }
    apps: { type: [String], enum: [ 'Slack', 'Jira', '1password', 'Github'], default: []}, 
});

export default mongoose.model('User', userSchema);