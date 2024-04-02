import React from "react";
import './Dropdown.css';

const Dropdown = () => {
  return (
    <div className="input-container">    
      <input className="search" placeholder='Search for a Country...' />
      <select id="regions" className="regions" defaultValue="">
        <option value=""  disabled>Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
      </select>
    </div>
  );
}

export default Dropdown;

