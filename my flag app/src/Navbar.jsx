// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar({ logo, moon }) {
  return (
 <div className='container-nav'>
    <nav className='navbar'>
     <p className='title'>The Flag App</p>
     <img src={logo} alt="techover-logo" />
     <div className='darkmode'>
        <img src={moon} alt="" />
        <p>Dark Mode</p>
     </div>
    </nav>
 </div>
  );
}

export default Navbar;
