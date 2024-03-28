import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes
import Navbar from './Navbar';
import HomePage from './HomePage';
import CountryPage from './CountryPage';
import logo from './assets/techover-logo-dark.png';
import moon from './assets/moon-bordered.svg';
function App() {
  return (
    <Router>
      <div>
        <Navbar logo={logo}  moon={moon} />
        <Routes> {/* Use Routes instead of Route */}
          <Route path="/" element={<HomePage />} /> {/* Use element prop to specify component */}
          <Route path="/country/:countryCode" element={<CountryPage />} /> {/* Use element prop to specify component */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
