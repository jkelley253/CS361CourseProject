// controllers/userController.mjs
import User from '../models/User.mjs';

const createUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller method to get all active employees
const getActiveEmployees = async (req, res) => {
    try {
        const activeEmployees = await User.find({ status: 'active' });
        res.status(200).json(activeEmployees);
    } catch (error) {
        console.error('Error fetching active employees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOneAndUpdate({ email }, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating user by email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const offboardEmployee = async (req, res) => {
    try {
        const { email } = req.params;

      // Check if the email exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Set user status to 'inactive'
        user.status = 'inactive';
        await user.save();

        res.status(200).json({ message: 'Employee offboarded successfully', user });
    } catch (error) {
        console.error('Error offboarding employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};  


export default {
    createUser,
    offboardEmployee,
    getUserByEmail,
    updateUserByEmail,
    getActiveEmployees,
};
