import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import './HomePage.css';
import Dropdown from './Dropdown';

function HomePage() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
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
      {loading ? (
        <div className="country-list">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="country-item-placeholder">
              <div className="country-flag-placeholder"></div>
              <div className="country-details-placeholder">
                <h3>Loading...</h3>
                <p>Loading...</p>
                <p>Loading...</p>
                <p>Loading...</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default HomePage;









