import React from 'react'
import { Link,NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        {/* <i className='bi bi-display px-2'></i> */}
        <img src='../images/logo.png' alt='logo' style={{width:"50px"}}/>
        <Link to='/' className="navbar-brand" href="#">PC solutions</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavLink to='/login'>
                <li className="nav-item nav-link">Login</li>
            </NavLink>
            </ul>
        </div>
        </div>
    </nav>
  )
}

export default Navbar