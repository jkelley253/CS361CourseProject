// frontend/src/components/Offboarding.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';


const Offboarding = () => {
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5070/api/users/${email}`);
            setUser(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching user information', error);
            setError('User not found or another error occurred.');
            setUser(null);
        }
    };

    const handleOffboardRequest = () => {
        setShowConfirmation(true);
    };

    const handleOffboard = async () => {
        try {
            await axios.delete(`http://localhost:5070/api/users/offboard/${email}`);
            alert('Employee offboarded successfully');
            navigate('/home');
        } catch (error) {
            console.error('Error offboarding employee', error);
            alert('There was an error offboarding the employee.');
        }
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <div>
            <h2>Offboard Employee</h2>
            <input
                type="text"
                placeholder="Enter Employee Email"
                value={email}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p>{error}</p>}

            {user && (
                    <div>
                    <h3>Employee Information</h3>
                    <p>Name: {user.firstName} {user.lastName}</p>
                    <p>Email: {user.email}</p>
                    <p>Title: {user.title}</p>
                    <p>Manager: {user.manager}</p>
                    <p>Team: {user.team}</p>
                    <p>Status: {user.status}</p>
                    <p>Groups: {user.groups.join(', ')}</p>
                    <p>Apps: {user.apps.join(', ')}</p>

                    <button onClick={handleOffboardRequest}>Confirm Offboarding</button>
                    <button onClick={() => setUser(null)}>Cancel</button>
                </div>
            )}

            {showConfirmation && (
                <div className="confirmation-popup">
                    <p>You are about to offboard this user. Are you sure you want to continue?</p>
                    <button onClick={handleOffboard}>Continue</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
            <button onClick={() => navigate('/home')}>Home</button>
            <div className="offboarding-footer">
                <p>To off-board an employee, type in their email and select yes to removing the employee from the groups and apps. Once done, the employee will no longer have access.</p>
            </div>
        </div>
    );
};

export default Offboarding;
