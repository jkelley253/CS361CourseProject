// frontend/src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';

const Home = () => {
    const navigate = useNavigate();

    const navigateToOnboarding = () => {
        navigate('/onboarding');
    };

    const navigateToOffboarding = () => {
        navigate('/offboarding');
    };

    const navigateToEmployeeMaintenance = () => {
        navigate('/employee-maintenance');
    };

    const navigateToAppMaintenance = () => {
        navigate('/app-maintenance');
    };
    
    const navigateToOrgChart = () => {
        navigate('/org-chart');
    };

    const handleLogout = () => {
        navigate('/login'); 
    };

    return (
        <div className="home">
            <h1>Welcome!</h1>
            <button onClick={navigateToOnboarding}>Onboard New Employee</button>
            <button onClick={navigateToOffboarding}>Offboard Employee</button>
            <button onClick={navigateToEmployeeMaintenance}>Employee Maintenance</button>
            <button onClick={navigateToAppMaintenance}>App Maintenance</button>
            <button onClick={navigateToOrgChart}>Org Chart</button>
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <div className="bottom-instructions">
                <p>To begin onboarding a new employee select the onboarding tab </p>
                <p>To begin off-boarding an employee select the off-boarding tab </p>
                <p>To perform maintenance on an application select the app/ employee maintenance tab</p>
                <p>To view your organization chart select the org chart tab </p>
            </div>
        </div>
    );
};

export default Home;
