// cs361courseproject / frontend / src / components / Login.js

import React from 'react';  
import { useNavigate } from 'react-router-dom'; 
import '../assets/styles/login.css'; 

function Login() {
    const navigate = useNavigate(); 

    const handleLogin = () => { 
        
        navigate('/home'); 
    }; 

    return (
        <div className="login-container"> 
            <h1>Welcome to AI Org</h1>
            <div className="login-form">
                <input type="text" placeholder="Username" className="login-input" />
                <input type="password" placeholder="Password" className="login-input" />
                <button onClick={handleLogin} className="login-button">Enter</button>
            </div>
            <p className="login-footer">Manage your team and their access across the company! Onboard, off-board, and audit application access for employees.</p>
        </div>
    );
}

export default Login; 