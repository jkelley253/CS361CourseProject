// frontend/src/components/EmployeeMaintenance.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';

const EmployeeMaintenance = () => {
    const [email, setEmail] = useState('');
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setEmail(e.target.value.toLowerCase());
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5070/api/users/${email}`);
            setEmployee(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching employee information', error);
            setError('User not found or another error occurred.');
            setEmployee(null);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChangeEmployee = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({
            ...prev,
            [name]: prev[name].includes(value)
                ? prev[name].filter((item) => item !== value)
                : [...prev[name], value],
        }));
    };

    const handleUpdateRequest = () => {
        setShowConfirmation(true);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5070/api/users/${email}`, employee);
            alert('Employee updated successfully');
            setShowConfirmation(false);
        } catch (error) {
            console.error('Error updating employee', error);
            alert('There was an error updating the employee.');
        }
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };


    return (
        <div>
            <h2>Employee Maintenance</h2>
            <input
                type="text"
                placeholder="Enter Employee Email"
                value={email}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch} disabled={loading}>{loading ? 'Searching...' : 'Search'}</button>

            {error && <p>{error}</p>}

            {employee && (
                <div>
                    <h3>Employee Information</h3>
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={employee.firstName}
                            onChange={handleInputChangeEmployee}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={employee.lastName}
                            onChange={handleInputChangeEmployee}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="text"
                            name="email"
                            value={employee.email}
                            onChange={handleInputChangeEmployee}
                        />
                    </label>
                    <label>
                        Manager:
                        <input
                            type="text"
                            name="manager"
                            value={employee.manager}
                            onChange={handleInputChangeEmployee}
                        />
                    </label>
                    <label>
                        Team:
                        <input
                            type="text"
                            name="team"
                            value={employee.team}
                            onChange={handleInputChangeEmployee}
                        />
                    </label>
                    <label>Title</label>
                    <select name="title" value={employee.title} onChange={handleInputChangeEmployee} required>
                        <option value="">Select Title</option>
                        {[
                            'CEO', 'Dev Director', 'Product Director', 'SRE Director', 'Marketing Director', 
                            'Dev Manager', 'Product Manager', 'SRE Manager', 'Marketing Manager', 
                            'Dev', 'Product', 'SRE', 'Marketing'
                        ].map(title => (
                            <option key={title} value={title}>{title}</option>
                        ))}
                    </select>
                    <label>
                        Status:
                        <select name="status" value={employee.status} onChange={handleInputChangeEmployee}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </label>

                    <fieldset>
                        <legend>Current Groups</legend>
                        <ul>
                            {employee.groups.map(group => (
                                <li key={group}>{group}</li>
                            ))}
                        </ul>
                    </fieldset>
                    <fieldset>
                        <legend>Update Groups</legend>
                        {['dev', 'product', 'SRE', 'marketing'].map((group) => (
                            <label key={group}>
                                <input
                                    type="checkbox"
                                    name="groups"
                                    value={group}
                                    checked={employee.groups.includes(group)}
                                    onChange={handleCheckboxChange}
                                />
                                {group}
                            </label>
                        ))}
                    </fieldset>

                    <fieldset>
                        <legend>Current Apps</legend>
                        <ul>
                            {employee.apps.map(app => (
                                <li key={app}>{app}</li>
                            ))}
                        </ul>
                    </fieldset>
                    <fieldset>
                        <legend>Update Apps</legend>
                        {['Slack', 'Jira', '1password', 'GitHub'].map((app) => (
                            <label key={app}>
                                <input
                                    type="checkbox"
                                    name="apps"
                                    value={app}
                                    checked={employee.apps.includes(app)}
                                    onChange={handleCheckboxChange}
                                />
                                {app}
                            </label>
                        ))}
                    </fieldset>
                    <button onClick={handleUpdateRequest}>Update Employee</button>
                    <button onClick={() => navigate('/home')}>Home</button>
                </div>
            )}

            {showConfirmation && (
                <div className="confirmation-popup">
                    <p>You are about to submit an update to this employee's access. This will take effect immediately.</p>
                    <button onClick={handleUpdate}>Continue</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
            <button onClick={() => navigate('/home')}>Home</button>
            <div className="maintenance-footer">
                <p>To perform maintenance on an employee, type in their email and select yes to removing the employee from the groups and apps. Once done, the employee will no longer have access.</p>
            </div>
        </div>
    );
};

export default EmployeeMaintenance;
