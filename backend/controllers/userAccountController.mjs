// backend/controllers/userAccountController.mjs

import UserAccount from '../models/UserAccount.mjs';

export const createAccount = async (req, res)=> {
    try {
        const newAccount = new UserAccount(req.body);
        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const account = await UserAccount.findOne({ username, password });
        if (!account) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export default {
    createAccount,
    login,
    };