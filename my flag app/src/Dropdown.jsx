import React, { useState } from 'react';
import './Dropdown.css';

const Dropdown = ({ onRegionChange, onSearchChange }) => {
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleChange = event => {
    const region = event.target.value;
    setSelectedRegion(region);
    onRegionChange(region); // Pass the selected region to the parent component
  };

 
  const handleSearch = event => {
    const searchTerm = event.target.value;
    onSearchChange(searchTerm); // Pass the search term to the parent component
  };

  return (
    <div className="input-container">    
      <input
        className="search"
        placeholder="Search for a Country..."
        onChange={handleSearch} // Call handleSearch on input change
      />
      <select
        id="regions"
        className="regions"
        value={selectedRegion}
        onChange={handleChange}
      >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
      </select>
      
    </div>
  );
};

export default Dropdown;




