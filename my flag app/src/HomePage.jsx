// HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Featured Countries</h2>
      <div className="country-list">
        {countries.map(country => (
          <div key={country.cca2}>
            <Link to={`/country/${country.cca2}`}>{country.name.common}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;


