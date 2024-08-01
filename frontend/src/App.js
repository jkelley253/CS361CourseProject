// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Onboarding from './components/Onboarding';
import Offboarding from './components/Offboarding';
import EmployeeMaintenance from './components/EmployeeMaintenance';
import AppMaintenance from './components/AppMaintenance';
import OrgChart from './components/OrgChart';
import './assets/style.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/offboarding" element={<Offboarding />} />
        <Route path="/employee-maintenance" element={<EmployeeMaintenance />} />
        <Route path="/app-maintenance" element={<AppMaintenance />} />
        <Route path="/org-chart" element={<OrgChart />} />
      </Routes>
    </Router>
  );
};

export default App;
