import React, { useState, useContext } from 'react';
import { Link, useLoaderData, useNavigation } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import './HomePage.css';
import Dropdown from './Dropdown';

function HomePage() {
  const { state } = useNavigation();
  const { darkMode } = useContext(ThemeContext);
  const countries = useLoaderData(); // This should be an array

  const [filteredCountries, setFilteredCountries] = useState(countries);

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

  const sortedCountries = filteredCountries.sort((a, b) => {
    if (a.name.common < b.name.common) return -1;
    if (a.name.common > b.name.common) return 1;
    return 0;
  });

  return (
    <div className={`homepage-container ${darkMode ? 'dark' : ''}`}>
      <>
        <Dropdown onRegionChange={handleRegionChange} onSearchChange={handleSearchChange} />
        <div className="country-list">
          {sortedCountries.map(country => (
              <Link to={`/country/${country.cca3}`} key={country.cca3} className="country-item">
                <img src={country.flags.png} alt={country.name.common} className="country-flag" />
                <div className="country-details">
                  <h3>{state === 'loading' ? 'Loading...' : country.name.common}</h3>
                  <p>Population: {state === 'loading' ? 'Loading...' : country.population}</p>
                  <p>Region: {state === 'loading' ? 'Loading...' : country.region}</p>
                  <p>Capital: {state === 'loading' ? 'Loading...' : country.capital}</p>
                </div>
              </Link>
          ))}
        </div>
      </>
    </div>
  );
}

export default HomePage;

export const allCountryLoader = async() => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}










