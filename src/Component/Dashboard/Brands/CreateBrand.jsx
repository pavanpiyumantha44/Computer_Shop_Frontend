import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form } from 'react-bootstrap';

const CreateBrand = () => {
    const navigate = useNavigate();
    const [brand,setBrand] = useState({
        name:'',
        status:'',
    })
    const handleSubmit = (e)=>{
        e.preventDefault();
        //console.log(brand);
        if(brand.name=== ""||brand.status=== "")
        {
            toast.error("Please Fill All Fields!!");
        }
        else{
        axios.post('http://localhost:5000/dashboard/brands/create',brand)
        .then(res=>{
           if(res.data.Status==="Success"){
            navigate('/dashboard/brands');
           }
           else{
                toast.error("Something went wrong!!");
           }
           
        })
        .catch(err=>{
            console.log(err);
        })
    }
    }
  return (
    <div>
      <ToastContainer position="top-center" draggable={false} autoClose={1000} />
      <div>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb mt-5 px-5">
            <li className="breadcrumb-item">
            <Link to="/dashboard/brands" className='text-decoration-none'>Brands</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
            Create
            </li>
        </ol>
        </nav>

        <div className="p-3 mt-5 w-100 d-flex justify-content-center">
        <div className='w-50 bg-white rounded p-3 border'>
            <h3>Add New Brand</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="brandName" className="form-label">Brand Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="brandName"
                onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                placeholder="Enter brand name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="brandName" className="form-label">
                Status
              </Form.Label>
              <Form.Select className="form-select" onChange={(e) => setBrand({ ...brand, status: e.target.value })}>
                <option value="" selected disabled>
                  _Select_
                </option>
                <option value={"Available"}>Available</option>
                <option value={"Not Available"}>Not Available</option>
              </Form.Select>
            </Form.Group>
            <Button type='submit' className="mt-3" variant='primary'>Add brand</Button>
          </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBrand