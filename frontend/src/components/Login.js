// cs361courseproject / frontend / src / components / Login.js

import React from 'react'; // Import React library 
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../assets/styles/login.css'; // Import style.css file

function Login() {
    const navigate = useNavigate(); // Use navigate function from react-router-dom

    const handleLogin = () => { // Handle login function
        
        navigate('/home'); // Navigate to home page
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

export default Login; // Export Login function