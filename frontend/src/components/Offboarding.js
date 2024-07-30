// CS361courseproject/ Frontend/ src/ components / Offboarding.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/offboarding.css';

function Offboarding() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [employeeInfo, setEmployeeInfo] = useState(null); 
    const [removeFromGroups, setRemoveFromGroups] = useState(false);
    const [removeFromApps, setRemoveFromApps] = useState(false);

    const handleSearch = () => {
    };

    const handleSubmit = () => {
        if (window.confirm("Are you sure you want to off-board this user? Once off-boarded, this user will no longer have access")) {

        console.log('Employee off-boarded', { email, removeFromGroups, removeFromApps });

        navigate('/home');
        }
    };

    return (
        <div className="offboarding-container">
            <div className="offboarding-header">
                <button className="home-button" onClick={() => navigate('/home')}>Home</button>
                <h1>Off-boarding</h1>
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter employee email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
            {employeeInfo && (
                <div className="employee-info">
                    <h2>Employee Information</h2>
                    <p><strong>Name:</strong> {employeeInfo.name}</p>
                    <p><strong>Email:</strong> {employeeInfo.email}</p>
                    <p><strong>Groups:</strong> {employeeInfo.groups.join(', ')}</p>
                    <p><strong>Apps:</strong> {employeeInfo.apps.join(', ')}</p>
                </div>
            )}
            <div className="checkbox-container">
                <label>
                    <input
                        type="checkbox"
                        checked={removeFromGroups}
                        onChange={(e) => setRemoveFromGroups(e.target.checked)}
                    />
                    Remove user from groups
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={removeFromApps}
                        onChange={(e) => setRemoveFromApps(e.target.checked)}
                    />
                    Remove user from apps
                </label>
            </div>
            <div className="offboarding-footer">
                <p>To off-board an employee type in their email and select yes to removing the employee from the groups and apps. Once done the employee will no longer have access.</p>
            </div>
        </div>
    );
}

export default Offboarding;