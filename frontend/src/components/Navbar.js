// cs361courseproject / frontend / src / components / Navbar.js

import React from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom'; 
import '../assets/styles/navbar.css'; 

function Navbar() {
    const navigate = useNavigate(); 

    const handleLogout = () => {
        navigate('/login'); 
    };

    return ( 
        <nav className="navbar"> 
            <div className="nav-links">
                <NavLink to="/onboarding" className="nav-link" activeClassName="active-link">Onboarding</NavLink>
                <NavLink to="/offboarding" className="nav-link" activeClassName="active-link">Off-Boarding</NavLink>
                <NavLink to="/appEmployeeMaintenance" className="nav-link" activeClassName="active-link">App/Employee Maintenance</NavLink>
                <NavLink to="/orgChart" className="nav-link" activeClassName="active-link">Org Chart</NavLink>
            </div>
            <div className="nav-right">
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;