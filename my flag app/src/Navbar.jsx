
// Navbar.js
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import './Navbar.css';
import darkMoonIcon from "./assets/moon-bordered.svg";
import lightMoonIcon from './assets/moon.svg';
import logosvart from './assets/techover-logo-dark.png';
import logovit from './assets/techover-logo.png';

function Navbar() {
  const { darkmode, toggleDarkMode } = useContext(ThemeContext);

  return (
   <div className={`container-nav ${darkmode ? 'dark' : ''}`}>
     <nav className='navbar'>
       <p className='title'>The Flag App</p>
       <img src={darkmode ? logovit : logosvart} alt="techover-logo" />
       <div className='darkmode' onClick={toggleDarkMode}>
         <img src={darkmode ? lightMoonIcon : darkMoonIcon} alt="Dark mode toggle" />
         <p>{darkmode ? 'Light Mode' : 'Dark Mode'}</p>
       </div>
     </nav>
   </div>
 );
}

export default Navbar;