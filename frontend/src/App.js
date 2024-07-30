// cs361courseproject / frontend/ src /App.js

import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './components/Home';  
import Login from './components/Login'; 
import Onboarding from './components/Onboarding'; 
import Offboarding from './components/Offboarding'; 
import AppEmployeeMaintenance from './components/AppEmployeeMaintenance';
import OrgChart from './components/OrgChart';

function App() { 
  console.log("app component rendered"); 
  return ( 
    <Router> 
      <Routes> 
      <Route path="/" element={<Login />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/home" element={<Home />} /> 
      <Route path="/onboarding" element={<Onboarding />} /> 
      <Route path="/offboarding" element={<Offboarding />} /> 
      <Route path="/appEmployeeMaintenance" element={<AppEmployeeMaintenance />} /> 
      <Route path="/orgChart" element={<OrgChart />} />
      </Routes> 
    </Router> 
  );
}

export default App; 
