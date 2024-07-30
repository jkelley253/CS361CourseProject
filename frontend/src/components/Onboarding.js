// cd361courseproject / frontend / src / components / Onboarding.js

import React, { useState } from 'react'; // useState to manage the form data 
import { useNavigate } from 'react-router-dom'; // useNavigate to navigate to the next page 
import Checkbox from './Checkbox'; // import Checkbox component
import '../assets/styles/onboarding.css'; // import the css file 

function Onboarding () { // create the Onboarding function 
    const navigate = useNavigate(); // navigate to the next page 
    const [formData, setFormData] = useState({ // set the form data 
        name: '',
        email: '',
        title: '',
        team: '',
        manager: '', 
        groups: [], 
        additionalAppAccess: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleCheckboxChange = (name, value) => {
        setFormData((prevState) => {
            const currentValues = prevState[name];
            if (currentValues.includes(value)) {
                return {
                    ...prevState,
                    [name]: currentValues.filter((item) => item !== value),
                };
            } else {
                return {
                    ...prevState,
                    [name]: [...currentValues, value],
                };
            }
        });
    };
    
    const handleSubmit = () => {
        if (!formData.name || !formData.email || !formData.title || !formData.team || !formData.manager) {
            alert("Please fill out all required fields");
            return;
        }

        const confirmSubmission = window.confirm("You are about to onboard this employee. Are you sure you want to proceed?");
        if (confirmSubmission) {
            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                alert("Employee onboarded successfully");
                navigate('/home');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    };

    const groupOptions = ['Dev', 'SRE', 'Product', 'Marketing'];
    const appAccessOptions = ['Slack', 'Jira', '1password', 'Github'];

    return ( 
        <div className="onboarding-container">
            <div className="onboarding-header">
                <button className="home-button" onClick={() => navigate('/home')}>Home</button>
                <h1>Onboarding</h1>
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
            <div className="form-container">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
                
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                
                <label>Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
                
                <label>Team</label>
                <input type="text" name="team" value={formData.team} onChange={handleChange} />
                
                <label>Manager</label>
                <input type="text" name="manager" value={formData.manager} onChange={handleChange} />
        
                <div className="checkbox-container">
                    <div className="checkbox-group">
                        <h3>Groups</h3>
                        {groupOptions.map((option) => (
                            <Checkbox
                                key={option}
                                label={option}
                                isSelected={formData.groups.includes(option)}
                                onCheckboxChange={() => handleCheckboxChange('groups', option)}
                            />
                        ))}
                    </div>

                    <div className="checkbox-group">
                        <h3>Additional App Access</h3>
                        {appAccessOptions.map((option) => (
                            <Checkbox
                                key={option}
                                label={option}
                                isSelected={formData.additionalAppAccess.includes(option)}
                                onCheckboxChange={() => handleCheckboxChange('additionalAppAccess', option)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="onboarding-footer">
                <p> To onboard a new employee fill out the info above, ensure all required fields are complete. Once done press submit to finalize</p>
            </div>
        </div>
    );
}

export default Onboarding;