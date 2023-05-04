import React, { useState } from 'react'
import './login2.css';
import NavBar from '../Pages/Landing/NavBar';
import Footer from '../Pages/Landing/Footer';
import { Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';
const Login2 = () => {
    const [values,setValues] = useState({
        email:'',
        password:''
    }); 

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/login',values)
        .then(res=>{
            if(res.data.Status === "Success"){
                if(res.data.Result[0].role==1)
                {
                    navigate("/cashierDashboard/billing");
                }
                else if(res.data.Result[0].role==2){
                    navigate("/techdashboard/showrepairs");
                }
                else{ 
                navigate("/dashboard/home");
                }
            }else{
                //alert(res.data.Message);
                toast.error("Please check username and password");
            }
        })
        .catch(err=>{
            console.log(err)
        });
    }
  return (
    <>
    <NavBar/>
    <div><ToastContainer position={"top-center"} autoClose={2000}/></div>
        <div className="content">
            <div className="container">
            <div className="row">
                <div className="col-md-6">
                <img src="../images/loginbg.svg" alt="Image" className="img-fluid bg-img mb-4"/>
                </div>
                <div className="col-md-6 contents">
                <div className="row justify-content-center">
                    <div className="col-md-8 login w-75 shadow">
                        <div className="mb-4">
                            <h3>Log In</h3>
                            {/* <p className="mb-4 text-center text-secondary">Start Your Day !!</p> */}
                        </div>
                        <Form onSubmit={handleSubmit}>
                        <div className="form-group first mb-3">
                            <Form.Label for="username">Username</Form.Label>
                            <Form.Control type="text" id="username" onChange={e => setValues({...values,email:e.target.value})} required/>

                        </div>
                        <div className="form-group last mb-4">
                            <Form.Label for="password">Password</Form.Label>
                            <Form.Control type="password" className="form-control" id="password"  onChange={e => setValues({...values,password:e.target.value})} required/>
                            
                        </div>
                        <Form.Control type="submit" value="Log In" className="btn btn-block mb-3" style={{background:"#847dff",color:"#fff"}}/>
                        
                        <div className="d-flex mb-5 align-items-center">
                            <span className="ml-auto"><Link to="#" className="forgot-pass text-primary">Forgot Password ?</Link></span> 
                        </div>
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

export default Login2