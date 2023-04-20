import React, { useState } from "react"
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "./Pages/Landing/NavBar";
import {ToastContainer, toast} from 'react-toastify';
import Footer from "./Pages/Landing/Footer";
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
    <Navbar/>
    <div><ToastContainer position={"top-right"} autoClose={2000}/></div>
    <div className='d-flex bg-secondary justify-content-center align-items-center vh-100'>
        <div className='bg-white p-3 rounded w-25 border shadow'>
            <h2 className='text-center'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' placeholder='Enter Email'  onChange={e => setValues({...values,email:e.target.value})} className='form-control rounded-0' name='email'/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter Password' onChange={e => setValues({...values,password:e.target.value})} className='form-control rounded-0' name='password'/>
                </div>

                <button type="submit" className='btn btn-success w-100 rounded'>Login</button>
                <input type="checkbox" name="tick"/> Remember me
                <button className='btn btn-primary mt-3 border w-100 text-decoration-none'>Create Account</button>
            </form>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Login