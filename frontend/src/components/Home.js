// cs361courseproject / frontend / src / components / Home.js

import React from 'react'; // import react module from react library 
import Navbar from './Navbar'; // import Navbar component from Navbar.js file 
import '../assets/styles/home.css'; // import style.css file from assets/styles folder 

function Home() { // define Home component 
    return ( // return the following content 
        // create a div element with class name home-container 
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

export default Home; // export Home component to be used in other files 