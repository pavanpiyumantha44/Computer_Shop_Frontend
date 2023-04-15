import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import LineChart from '../Dashboard/Charts/LineChart';
import PieChart from '../Dashboard/Charts/PieChart';
import PulseLoader from "react-spinners/PulseLoader";
import axios from 'axios';

const Home = () => {

  const [cusCount,setCusCount] = useState(0);
  const [brandCount,setBrandCount] = useState(0);
  const[loading,setLoading] = useState(true);

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
          <div className='px-3 pt-2 border shoadow-sm w-25'>
            <h4 className='text-center pb-1 text-primary'>Customer</h4>
            <hr/>
            <h2 className='text-center'>{cusCount}</h2>
          </div>
          <div className='px-3 pt-2 border shoadow-sm w-25'>
          <h4 className='text-center pb-1 text-success'>Brands</h4>
            <hr/>
            <h2 className='text-center'>{brandCount}</h2>
          </div>
          <div className='px-3 pt-2 border shoadow-sm w-25'>
            <h4 className='text-center pb-1 text-danger'>Orders</h4>
            <hr/>
            <p>Total: {}</p>
          </div>
        </div>
        
        <div className='row mt-4 px-5 pt-3'>
          <div className='col-12 col-md-8 p-3'>
            <LineChart/>
          </div>
          <div className='col-12 col-md-4 p-3'>
            <PieChart/>
          </div>
        </div>
        {/* List of users */}
        <div className='mt-4 px-5 pt-3'>
        {/* <Customer/> */}
          {/* <div className='card'>
          <div className='card-header'>  
          <h3>List of customers</h3>
          </div>
          
          <div className='card-body'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>NIC</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Tommy</td>
                <td>234234531</td>
                <td>12345567</td>
                <td>
                  <Link to="#" className='btn btn-primary mx-2'>Edit</Link>
                  <Link to="#" className='btn btn-danger'>Delete</Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tommy</td>
                <td>234234531</td>
                <td>12345567</td>
                <td>
                  <Link to="#" className='btn btn-primary mx-2'>Edit</Link>
                  <Link to="#" className='btn btn-danger'>Delete</Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tommy</td>
                <td>234234531</td>
                <td>12345567</td>
                <td>
                  <Link to="#" className='btn btn-primary mx-2'>Edit</Link>
                  <Link to="#" className='btn btn-danger'>Delete</Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tommy</td>
                <td>234234531</td>
                <td>12345567</td>
                <td>
                  <Link to="#" className='btn btn-primary mx-2'>Edit</Link>
                  <Link to="#" className='btn btn-danger'>Delete</Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tommy</td>
                <td>234234531</td>
                <td>12345567</td>
                <td>
                  <Link to="#" className='btn btn-primary mx-2'>Edit</Link>
                  <Link to="#" className='btn btn-danger'>Delete</Link>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          </div> */}
        </div>
    </div>
    }
    </>
  )
}

export default Home