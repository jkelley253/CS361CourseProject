// cs361courseproject / frontend / src / components / Navbar.js

import React from 'react'; // import react module from react library
import { NavLink, useNavigate } from 'react-router-dom'; // import NavLink module from react-router-dom library
import '../assets/styles/navbar.css'; // import style.css file from assets/styles folder

function Navbar() {
    const navigate = useNavigate(); // Use navigate function from react-router-dom

    const handleLogout = () => {
        navigate('/login'); // Navigate to login page
    };

    return ( 
        <nav className="navbar"> 
            <div className="nav-links">
                <NavLink to="/onboarding" className="nav-link" activeClassName="active-link">Onboarding</NavLink>
                <NavLink to="/offboarding" className="nav-link" activeClassName="active-link">Off-Boarding</NavLink>
                <NavLink to="/appEmployeeMaintenance" className="nav-link" activeClassName="active-link">App/Employee Maintenance</NavLink>
                <NavLink to="/org-chart" className="nav-link" activeClassName="active-link">Org Chart</NavLink>
            </div>
            <div className="nav-right">
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;