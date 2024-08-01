// frontend/src/components/AppMaintenance.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';

const AppMaintenance = () => {
    const [appName, setAppName] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setAppName(e.target.value);
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5070/api/apps/${appName}/users`);
            setUsers(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching app users', error);
            setError('App not found or another error occurred.');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (userId) => {
        setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.includes(userId)
                ? prevSelectedUsers.filter((id) => id !== userId)
                : [...prevSelectedUsers, userId]
        );
    };

    const handleRemoveUsersRequest = () => {
        setShowConfirmation(true);
    };

    const handleRemoveUsers = async () => {
        try {
            await axios.put(`http://localhost:5070/api/apps/${appName}/remove-users`, { users: selectedUsers });
            alert('Selected users have been removed from the app.');
            setSelectedUsers([]);
            handleSearch(); // Refresh the user list
        } catch (error) {
            console.error('Error removing users', error);
            alert('There was an error removing users from the app.');
        }
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    return (
        <div>
            <h2>App Maintenance</h2>
            <input
                type="text"
                placeholder="Enter App Name"
                value={appName}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch} disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>

            {error && <p>{error}</p>}

            {users.length > 0 && (
                <div>
                    <h3>Users with Access to {appName}</h3>
                    <ul>
                        {users.map((user) => (
                            <li key={user._id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedUsers.includes(user._id)}
                                        onChange={() => handleCheckboxChange(user._id)}
                                    />
                                    {user.firstName} {user.lastName} ({user.email})
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleRemoveUsersRequest} disabled={selectedUsers.length === 0}>
                        Remove Selected Users
                    </button>
                </div>
            )}
            <div className="maintenance-footer">
                <p>To perform maintenance on an application, type in the app name and press search. Select who you would like to remove and submit.</p>
            </div>

            <div className="app-instruction-footer">
                <p>Select from current apps: Slack, Jira, 1password, GitHub. App search is case sensitive.</p>
            </div>

            <button onClick={() => navigate('/')}>Home</button>

            {showConfirmation && (
                <div className="confirmation-popup">
                    <p>You are about to remove access for the users. This will take effect immediately.</p>
                    <button onClick={handleRemoveUsers}>Continue</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default AppMaintenance;
