// cs361courseproject / backend / routes / userRoutes.js

const express = require('express'); //import express
const User = require('../models/users'); //import the user model
const router = express.Router(); //create a new router

// create a new user
router.post('/', async (req, res) => { //create a new user
    try { //try to create a new user
        const newUser = new User(req.body); //create a new user
        const savedUser = await newUser.save(); //save the user
        res.status(201).json(savedUser); //return the saved user
    } catch (err) { //catch any errors
        res.status(400).json({ error: err.message }); //return an error message
    }
}); 

// get all users
router.get('/', async (req, res) => { //get all users
    try {  //try to get all users
        const users = await User.find(); //find all users
        res.status(200).json(users); //return the users
    } catch (err) { //catch any errors
        res.status(400).json({ error: err.message }); //return an error message
    }
}); 

// Get a user by ID
router.get('/:id', async (req, res) => { //get a user by ID
    try { //try to get a user by ID
        const user = await User.findById(req.params.id); //find a user by ID
        if (!user) { //if the user is not found
            return res.status(404).json({ error: 'User not found' }); //return an error message
        }
        res.status(200).json(user); //return the user
    } catch (err) { //catch any errors
        res.status(400).json({ error: err.message });   //return an error message
    }
});


// Update a user
router.put('/:id', async (req, res) => { //update a user
    try { //try to update a user
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); //find and update a user
        if (!updatedUser) {     //if the user is not found
            return res.status(404).json({ error: 'User not found' }); //return an error message
        }
        res.status(200).json(updatedUser); //return the updated user
    } catch (err) { //catch any errors
        es.status(400).json({ error: err.message }); //return an error message
    }
});


// Delete a user
router.delete('/:id', async (req, res) => { //delete a user
    try { //try to delete a user
        const deletedUser = await User.findByIdAndDelete(req.params.id); //find and delete a user
        if (!deletedUser) { //if the user is not found
            return res.status(404).json({ error: 'User not found' }); //return an error message
        }
        res.status(200).json({ message: 'User deleted' }); //return a success message
    } catch (err) { //catch any errors
        res.status(400).json({ error: err.message }); //return an error message
    }
});

module.exports = router; //export the router
