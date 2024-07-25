// cs361courseproject / frontend / src / components / Navbar.js

import React from 'react'; // import react module from react library
import { NavLink } from 'react-router-dom'; // import NavLink module from react-router-dom library
import '../assets/styles/style.css'; // import style.css file from assets/styles folder

function Navbar() { // define Navbar component 
    return ( 
        <nav className="navbar"> 
            <div className="nav-links">
                <NavLink to="/onboarding" className="nav-link" activeClassName="active-link">Onboarding</NavLink>
                <NavLink to="/offboarding" className="nav-link" activeClassName="active-link">Off-Boarding</NavLink>
                <NavLink to="/app-employee-maintenance" className="nav-link" activeClassName="active-link">App/Employee Maintenance</NavLink>
                <NavLink to="/org-chart" className="nav-link" activeClassName="active-link">Org Chart</NavLink>
            </div>
            <div className="nav-right">
                <button className="logout-button">Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;