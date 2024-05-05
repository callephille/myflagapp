import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import darkarrow from './assets/arrow-left-dark.svg';
import lightarrow from './assets/arrow-left.svg';
import './CountryPage.css';

function CountryPage() {
  const { countryCode } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true); // För att hantera laddningstillstånd
  const { darkmode } = useContext(ThemeContext); // Använda darkmode från context

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
        // Simulera en laddningstid på 2 sekunder
        setTimeout(() => {
          setCountryData(country);
          setLoading(false); // Markera att laddningen är klar
        }, );// sett ms här för att se loading state tydligare
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [countryCode]);

  return (
    <div>
      {loading ? ( // Kontrollera om datan laddas fortfarande
        <div className='container'>
          <div className='img-wrapper'>
            <div className='backtohome'>
              {darkmode ? (
                <img src={lightarrow} alt="lightarrowhome" />
              ) : (
                <img src={darkarrow} alt="darkarrowhome" />
              )}
              <p>Back</p>
            </div>
            <div className='flag-img-placeholder'></div> {/* Placeholder för flaggan */}
          </div>
          <div className='body-container'>
            <div className='info-1'>
              <h1>Loading...</h1> {/* Placeholder för textinnehåll */}
            </div>
            <div className='info-2'>
              <p>Loading...</p> {/* Placeholder för textinnehåll */}
              <p>Loading...</p> {/* Placeholder för textinnehåll */}
              <p>Loading...</p> {/* Placeholder för textinnehåll */}
            </div>
            <div className='borders-container'>
              <p className='borders-title'>Borders Countries:</p>
              <div className='borders-list'>
                {/* Placeholder för länkar */}
                <div className='border-link-placeholder'></div>
                <div className='border-link-placeholder'></div>
                <div className='border-link-placeholder'></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='container'>
          <div className='img-wrapper'>
            <Link to="/">
              <div className='backtohome'>
                {darkmode ? (
                  <img src={lightarrow} alt="lightarrowhome" />
                ) : (
                  <img src={darkarrow} alt="darkarrowhome" />
                )}
                <p>Back</p>
              </div>
            </Link>
            <img className='flag-img' src={countryData.flags.png} alt={countryData.name.common} />
          </div>
          <div className='body-container'>
            <div className='info'>
              <div className='info-1'>
                <h1>{countryData.name.common}</h1>
                <p><span className="static-text">Population:</span> <span className="dynamic-content">{countryData.population}</span></p>
                <p><span className="static-text">Region:</span> <span className="dynamic-content">{countryData.region}</span></p>
                <p><span className="static-text">Capital:</span> <span className="dynamic-content">{countryData.capital}</span></p>
                <p><span className="static-text">Native Name:</span> <span className="dynamic-content">{countryData.name.nativeName[Object.keys(countryData.name.nativeName)[0]].common}</span></p>
              </div>
              <div className='info-2'>
                <p><span className="static-text">Top Level Domain:</span> <span className="dynamic-content">{countryData.tld[Object.keys(countryData.tld)[0]]}</span></p>
                <p><span className="static-text">Currency:</span> <span className="dynamic-content">{Object.keys(countryData.currencies)[0]}</span></p>
                <p><span className="static-text">Languages:</span> <span className="dynamic-content">{Object.values(countryData.languages).join(', ')}</span></p>
              </div>

              <div className='borders-container'>
                <p className='borders-title'>Borders Countries:</p>
                <div className='borders-list'>
                  {countryData.borders.map((border, index) => {
                    const selectedCountry = allCountries.find(country => country.cca3 === border);
                    const newUrl = selectedCountry ? `/country/${selectedCountry.cca2}` : `/country/${border}`;
                    return (
                      <React.Fragment key={border}>
                        <Link to={newUrl} className='border-link'>
                          {selectedCountry ? selectedCountry.name.common : border}
                        </Link>
                        {index < countryData.borders.length - 1 && ''}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryPage;
