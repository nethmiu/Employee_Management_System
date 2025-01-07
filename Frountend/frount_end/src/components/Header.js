import React from "react";
import { Link } from "react-router-dom"; 

function Header() {
  const navStyle = {
    backgroundColor: "#00ACC1", 
    color: "#121212", 
    fontFamily: "Montserrat, sans-serif" 
  };

  return (
    <nav className="navbar navbar-expand-lg" style={navStyle}>
      <Link className="navbar-brand" to="/" style={navStyle}>
       
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/home" style={navStyle}>
              Home <span className="sr-only"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home" style={navStyle}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home" style={navStyle}>
              Leaves
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home" style={navStyle}>
              Attendance
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/home" style={navStyle}>
              Employees
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
