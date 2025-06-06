import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Diabetes Manager
          </Link>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home 🏠
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logdose">
                  Log dose
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dosehistory">
                  Dose History
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/foodsearch">
                  foodsearch
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/InsulinCalc">
                  Insulin Calc
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Report">
                  Reports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Settings">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

// home,log, dose, foodSearch, insulin Calc, reports, settings
