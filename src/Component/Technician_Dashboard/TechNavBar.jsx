import axios from 'axios';
import React from 'react'
import { Navbar,Form,Nav,NavDropdown,Button,Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Notification from '../Dashboard/Notification/Notification';
const TechNavBar = ({name}) => {
    const handleLogout = ()=>
    {
        axios.get("http://localhost:5000/logout")
        .then(res=>{
            if(res.data.Status === "Success"){
                location.reload(true);
            }
            else{
                alert("Error");
            }
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <div>
        <Navbar bg="light" expand="lg" className="shadow">
        <Container fluid>
          <img src='../images/logo.png' alt='logo' style={{width:"50px"}}/>
          <Link to="/techdashboard/showrepairs" className='text-decoration-none text-dark fw-bold fs-3 mt-2 mx-2'>
          PC Solutions</Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to='/techdashboard/showrepairs' className='text-decoration-none text-dark mt-2 mx-2'>Available Repairs</Link>
              <Link to='/techdashboard/products' className='text-decoration-none text-dark mt-2 mx-2'>Products</Link>
            </Nav>
            <i className="bi bi-bell-fill ms-5 fs-4 mt-2 text-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false"/><Notification/>
            <div className="dropdown-center">
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" href="#">Notification 1</a></li>
                    <li><a className="dropdown-item" href="#">Notification 2</a></li>
                </ul>
            </div>
            <div className="dropdown-center ms-auto">
              <Button className="btn dropdown-toggle mx-2" data-bs-toggle="dropdown" aria-expanded="false" variant=''>
                <img src="../images/admin_icon.png" alt="" width={34} height={30} className="rounded-circle"/>
                <span className="mx-2">{name}</span>
              </Button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li onClick={handleLogout}>
                  <Link className="dropdown-item" to="/#">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default TechNavBar;