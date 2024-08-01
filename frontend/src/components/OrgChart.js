// frontend/src/components/OrgChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';

const OrgChart = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:5070/api/users/orgchart/active');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching active employees', error);
                setError('Error fetching employee data.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    return (
        <div>
            <h2>Org Chart - Active Employees</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {employees.map(employee => (
                    <li key={employee._id}>
                        <strong>Name: {employee.firstName} {employee.lastName}</strong><br />
                        <span>Email: {employee.email}</span><br />
                        <span>Title: {employee.title}</span><br />
                        <span>Team: {employee.team}</span><br />
                        <span>Manager: {employee.manager}</span><br />
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
};

export default OrgChart;
