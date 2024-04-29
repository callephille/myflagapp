import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import Dropdown from './Dropdown';

function HomePage() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data); // Initialize filteredCountries with all countries
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRegionChange = region => {
    if (region === '') {
      setFilteredCountries(countries); // Reset filter
    } else {
      const filtered = countries.filter(country => country.region === region);
      setFilteredCountries(filtered);
    }
  };

  const handleSearchChange = searchTerm => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  };


  return (
    <div className={`homepage-container ${darkMode ? 'dark' : ''}`}>
      <Dropdown onRegionChange={handleRegionChange} onSearchChange={handleSearchChange} />
      <div className="country-list">
        {filteredCountries.map(country => (
          <div key={country.cca2} className="country-item">
            <Link to={`/country/${country.cca2}`}>
              <img src={country.flags.png} alt={country.name.common} className="country-flag" />
              <div className="country-details">
                <h3>{country.name.common}</h3>
                <p>Population: {country.population}</p>
                <p>Region: {country.region}</p>
                <p>Capital: {country.capital}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;








