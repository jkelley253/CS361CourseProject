// cs361courseproject / frontend / src / components / AppEmployeeMaintenance.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/appEmployeeMaintenance.css';

function AppEmployeeMaintenance() {
    const navigate = useNavigate();
    const [searchBy, setSearchBy] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    console.log("AppEmployeeMaintenance component rendered");

    const handleSearch = () => {
        // Placeholder logic for searching by app or email
        // Replace with actual data fetching logic
        if (searchBy === 'app') {
            setSearchResults({
                type: 'app',
                appName: searchTerm,
                users: [
                    { name: 'John Doe', lastActivity: '2023-01-15' },
                    { name: 'Jane Smith', lastActivity: '2023-02-01' },
                ],
            });
        } else if (searchBy === 'email') {
            setSearchResults({
                type: 'email',
                employeeName: 'John Doe',
                existingGroups: ['Dev', 'Product'],
                existingApps: ['Slack', 'Jira'],
                availableGroups: ['SRE', 'Marketing'],
                availableApps: ['1password', 'Github'],
            });
        }
    };

    const handleSubmit = () => {
        console.log("Submit clicked");
        if (window.confirm("Are you sure you want to make these changes? This will take effect immediately after submission, and users will no longer have access.")) {
            console.log('Changes submitted');
            navigate('/home');
        }
    };

    return (
        <div className="maintenance-container">
            <div className="maintenance-header">
                <button className="home-button" onClick={() => navigate('/home')}>Home</button>
                <h1>App & Employee Maintenance</h1>
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by app or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button" onClick={() => setSearchBy('app')}>Search by App</button>
                <button className="search-button" onClick={() => setSearchBy('email')}>Search by Email</button>
            </div>
            {searchResults && searchResults.type === 'app' && (
                <div className="app-results">
                    <h2>{searchResults.appName}</h2>
                    <ul>
                        {searchResults.users.map((user, index) => (
                            <li key={index}>{user.name} - Last Activity: {user.lastActivity}</li>
                        ))}
                    </ul>
                    <label>
                        <input type="checkbox" /> Remove users with inactive date greater than 90 days
                    </label>
                </div>
            )}
            {searchResults && searchResults.type === 'email' && (
                <div className="employee-results">
                    <h2>{searchResults.employeeName}</h2>
                    <div className="group-app-section">
                        <div>
                            <h3>Existing Groups, Select to Remove</h3>
                            {searchResults.existingGroups.map((group, index) => (
                                <label key={index}>
                                    <input type="checkbox" /> {group}
                                </label>
                            ))}
                        </div>
                        <div>
                            <h3>Existing App Access, Select to Remove</h3>
                            {searchResults.existingApps.map((app, index) => (
                                <label key={index}>
                                    <input type="checkbox" /> {app}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="group-app-section">
                        <div>
                            <h3>New Groups, Select to Add</h3>
                            {searchResults.availableGroups.map((group, index) => (
                                <label key={index}>
                                    <input type="checkbox" /> {group}
                                </label>
                            ))}
                        </div>
                        <div>
                            <h3>New App Access, Select to Add</h3>
                            {searchResults.availableApps.map((app, index) => (
                                <label key={index}>
                                    <input type="checkbox" /> {app}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className="maintenance-footer">
                <p>To off-board an employee type in their email and select yes to removing the employee from the groups and apps. Once done the employee will no longer have access.</p>
            </div>
        </div>
    );
}

export default AppEmployeeMaintenance;