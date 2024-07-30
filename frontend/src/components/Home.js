// cs361courseproject / frontend / src / components / Home.js

import React from 'react'; 
import Navbar from './Navbar'; 
import '../assets/styles/home.css'; 

function Home() { 
    return ( 
        
        <div className="home-container"> 
            <Navbar /> 
            <div className="welcome-message">
                <h1> Welcome to AI Org!</h1>
            </div>
            <div className="bottom-instructions">
                <p>To begin onboarding a new employee select the onboarding tab </p>
                <p>To begin off-boarding an employee select the off-boarding tab </p>
                <p>To perform maintenance on an application select the app/ employee maintenance tab</p>
                <p>To view your organization chart select the org chart tab </p>
            </div>
        </div>
    );
}

export default Home; 