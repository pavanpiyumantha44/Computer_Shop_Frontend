import React, { useState } from 'react'
import {toast,ToastContainer} from 'react-toastify';
import BreadCrumb from '../BreadCrumb';
import { Form,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateCategory = () => {
    const navigate = useNavigate();
    const [category,setCategory] = useState({
        name:'',
        brand:'',
        status:'',
    });
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(category);
        if(category.name=== ""||category.status=== "")
        {
            toast.error("Please Fill All Fields!!");
        }
        else{
        axios.post('http://localhost:5000/dashboard/category/add',category)
        .then(res=>{
           if(res.data.Status==="Success"){
            toast.success("Category Added!!");
            setTimeout(()=>{
              navigate('/dashboard/category');
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
}
  return (
    <div>
        <ToastContainer position="top-center" draggable={false} autoClose={1000} />
      <div>
        <BreadCrumb
          path={"/dashboard/category"}
          backTo={"Category"}
          current={"New Category"}
        />
        
        <div className="p-3 mt-5 w-100 d-flex justify-content-center">
        <div className='w-50 bg-white rounded p-3 border'>
            <h3>Add New Category</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="categoryName" className="form-label">Category Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="brandName"
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
                placeholder="Enter Category Name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="brandName" className="form-label">
                Status
              </Form.Label>
              <Form.Select onChange={(e) => setCategory({ ...category, status: e.target.value })}>
                <option value="" selected disabled>
                  _Select_
                </option>
                <option value={"Available"}>Available</option>
                <option value={"Not Available"}>Not Available</option>
              </Form.Select>
            </Form.Group>
            <Button type='submit' className="mt-3" variant='primary'>Add Category</Button>
          </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCategory