import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.js'
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary text-white">
        <div className="container-fluid">
            <a className='navbar-brand d-none d-md-block text-white text-decoration-none'>Dashboard</a>
            <a className='navbar-brand d-block d-md-none text-white text-decoration-none'><i className='bi bi-justify'></i></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item rounded border">
                <a className="nav-link text-white text-decoration-none'" aria-current="page" href="#">
                    <i className='bi bi-search'></i>Search</a>
                </li>

                <li className="nav-item mx-1 rounded border">
                <a className="nav-link text-white text-decoration-none'" aria-current="page" href="#">Account</a>
                </li>
                <li className="nav-item rounded border">
                <a className="nav-link text-white text-decoration-none'" aria-current="page" href="#">Logout</a>
                </li>
                
            </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar