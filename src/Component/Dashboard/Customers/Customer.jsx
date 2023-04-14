import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";
const Customer = () => {
  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const [display,setDisplay] = useState(false);

  useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/customer')
    .then(res=>{
      console.log(res);
      setData(res.data.Result)
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
    })
  },[display])
  const handleDelete = (id)=>{
    axios.delete('http://localhost:5000/dashboard/customer/delete/'+id)
    .then(res=>{
      console.log(res);
      if(res.data.Status === "Success")
      {
        toast.success("Deleted!!");
        setDisplay(true);
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <div>
      <ToastContainer
        position='top-right'
        draggable={false}
        autoClose={1000}
      />
      {loading ?
        <div className='alignment'>
        <PulseLoader color={'#1444e0'} loading={loading} size={15}/>
        </div>  
        :
      <div>
        <h1 className='px-5 mt-5'>Customer</h1>
        <div className='d-flex justify-content-end px-5 mt-5'>
          <Link to='/dashboard/customer/add/' className='btn btn-primary'>Add new +</Link>
        </div>
        <div className='mt-4 px-5 pt-3'>
            <div className='card'>
              <div className='card-header'>  
                <h3>Customer List</h3>
              </div>
              <div className='card-body'>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>NIC</th>
                    <th>Mobile</th>
                    <th>Address Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  { data.map((value,index)=>{
                    return(
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{value.name}</td>
                      <td>{value.nic}</td>
                      <td>{value.mobile}</td>
                      <td>{value.address}</td>
                      <td>
                        <Link to={`/dashboard/customer/read/${value.cusID}`} className='btn btn-primary mx-2'><i className='bi bi-pencil'></i></Link>
                        <button className='btn btn-danger' onClick={()=>{handleDelete(value.cusID)}}><i className='bi bi-trash'></i></button>
                      </td>
                    </tr>)
                  })}   
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>
      }
    </div>
  )
}

export default Customer