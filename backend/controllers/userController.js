// cs361courseproject / backend / controllers / userController.js

const User = require('../models/users'); //import User model from models folder

exports.createUser = async (req, res, next) => { //function to create a new user 
    try {  //try block to catch any errors 
        logger.info('Creating a new user'); // Log an informational message
        const newUser = new User(req.body); //create a new user object with the request body
        const savedUser = await newUser.save(); //save the new user object to the database 
        res.status(201).json(savedUser); //send a response with the saved user object
    } catch (err) { //catch block to handle any errors
        logger.error(`Error creating user: ${error.message}`); // Log an error message
        next(err); //pass the error to the next middleware function
    }
};

exports.getUsers = async (req, res, next) => { //function to get all users
    try { //try block to catch any errors
        const users = await User.find(); //find all users in the database
        res.status(200).json(users); //send a response with the users array
    } catch (err) { //catch block to handle any errors
        next(err); //pass the error to the next middleware function
    }
};

exports.getUserById = async (req, res, next) => { //function to get a user by id 
    try { //try block to catch any errors 
        const user = await User.findById(req.params.id); //find the user with the given id 
        if (!user) { //if the user is not found 
            return res.status(404).json({ error: 'User not found' }); //send a response with an error message 
        }
        res.status(200).json(user); //send a response with the user object 
    } catch (err) { //catch block to handle any errors 
        next(err); //pass the error to the next middleware function 
    }
};

exports.updateUser = async (req, res, next) => { //function to update a user
    try { //try block to catch any errors
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}); //find and update the user with the given id
        if (!updatedUser) { //if the user is not found
            return res.status(404).json({message: 'User not found'}); //send a response with an error message
        }
        res.status(200).json({message: 'User deleted'}); //send a response with a success message 
    } catch (err) { //catch block to handle any errors
        next(err); //pass the error to the next middleware function
    }
}; 

exports.deleteUser = async (req, res, next) => { //function to delete a user 
    try { //try block to catch any errors
        const deletedUser = await User.findByIdAndDelete(req.params.id); //find and delete the user with the given id 
        if (!deletedUser) { //if the user is not found 
            return res.status(404).json({ error: 'User not found' }); //send a response with an error message 
        }
        res.status(200).json({ message: 'User deleted' }); //send a response with a success message 
    } catch (err) { //catch block to handle any errors 
        next(err); // pass the error to the next middleware function
    }
};

// Function to onboard a new employee
exports.onboardEmployee = async (req, res, next) => {
    try {
        const { name, email, title, team, manager, groups, additionalAppAccess } = req.body;

      // Check if all required fields are present
        if (!name || !email || !title || !team || !manager) {
            return res.status(400).json({ message: 'All required fields must be filled out' });
        }

        const newEmployee = new User({ name, email, title, team, manager, groups, additionalAppAccess });
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        next(error);
    }
};