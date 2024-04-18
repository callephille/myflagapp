// CountryPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import darkarrow from './assets/arrow-left-dark.svg';
import './CountryPage.css';

function CountryPage() {
  const { countryCode } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [allCountries, setAllCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('All countries:', data);
        setAllCountries(data);
        const country = data.find(country => country.cca2 === countryCode);
        console.log('Country:', country);
        setCountryData(country);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [countryCode]);

  return (
    <div className='body-container'>
      {countryData ? (
        <div> 
          <div className='img-wrapper'>
          <Link to="/"><div className='backtohome'><img src={darkarrow} alt="backtohome" /><p>Back</p> </div> </Link>
              <img src={countryData.flags.png} alt={countryData.name.common} />
          </div>
          <div>  
            <h2>{countryData.name.common}</h2>
            <p>Population: {countryData.population}</p>
            <p>Region: {countryData.region}</p>
            <p>Capital: {countryData.capital}</p>
            <p>Native Name: {countryData.name.nativeName[Object.keys(countryData.name.nativeName)[0]].common}</p>
            <p>Top Level Domain: {countryData.tld[Object.keys(countryData.tld)[0]]}</p>
            <p>Currency: {Object.keys(countryData.currencies)[0]}</p>
            <p>Languages: {Object.values(countryData.languages).join(', ')}</p>
          </div> 
          <div>
          <p>Borders:</p>
          <div>
              {countryData.borders.map((border, index) => {
                const selectedCountry = allCountries.find(country => country.cca3 === border);
                const newUrl = selectedCountry ? `/country/${selectedCountry.cca2}` : `/country/${border}`;
                return (
                  <React.Fragment key={border}>
                    <Link to={newUrl}>
                      {selectedCountry ? selectedCountry.name.common : border}
                    </Link>
                    {index < countryData.borders.length - 1 && ', '}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CountryPage;
