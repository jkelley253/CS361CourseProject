// frontend/src/components/OrgChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/style.css';

const OrgChart = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
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

    const buildHierarchy = (employees) => {
        const hierarchy = {};
        employees.forEach(employee => {
            switch(employee.title.toLowerCase()) {
                case 'ceo':
                    hierarchy.ceo = employee;
                    hierarchy.directors = [];
                    break;
                case 'dev director':
                case 'product director':
                case 'sre director':
                case 'marketing director':
                    if (!hierarchy.directors) hierarchy.directors = [];
                    hierarchy.directors.push({ ...employee, managers: [] });
                    break;
                case 'dev manager':
                case 'product manager':
                case 'sre manager':
                case 'marketing manager':
                    const director = hierarchy.directors.find(d => d.title.toLowerCase().includes(employee.title.split(' ')[0].toLowerCase()));
                    if (director) director.managers.push({ ...employee, employees: [] });
                    break;
                default:
                    const manager = hierarchy.directors.flatMap(d => d.managers).find(m => m.title.toLowerCase().includes(employee.title.split(' ')[0].toLowerCase()));
                    if (manager) manager.employees.push(employee);
                    break;
            }
        });
        return hierarchy;
    };

    const renderHierarchy = (hierarchy) => {
        if (!hierarchy.ceo) return null;
        return (
            <div className="org-chart">
                <div className="org-node">
                    <strong onClick={() => handleEmployeeClick(hierarchy.ceo)}>
                        {hierarchy.ceo.firstName} {hierarchy.ceo.lastName} - {hierarchy.ceo.title}
                    </strong>
                    {hierarchy.directors && (
                        <div className="org-children">
                            {hierarchy.directors.map(director => (
                                <div key={director.email} className="org-node">
                                    <strong onClick={() => handleEmployeeClick(director)}>
                                        {director.firstName} {director.lastName} - {director.title}
                                    </strong>
                                    {director.managers && (
                                        <div className="org-children">
                                            {director.managers.map(manager => (
                                                <div key={manager.email} className="org-node">
                                                    <strong onClick={() => handleEmployeeClick(manager)}>
                                                        {manager.firstName} {manager.lastName} - {manager.title}
                                                    </strong>
                                                    {manager.employees && (
                                                        <div className="org-children">
                                                            {manager.employees.map(emp => (
                                                                <div key={emp.email} className="org-node">
                                                                    <span onClick={() => handleEmployeeClick(emp)}>
                                                                        {emp.firstName} {emp.lastName} - {emp.title}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const handleEmployeeClick = (employee) => {
        setSelectedEmployee(employee);
    };

    const handleReset = () => {
        setSelectedEmployee(null);
    };

    const hierarchy = buildHierarchy(employees);

    return (
        <div>
            <h2>Org Chart - Active Employees</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {selectedEmployee ? (
                <div className="employee-details">
                    <h3>Employee Details</h3>
                    <p><strong>Name:</strong> {selectedEmployee.firstName} {selectedEmployee.lastName}</p>
                    <p><strong>Email:</strong> {selectedEmployee.email}</p>
                    <p><strong>Team:</strong> {selectedEmployee.team}</p>
                    <p><strong>Manager:</strong> {selectedEmployee.manager}</p>
                    <p><strong>Status:</strong> {selectedEmployee.status}</p>
                    <p><strong>Groups:</strong> {selectedEmployee.groups.join(', ')}</p>
                    <p><strong>Apps:</strong> {selectedEmployee.apps.join(', ')}</p>
                </div>
            ) : (
                renderHierarchy(hierarchy)
            )}
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default OrgChart;
