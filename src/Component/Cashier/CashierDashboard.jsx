import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';
import CashierNavBar from './CashierNavBar';
const CashierDashboard = () => {
  const [auth,setAuth] = useState(false);
  const [name,setName] = useState('');
  const [message,setMessage] = useState();
  axios.defaults.withCredentials = true;
  
  useEffect(()=>{
    axios.get('http://localhost:5000')
    .then(res=>{
        if(res.data.Status === "Success"){
            setAuth(true);
            setName(res.data.name);
        }
        else{
            setAuth(false);
            setMessage(res.data.Message)
        }
    })
    .catch(err =>{
        console.log(err);
    })
  },[])
  return (
    <>
    {auth ?
      <div>
      <CashierNavBar name={name}/>
      <Outlet/>
      </div>
      :
      <div className='d-flex justify-content-center mt-5'>
            <div className='card'>
            <div className='card-header'>
                <h1 className='text-danger'>You must loggedin first</h1>
            </div>
            <div className='card-body d-flex justify-content-center'>
                <Link to='/login' className='btn btn-primary'>Login</Link>
            </div>
            </div>
        </div>
    }
    </>
  );
}

export default CashierDashboard