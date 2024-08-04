// frontend/src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5070/api/login/login', formData);
            if (response.status === 200) {
                navigate('/home');
            }
        } catch (error) {
            alert('Invalid username or password');
            console.error('Login error', error);
        }
    };

    const handleCreateAccount = () => {
        navigate('/create-account');
    };

    return (
        <div className="login-container">
            <h2>Welcome to AI Org</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">Enter</button>
            </form>
            <button onClick={handleCreateAccount}>Create Account</button>
            <div className="login-footer">
                <p>Manage your team and their access across the company! Onboard, off-board, and audit application access for employees.</p>
            </div>
        </div>
    );
};

export default Login;
