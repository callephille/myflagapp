import Navbar from "./Navbar";
import logo from './assets/techover-logo-dark.png';
import moon from './assets/moon-bordered.svg';
import { Outlet } from "react-router-dom";

function RootElement() {
    return (
        <div className="app-container">
          <Navbar logo={logo}  moon={moon} />       
          <main>
            <Outlet/>
          </main>
        </div>
    )

}

export default RootElement;