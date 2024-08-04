// frontend/src/components/CreateAccount.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5070/api/create-account', formData);
            alert('Account created successfully');
            navigate('/home');
        } catch (error) {
            console.error('Error creating account', error);
            alert('There was an error creating the account.');
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="create-account-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Create Account</button>
            </form>
            <button onClick={handleBack}>Back</button>
            <div className="create-account-footer">
                <p>Account creation is for admin use only. Please ensure you are authorized to use this program, verification will be needed.</p>
            </div>
        </div>
    );
};

export default CreateAccount;
