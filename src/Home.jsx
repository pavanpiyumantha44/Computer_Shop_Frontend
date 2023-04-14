import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Home = () => {
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

        })
    },[]);

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
    <div className='constainer mt-4'>
        {
            auth ?
            <div>
               <h3>You are Athorized {name}</h3>
               <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
            :
            <div>
                <h3>{message}</h3>
                <Link to="/login" className='btn btn-primary'>Login now</Link>
            </div>
        }
    </div>
  )
}

export default Home