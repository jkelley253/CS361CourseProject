// cs361courseproject / frontend/ src /App.js

import React from 'react'; // import react module from react library 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // import BrowserRouter, Route, and routes modules from react-router-dom library 
import Home from './components/Home'; // import Home component from Home.js file 
import Login from './components/Login'; // import Login component from Login.js file
import Onboarding from './components/Onboarding'; // import Onboarding component from Onboarding.js file

function App() { // define App component 
  console.log("app component rendered"); // log message to console
  return ( // return the following content 
    <Router> {/* Router component to provide routing functionality */}
      <Routes> {/* Routes component to define routes for different components */}
      <Route path="/" element={<Login />} /> {/* Route to Login component */}
      <Route path="/login" element={<Login />} /> {/* Route to Login component */}
      <Route path="/home" element={<Home />} /> {/* Route to Home component */}
      <Route path="/onboarding" element={<Onboarding />} /> {/* Route to Onboarding component */}
        {/* Add routes for other components like Onboarding, Offboarding, etc. */}
      </Routes> {/* End of Routes component */}
    </Router> // End of Router component
  );
}

export default App; // export App component to be used in other files 
