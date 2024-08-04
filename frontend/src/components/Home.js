// frontend/src/components/Home.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/style.css';

const Home = () => {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://localhost:5080/api/notifications');
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications', error);
        }
    };

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

    const navigateToNotifications = () => {
        navigate('/notifications');
    };

    const handleLogout = () => {
        navigate('/login'); 
    };



    return (
        <div className="home-container">
            <div className="buttons-container">
                <h1>Welcome!</h1>
                <button onClick={navigateToOnboarding}>Onboard New Employee</button>
                <button onClick={navigateToOffboarding}>Offboard Employee</button>
                <button onClick={navigateToEmployeeMaintenance}>Employee Maintenance</button>
                <button onClick={navigateToAppMaintenance}>App Maintenance</button>
                <button onClick={navigateToOrgChart}>Org Chart</button>
                <button onClick={navigateToNotifications}>Notifications</button>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
            <div className="notifications-box">
                <h2>Notifications</h2>
                {notifications.length === 0 ? (
                    <p>No notifications yet.</p>
                ) : (
                    <ul>
                        {notifications.map((notification) => (
                            <li key={notification._id}>
                                <h3>{notification.title}</h3>
                                <p>{notification.message}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
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
