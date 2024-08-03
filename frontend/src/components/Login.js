// frontend/src/components/Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/home');
    };

    return (
        <div className="login-container">
            <h2>Welcome to AI Org</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                />
                <input
                    type="password"
                    placeholder="Password"
                />
                <button type="submit">Enter</button>
            </form>
            <div className="login-footer">
                <p>Manage your team and their access across the company! Onboard, off-board, and audit application access for employees.</p>
            </div>
        </div>
    );
};

export default Login;
