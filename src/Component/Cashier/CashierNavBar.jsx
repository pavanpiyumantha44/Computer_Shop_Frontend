import axios from 'axios';
import React from 'react'
import { Navbar,Form,Nav,NavDropdown,Button,Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CashierNavBar = ({name}) => {
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
          <Link to="/cashierDashboard/billing" className='text-decoration-none text-dark fw-bold fs-3 mt-2 mx-2'>
          PC Solutions</Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to='/cashierDashboard/billing' className='text-decoration-none text-dark mt-2 mx-2'>Billing</Link>
              <Link to='/cashierDashboard/products' className='text-decoration-none text-dark mt-2 mx-2'>Products</Link>
              <Link to='/cashierDashboard/billing' className='text-decoration-none text-dark mt-2 mx-2'>Billing</Link>
              <Link to='/cashierDashboard/products' className='text-decoration-none text-dark mt-2 mx-2'>Products</Link>
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link> */}
            </Nav>
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

export default CashierNavBar