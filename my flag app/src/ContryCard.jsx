// CountryCard.js
import React from 'react';

function CountryCard({ country }) {
  return (
    <div className="card">
      <img src={country.flags.png} alt={country.name.common} />
      <h3>{country.name.common}</h3>
      <p>Capital: {country.capital}</p>
      <p>Region: {country.region}</p>
      {/* Add more information as needed */}
    </div>
  );
}

export default CountryCard;