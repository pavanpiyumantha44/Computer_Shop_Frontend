import React, { useEffect, useState } from 'react'
import {toast,ToastContainer} from 'react-toastify';
import {Form,Button} from 'react-bootstrap';
import PulseLoader from "react-spinners/PulseLoader";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from '../BreadCrumb';

const EditCategory = () => {
  const[loading,setLoading] = useState(true);
  const {id} = useParams();
  const [category,setCategory] = useState({
    name:'',
    status:''
  })
   const navigate = useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/category/read/'+id)
    .then(res=>{
        console.log(res);
        setLoading(false);
        setCategory({
          ...category,
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
      axios.put('http://localhost:5000/dashboard/category/update/'+id,category)
      .then(res=>{
        toast.success('Updated Successfully!!');
        setTimeout(()=>{
          navigate('/dashboard/category');
        },1500);
      })
      .catch(err=>{
        console.log(err);
      })
  }
    return (
    <>
    <ToastContainer
        position='top-center'
        draggable={false}
        autoClose={1000}
      />
      {loading?
        <div className='alignment'>
        <PulseLoader color={'#1444e0'} loading={loading} size={15}/>
        </div>  
        :
        <div>
          <BreadCrumb
            backTo={'Category'}
            path={'/dashboard/category'}
            current={'Update Category'}
          />
        <div className="p-3 mt-5 w-100 d-flex justify-content-center">
        <div className='w-50 bg-white rounded p-3 border'>
            <h3>Update Category</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="categoryName" className="form-label">Category Name</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="brandName"
                value={category.name}
                onChange={(e) => setCategory({ ...category, name: e.target.value })}
                placeholder="Enter Category Name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="brandName" className="form-label">
                Status
              </Form.Label>
              <Form.Select onChange={(e) => setCategory({ ...category, status: e.target.value })}>
                <option selected disabled>
                  {category.status}
                </option>
                <option value={"Available"}>Available</option>
                <option value={"Not Available"}>Not Available</option>
              </Form.Select>
            </Form.Group>
            <Button type='submit' className="mt-3" variant='primary'>Update Category</Button>
          </Form>
          </div>
        </div>
        </div>
            }
    </>
  )
}

export default EditCategory