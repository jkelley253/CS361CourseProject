// backend/controllers/appController.mjs
import User from '../models/User.mjs';

// Controller to get users by app name
const getUsersByApp = async (req, res) => {
    try {
        const { appName } = req.params;
        const users = await User.find({ apps: appName });
        if (!users.length) {
            return res.status(404).json({ message: 'No users found for this app' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users by app:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to remove users from app
const removeUsersFromApp = async (req, res) => {
    try {
        const { appName } = req.params;
        const { users } = req.body; // Array of user IDs
        const updateResult = await User.updateMany(
            { _id: { $in: users } },
            { $pull: { apps: appName } },
            { multi: true }
        );

        if (updateResult.nModified === 0) {
            return res.status(404).json({ message: 'No users were updated' });
        }

        res.status(200).json({ message: 'Users updated successfully', updateResult });
    } catch (error) {
        console.error('Error removing users from app:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default {
    getUsersByApp,
    removeUsersFromApp,
};
