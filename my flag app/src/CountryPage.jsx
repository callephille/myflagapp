import React, { useEffect, useContext, useState } from 'react';
import { useParams, Link, useLoaderData, useNavigation } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import darkarrow from './assets/arrow-left-dark.svg';
import lightarrow from './assets/arrow-left.svg';
import './CountryPage.css';

function CountryPage() {
  const { state } = useNavigation();
  const { darkmode } = useContext(ThemeContext);
  const countryData = useLoaderData();


  return (
    <div className="container">
      <div className="img-wrapper">
        <Link to="/">
          <div className="backtohome">
            {darkmode ? (
              <img src={lightarrow} alt="lightarrowhome" />
            ) : (
              <img src={darkarrow} alt="darkarrowhome" />
            )}
            <p>Back</p>
          </div>
        </Link>
        {state === 'loading' ? (
          <div className="flag-img-placeholder"></div>
        ) : (
          <img className="flag-img" src={countryData.flags?.png} alt={countryData.name?.common} />
        )}
      </div>
      <div className="body-container">
        <div className="info">
          <div className="info-1">
            <h1>{state === 'loading' ? 'Loading...' : countryData.name?.common}</h1>
            <p><span className="static-text">Population:</span> <span className="dynamic-content">{state === 'loading' ? 'Loading...' : countryData.population}</span></p>
            <p><span className="static-text">Region:</span> <span className="dynamic-content">{state === 'loading' ? 'Loading...' : countryData.region}</span></p>
            <p><span className="static-text">Capital:</span> <span className="dynamic-content">{state === 'loading' ? 'Loading...' : countryData.capital}</span></p>
            <p><span className="static-text">Native Name:</span> <span className="dynamic-content">
              {state === 'loading' ? 'Loading...' : (countryData.name?.nativeName ? countryData.name.nativeName[Object.keys(countryData.name.nativeName)[0]]?.common : '')}
            </span></p>
          </div>
          <div className="info-2">
            <p><span className="static-text">Top Level Domain:</span> <span className="dynamic-content">{state === 'loading' ? 'Loading...' : countryData.tld?.[0]}</span></p>
            <p><span className="static-text">Currency:</span><span className="dynamic-content">{state === 'loading' ? 'Loading...' : (countryData.currencies ? Object.keys(countryData.currencies)[0] : 'No currency data available')}</span></p>
            <p><span className="static-text">Languages:</span> <span className="dynamic-content">{state === 'loading' ? 'Loading...' : (countryData.languages ? Object.values(countryData.languages).join(', ') : 'No language data available')}</span></p>
          </div>

          <div className="borders-container">
            <p className="borders-title">Borders Countries:</p>
            <div className="borders-list">
              {state === 'loading' ? (
                <div className="border-link-placeholder"></div>
              ) : (
                countryData.borders && countryData.borders.map((border, index) => {
                const selectedCountry = Array.isArray(countryData) && countryData.find(c => c.cca3 === border); 
                const countryName = selectedCountry ? selectedCountry.name.common : border;
                return (
                  <React.Fragment key={border}>
                    <Link to={`/country/${border}`} className="border-link">
                      {countryName}
                    </Link>
                    {index < countryData.borders.length - 1 && ''}
                  </React.Fragment>
                );
                })  
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryPage;

export const countryDetailLoader = async ({ params }) => {
  const { countryCode } = params;
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
  if (!res.ok) {
    throw new Error('Could not find that countryData');
  }
  const data = await res.json();
  console.log(data)
  return data[0];
};
