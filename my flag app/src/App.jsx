import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import HomePage from './HomePage';
import CountryPage from './CountryPage';
import logo from './assets/techover-logo-dark.png';
import moon from './assets/moon-bordered.svg';
import { ThemeProvider } from './ThemeContext'; // Importera ThemeProvider från ThemeContext.jsx

function App() {
  return (
    <ThemeProvider> {/* Omslut ditt applikationsträd med ThemeProvider */}
      <Router>
        <div className="app-container">
          <Navbar logo={logo}  moon={moon} />       
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/country/:countryCode" element={<CountryPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
