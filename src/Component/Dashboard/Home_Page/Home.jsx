import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import LineChart from '../Charts/LineChart';
import PieChart from '../Charts/PieChart';
import StatusCard from './StatusCard';
import PulseLoader from "react-spinners/PulseLoader";
import axios from 'axios';
import './style.css';
const Home = () => {

  const [cusCount,setCusCount] = useState(0);
  const [brandCount,setBrandCount] = useState(0);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/home/getCusCount')
    .then(res=>{
      console.log(res);
      setLoading(false);
      if(res.data.Status === "Success")
      {
        setCusCount(res.data.Result[0].count);
      }
    })
    .catch(err=>{
      console.log(err);
    })
    axios.get('http://localhost:5000/dashboard/home/getBrandCount')
    .then(res=>{
      console.log(res);
      if(res.data.Status === "Success")
      {
        setBrandCount(res.data.Result[0].brand);
      }
    })
    .catch(err=>{
      console.log(err);
    })
  },[])

  return (
    <>
    {loading?
      <div className='alignment'>
      <PulseLoader color={'#1444e0'} loading={loading} size={15}/>
      </div>  
      :
    <div>
        <div className='p-3 d-flex justify-content-around mt-3'>    
          <StatusCard count={cusCount} type={"Customers"} icon={<i className='bi bi-people fs-1 text-primary'></i>}/>
          <StatusCard count={brandCount} type={"Products"} icon={<i className='bi bi-cart3 fs-1 text-success'></i>}/>
          <StatusCard count={3} type={"Orders"} icon={<i class="bi bi-card-checklist text-danger fs-1"></i>}/>
        </div>        
        <div className='row mt-4 px-5 pt-3'>
          <div className='col-12 col-md-8 p-3'>
            <LineChart/>
          </div>
          <div className='col-12 col-md-4 p-3'>
            <PieChart/>
          </div>
        </div>
    </div>
    }
    </>
  )
}

export default Home