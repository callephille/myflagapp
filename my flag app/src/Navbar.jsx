// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar({ logo }) {
  return (
 <div>
    <p className='title'>The Flag App</p>
    <img src={logo} alt="" />
    <div>
        <img src="" alt="" />
        <p>Darkmode</p>
    </div>
 </div>
  );
}

export default Navbar;
