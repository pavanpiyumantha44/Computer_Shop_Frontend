import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form } from 'react-bootstrap';
import BreadCrumb from '../../BreadCrumb';

const CreateItem = () => {
    const navigate = useNavigate();
    const [item,setItem] = useState({
        name:'',
        description:'',
        catID:'',
        bID:'',
        quantity:'',
        unitPrice:'',
        image:'',
        status:'',
    })
    const [brand,setBrand] = useState([]);
    const [category,setCategory] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/dashboard/items/create/getBrands')
        .then(res=>{
            console.log(res);
            setBrand(res.data.Result);
        })
        .catch(err=>{
            console.log(err);
        })
        axios.get('http://localhost:5000/dashboard/items/create/getCategory')
        .then(res=>{
            console.log(res);
            setCategory(res.data.Result);
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    const handleSubmit = (e)=>{
        e.preventDefault();
        //console.log(item);
        //console.log(item);
        if(item.name=== ""||item.status=== ""||item.brand===""||item.catID===""||item.quantity==""||item.unitPrice==""||item.image==""||item.description==="")
        {
            toast.error("Please Fill All Fields!!");
        }
        else if(Number(item.quantity)<=0){
            toast.error("Invalid Quantity!!");
        }
        else if(Number(item.quantity)>500){
            toast.error("Mximum Qty limit 500!!");
        }
        else if(Number(item.unitPrice)<=0){
            toast.error("Invalid Unit Price!!");
        }
        else{
        const formData = new FormData();
        formData.append("name",item.name);
        formData.append("catID",item.catID);
        formData.append("bID",item.bID);
        formData.append("quantity",item.quantity);
        formData.append("unitPrice",item.unitPrice);
        formData.append("image",item.image);
        formData.append("description",item.description);
        formData.append("status",item.status);
        axios.post('http://localhost:5000/dashboard/items/create',formData)
        .then(res=>{
            console.log(res);
           if(res.data.Status==="Success"){
            toast.success("Item Added!!");
            setTimeout(()=>{
                navigate('/dashboard/items');
            },1500);
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
          path={"/dashboard/items"}
          backTo={"Items"}
          current={"New Item"}
        />
        
        <div className="p-3 mt-5 w-100 d-flex justify-content-center">
        <div className='w-75 bg-white rounded p-3 border'>
            <h3>Add New Item</h3>
          <Form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-6'>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="itemName" className="form-label">Item Name</Form.Label>
                    <Form.Control
                        type="text"
                        className="form-control"
                        id="itemName"
                        onChange={(e) => setItem({ ...item, name: e.target.value })}
                        placeholder="Enter item name"
                    />
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="itemName" className="form-label">
                        Brands
                    </Form.Label>
                    <Form.Select className="form-select" onChange={(e) => setItem({ ...item, bID: e.target.value })}>
                        <option value="" selected disabled>
                        _Select_
                        </option>
                        {
                            brand.map((values,index)=>{
                                return(
                                    <option value={values.bID}>{values.name}</option>
                                );
                            })
                        }
                    </Form.Select>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="itemName" className="form-label">
                        Category
                    </Form.Label>
                    <Form.Select className="form-select" onChange={(e) => setItem({ ...item, catID: e.target.value })}>
                        <option value="" selected disabled>
                        _Select_
                        </option>
                        {
                            category.map((values,index)=>{
                                return(
                                    <option value={values.cID}>{values.name}</option>
                                );
                            })
                        }
                    </Form.Select>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='itemQuantity' className='form-label'>Quantity</Form.Label>
                        <Form.Control
                        type='number' className='form-control' id='itemQuantity' onChange={(e)=> setItem({...item,quantity:e.target.value})} placeholder='Enter quantity'
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='itemQuantity' className='form-label'>Unit Price</Form.Label>
                        <Form.Control
                        type='number' className='form-control' id='itemQuantity' onChange={(e)=> setItem({...item,unitPrice:e.target.value})} placeholder='Enter unit price'
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Choose an Image</Form.Label>
                        <Form.Control type="file" onChange={e=>setItem({...item,image:e.target.files[0]})}/>
                    </Form.Group>
                </div>
            </div>
            
           
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={(e)=> setItem({...item,description:e.target.value})} placeholder='Enter specifications...' />
            </Form.Group>
                
            <Form.Group className="mb-3">
              <Form.Label htmlFor="itemName" className="form-label">
                Status
              </Form.Label>
              <Form.Select className="form-select" onChange={(e) => setItem({ ...item,status:e.target.value})}>
                <option selected disabled>
                  _Select_
                </option>
                <option value={"Available"}>Available</option>
                <option value={"Not Available"}>Not Available</option>
              </Form.Select>
            </Form.Group>
            <Button type='submit' className="mt-3" variant='primary'>Add item</Button>
          </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateItem