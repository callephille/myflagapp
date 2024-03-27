// CountryPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CountryPage() {
  const { countryCode } = useParams();
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const country = data.find(country => country.cca2 === countryCode);
        setCountryData(country);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [countryCode]);

  return (
    <div>
      {countryData ? (
        <div>
          <h2>{countryData.name.common}</h2>
          <img src={countryData.flags.png} alt={countryData.name.common} />
          <p>Capital: {countryData.capital}</p>
          {/* Add more information as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CountryPage;

