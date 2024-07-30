// CS361courseproject / Frontend/ src/ components / OrgChart.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/orgchart.css';

function OrgChart() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [orgChartData, setOrgChartData] = useState([
        // Sample data, replace with actual data fetching
        { manager: 'Alice', employees: ['Bob', 'Charlie', 'David'] },
        { manager: 'Eve', employees: ['Frank', 'Grace', 'Heidi'] },
    ]);

    const handleSearch = () => {
        console.log("Searching for:", searchTerm);
    };

    const handleReset = () => {
        setSearchTerm('');
    };

    return (
        <div className="orgchart-container">
            <div className="orgchart-header">
                <button className="home-button" onClick={() => navigate('/home')}>Home</button>
                <h1>Org Chart</h1>
                <button className="reset-button" onClick={handleReset}>Reset</button>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by employee email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>
            <div className="orgchart-display">
                {orgChartData.map((data, index) => (
                    <div key={index} className="manager-section">
                        <h3>Manager: {data.manager}</h3>
                        <ul>
                            {data.employees.map((employee, index) => (
                                <li key={index}>{employee}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="orgchart-footer">
                <p>Search for an employee by typing in their email. To reset your view press the reset button in the top right.</p>
            </div>
        </div>
    );
}

export default OrgChart;
