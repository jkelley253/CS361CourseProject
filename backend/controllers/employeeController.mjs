// controllers/employeeController.mjs
import User from '../models/User.mjs';

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

export default {
    getActiveEmployees,
};