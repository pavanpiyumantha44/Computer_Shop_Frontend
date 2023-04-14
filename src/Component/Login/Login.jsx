import React, { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import NavBar from "../Pages/Landing/NavBar";
import './Login.css';
const Login = () => {
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
                navigate("/dashboard/home");
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
    <div><ToastContainer position={"top-right"} autoClose={2000}/></div>
    <div className='wrapper bg-light d-flex align-items-center justify-content-center w-100'>
        <div className='login shadow'>
            <h2 className='mb-3'>Login Form</h2>
                <form onSubmit={handleSubmit} className='needs-validation'>
                    <div className='form-group was-validated mb-2'>
                        <label htmlFor='email' className='form-label'>Email Address</label>
                        <input type="email" className='form-control' onChange={e => setValues({...values,email:e.target.value})} required></input>
                        <div className='invalid-feedback'>
                            Please Enter Email
                        </div>
                    </div>
                    <div className='form-group was-validated mb-2'>
                        <label htmlFor='password' className='form-label'>Password</label>
                        <input type="password" className='form-control' onChange={e => setValues({...values,password:e.target.value})} required></input>
                        <div className='invalid-feedback'>
                            Please Enter password
                        </div>
                    </div>
                    <div className='form-group'>
                        <input type="checkbox" className='form-check-input'></input>
                        <label htmlFor='checkbox' className='form-check-label'>Remember Me</label>
                    </div>
                    <button type="submit" className='btn btn-success w-100 mt-2'>Login</button>
                </form>
        </div>
    </div>
    </>
  )
}

export default Login