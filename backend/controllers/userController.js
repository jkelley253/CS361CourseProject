// cs361courseproject / backend / controllers / userController.js

const User = require('../models/users'); 
const logger = require('../utils/logger');

exports.createUser = async (req, res, next) => { 
    try {  
        logger.info('Creating a new user'); 
        const newUser = new User(req.body); 
        const savedUser = await newUser.save(); 
        res.status(201).json(savedUser); 
    } catch (err) { 
        logger.error(`Error creating user: ${err.message}`); 
        next(err); 
    }
};

exports.getUsers = async (req, res, next) => { 
    try { 
        const users = await User.find(); 
        res.status(200).json(users); 
    } catch (err) { 
        next(err); 
    }
};

exports.getUserById = async (req, res, next) => { 
    try { 
        const user = await User.findById(req.params.id); 
        if (!user) { 
            return res.status(404).json({ error: 'User not found' }); 
        }
        res.status(200).json(user); 
    } catch (err) { 
        next(err); 
    }
};

exports.updateUser = async (req, res, next) => { 
    try { 
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}); 
        if (!updatedUser) { 
            return res.status(404).json({message: 'User not found'}); 
        }
        res.status(200).json({message: 'User deleted'}); 
    } catch (err) { 
        next(err); 
    }
}; 

exports.deleteUser = async (req, res, next) => { 
    try { 
        const deletedUser = await User.findByIdAndDelete(req.params.id); 
        if (!deletedUser) { 
            return res.status(404).json({ error: 'User not found' }); 
        }
        res.status(200).json({ message: 'User deleted' }); 
    } catch (err) { 
        next(err); 
    }
};

// Function to onboard a new employee
exports.onboardEmployee = async (req, res, next) => {
    try {
        const { firstName, lastName, email, title, team, manager, groups, apps } = req.body;

        if (!firstName || !lastName || !email || !title || !team || !manager) {
            return res.status(400).json({ message: 'All required fields must be filled out' });
        }

        const newEmployee = new User({ firstName, lastName, email, title, team, manager, groups, apps });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (err) {
        next(err);
    }
};