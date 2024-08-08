import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/onboarding.css';

const Onboarding = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        manager: '',
        team: '',
        title: '',
        status: 'active',
        groups: [],
        apps: [],
    });

    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: prev[name].includes(value)
                ? prev[name].filter((item) => item !== value)
                : [...prev[name], value],
        }));
    };

    const handleConfirmSubmit = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5070/api/users', formData);
            console.log(response);
            alert('Employee onboarded successfully');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                manager: '',
                team: '',
                title: '',
                status: 'active',
                groups: [],
                apps: [],
            });
            navigate('/home');
        } catch (error) {
            console.error('Error onboarding employee', error);
            alert('There was an error onboarding the employee.');
        }
        setShowConfirmation(false);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
    };

    const goToHome = () => {
        navigate('/home');
    };

    return (
        <div>
            <form className="onboarding-form" onSubmit={handleConfirmSubmit}>
                <h2>Onboard New Employee</h2>
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
                <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input name="manager" value={formData.manager} onChange={handleChange} placeholder="Manager" />
                <input name="team" value={formData.team} onChange={handleChange} placeholder="Team" />
                <label>Title</label>
                <select name="title" value={formData.title} onChange={handleChange} required>
                    <option value="">Select Title</option>
                    {[
                        'CEO', 'Dev Director', 'Product Director', 'SRE Director', 'Marketing Director', 
                        'Dev Manager', 'Product Manager', 'SRE Manager', 'Marketing Manager', 
                        'Dev', 'Product', 'SRE', 'Marketing'
                    ].map(title => (
                        <option key={title} value={title}>{title}</option>
                    ))}
                </select>
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <fieldset>
                    <legend>Groups</legend>
                    {['dev', 'product', 'SRE', 'marketing'].map((group) => (
                        <label key={group}>
                            <input
                                type="checkbox"
                                name="groups"
                                value={group}
                                checked={formData.groups.includes(group)}
                                onChange={handleCheckboxChange}
                            />
                            {group}
                        </label>
                    ))}
                </fieldset>
                <fieldset>
                    <legend>Apps</legend>
                    {['Slack', 'Jira', '1password', 'GitHub'].map((app) => (
                        <label key={app}>
                            <input
                                type="checkbox"
                                name="apps"
                                value={app}
                                checked={formData.apps.includes(app)}
                                onChange={handleCheckboxChange}
                            />
                            {app}
                        </label>
                    ))}
                </fieldset>
                <button type="submit">Submit</button>
                <button type="button" onClick={goToHome}>Home</button>

                <div className="onboarding-footer">
                    <p>To onboard a new employee, fill out the info above. Ensure all required fields are complete. Once done, press submit to finalize.</p>
                </div>
            </form>

            {showConfirmation && (
                <div className="confirmation-popup">
                    <p>You are about to submit this employee to be onboarded. Are you sure you're ready to continue?</p>
                    <button onClick={handleSubmit}>Continue</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Onboarding;
