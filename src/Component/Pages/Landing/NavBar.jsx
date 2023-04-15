import React from 'react'
import { Link, NavLink } from 'react-router-dom';
const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow">
      <div className="container-fluid">
        <img src="../images/logo.png" alt="logo" style={{ width: "50px" }} />
        <Link to="/" className="navbar-brand fw-bold">
          PC solutions
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <NavLink to="/login" className="text-decoration-none fs-5">
              <li className="nav-item nav-link">Contact us</li>
            </NavLink>
            <NavLink to="/login" className="text-decoration-none fs-5">
              <li className="nav-item nav-link text-primary">Login</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar