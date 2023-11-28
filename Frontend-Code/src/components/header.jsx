import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  return (
    <>
      {/* Custom CSS */}
      <style>
        {`
          body {
            padding-top: 56px; /* Adjust based on navbar height */
          }
          .big-title {
            font-size: 1.5rem; /* Adjust the font size as needed */
            font-weight: bold;
          }
        `}
      </style>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          {/* Big Title */}
          <Link className="navbar-brand big-title" to="/">
            Expo Health Care
          </Link>

          {/* Login and Registration Options */}
          <div className="d-flex">
            <Link className="nav-link text-white" to="/login">
              Login / 
            </Link>

            <Link className="nav-link text-white" to="/register">
              Register
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
