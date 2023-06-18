import React from 'react'
import './Contactus.css';
import NavBar from '../Landing/NavBar';
import Footer from '../Landing/Footer';
import { Form,Button } from 'react-bootstrap';
import { ToastContainer,toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ContactUs = () => {
  
  const handleSubmit= ()=>{

  }
  return (
    <>
    <NavBar/>
    <div><ToastContainer position={"top-center"} autoClose={2000}/></div>
        <div className="content">
            <div className="container">
            <div className="row">
                <div className="col-md-6">
                  <img src="../images/contactus.svg" alt="Image" className="img-fluid bg-img mb-4"/>
                </div>
                <div className="col-md-6 contents">
                <div className="row justify-content-center">
                    <div className="col-md-8 login w-100 shadow">
                        <div className="mb-4">
                            <h3>Contact us</h3>
                            {/* <p className="mb-4 text-center text-secondary">Start Your Day !!</p> */}
                        </div>
                        <Form onSubmit={handleSubmit}>
                        <div className="form-group first mb-3">
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control type="text" id="name" onChange={e => setValues({...values,email:e.target.value})} required/>

                        </div>
                        <div className="form-group last mb-4">
                            <Form.Label htmlFor="password">Email</Form.Label>
                            <Form.Control type="email" className="form-control" id="password"  onChange={e => setValues({...values,password:e.target.value})} required/>
                            
                        </div>
                        <div className="form-group last mb-4">
                            <Form.Label htmlFor="password">Subject</Form.Label>
                            <Form.Control type="email" className="form-control" id="password"  onChange={e => setValues({...values,password:e.target.value})} required/>
                            
                        </div>
                        <div className="form-group last mb-4">
                            <Form.Label htmlFor="password">Message</Form.Label>
                            <Form.Control as="textarea" rows={3} className="form-control" id="password"  onChange={e => setValues({...values,password:e.target.value})} required/>
                            
                        </div>
                        <Form.Control type="submit" value="Send Message" className="btn btn-block mb-3" style={{background:"#000000",color:"#fff"}}/>
                        </Form>
                    </div>
                </div>
                
                </div>
                
            </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default ContactUs