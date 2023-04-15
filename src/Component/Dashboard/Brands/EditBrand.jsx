import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './style.css';
import PulseLoader from "react-spinners/PulseLoader";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BreadCrumb from '../BreadCrumb';
const EditBrand = () => {
  
    const[loading,setLoading] = useState(true);
    const navigate = useNavigate();
    const {id}= useParams();
    const [brand,setBrand] = useState({
        name:'',
        status:'',
    })
    useEffect(()=>{
      axios.get('http://localhost:5000/dashboard/brands/read/'+id)
      .then(res=>{
        console.log(res);
        setLoading(false);
        setBrand({
          ...brand,
          name:res.data.Result[0].name,
          status:res.data.Result[0].status
        })
      })
      .catch(err=>{
        console.log(err);
      })
    },[])
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.put('http://localhost:5000/dashboard/brands/update/'+id,brand)
        .then(res=>{
           if(res.data.Status==="Success"){
              toast.success("Updated Successfully!!");
              setTimeout(()=>{
                navigate('/dashboard/brands');
              },1500)
           }
           else{
                toast.error("Something went wrong!!");
           }
           
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
  return (
    <div>
    <ToastContainer position="top-center" draggable={false} autoClose={1000} />
     {loading ? 
     <div className='alignment'>
      <PulseLoader color={'#1444e0'} loading={loading} size={15}/>
      </div>
        :
      <div>
        <BreadCrumb
          path={"/dashboard/brands"}
          backTo={"Brands"}
          current={"Update Brand"}
        />
        <div className="p-3 mt-5 w-100 d-flex justify-content-center">
        <div className='w-50 bg-white rounded p-3 border'>
            <h3>Update Brand</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="brandName" className="form-label">
                Brand Name
              </label>
              <input type="text" className="form-control" id="brandName" value={brand.name} onChange={(e) => setBrand({ ...brand, name: e.target.value })} placeholder="Enter brand name"/>
            </div>
            <div className="mb-3">
              <label htmlFor="brandName" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                onChange={(e) => setBrand({ ...brand, status: e.target.value })}
              >
                <option value={brand.status} selected disabled>{brand.status}</option>
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
            <button className="btn btn-primary mt-3">Update</button>
          </form>
          </div>
        </div>
      </div>
      }
      
    </div>
  );
}

export default EditBrand