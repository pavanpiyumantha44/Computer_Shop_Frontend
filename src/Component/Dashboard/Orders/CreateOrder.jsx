import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form } from 'react-bootstrap';
import BreadCrumb from '../BreadCrumb';
const CreateOrder = () => {
    const navigate = useNavigate();
    const [customer,setCustomer] = useState([]);
    const [brand,setBrand] = useState([]);
    const [category,setCategory] = useState([]);
    const [order,setOrder] = useState({
        cusID:'',
        brand:'',
        category:'',
        quantity:'',
        advance:'',
        unitPrice:'',
        description:'',
        status:'Pending',
    })
    useEffect(()=>{
        axios.get('http://localhost:5000/dashboard/customer')
        .then(res=>{
            console.log(res);
            setCustomer(res.data.Result);
            
        })
        .catch(err=>{
            console.log(err);
        })
        axios.get('http://localhost:5000/dashboard/brands')
        .then(res=>{
            console.log(res);
            setBrand(res.data.Result);
        })
        .catch(err=>{
            console.log(err);
        })
        axios.get('http://localhost:5000/dashboard/category')
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
        if(order.cusID===""||order.category==""||order.quantity=="")
        {
            toast.error("Please Fill All Fields!!");
        }
        else if(Number(order.quantity)<=0){
            toast.error("Invalid Quantity!!");
        }
        else if(Number(order.quantity)>10){
            toast.error("Max Qty 10!!");
        }
        else if(Number(order.unitPrice)<=0){
            toast.error("Invalid Unit Price");
        }
        else{
        console.log(order);
        axios.post('http://localhost:5000/dashboard/orders/add',order)
        .then(res=>{
            console.log(res);
           if(res.data.Status==="Success"){
            toast.success("order Added!!");
            setTimeout(()=>{
                navigate('/dashboard/orders');
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
          path={"/dashboard/orders"}
          backTo={"orders"}
          current={"New order"}
        />
        <div className="p-3 mt-3 w-100 d-flex justify-content-center">
        <div className='w-75 bg-white rounded p-3 border'>
            <h3>Add New order</h3>
          <Form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-12'>
                    <Form.Label>Select Customer</Form.Label>
                    <Form.Group className='mb-2'>
                    <Form.Select className="form-select" onChange={(e) => setOrder({ ...order, cusID: e.target.value })}>
                        <option value="" selected disabled>
                        _Select_
                        </option>
                        {
                            customer.map((values,index)=>{
                                return(
                                    <option value={values.cusID}>{values.name} - {values.nic} - {values.address} - {values.mobile}</option>
                                );
                            })
                        }
                    </Form.Select>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Label htmlFor="orderName" className="form-label">Brand</Form.Label>
                    <Form.Group className="mb-3">
                    {/* <Form.Control
                        type="text"
                        className="form-control"
                        id="orderName"
                        onChange={(e) => setOrder({ ...order, brand: e.target.value })}
                        placeholder="Enter brand"
                    /> */}
                    <Form.Select className='form-select' onChange={(e) => setOrder({ ...order, brand: e.target.value })}>
                        <option selected disabled>_Select_</option>
                        {
                            brand.map((value)=>{
                                return(
                                    <option value={value.name}>{value.name}</option>
                                )
                            })
                        }
                    </Form.Select>
                    </Form.Group>
                </div>
                <div className='col-6'>
                <Form.Label htmlFor="orderName" className="form-label">Category</Form.Label>
                    <Form.Group className="mb-3">
                    {/* <Form.Control
                        type="text"
                        className="form-control"
                        id="category"
                        onChange={(e) => setOrder({ ...order, category: e.target.value })}
                        placeholder="Enter category"
                    /> */}
                    <Form.Select className='form-select' onChange={(e) => setOrder({ ...order, category: e.target.value })}>
                        <option selected disabled>_Select_</option>
                        {
                            category.map((value)=>{
                                return(
                                    <option value={value.name}>{value.name}</option>
                                )
                            })
                        }
                    </Form.Select>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='orderQuantity' className='form-label'>Quantity</Form.Label>
                        <Form.Control
                        type='number' className='form-control' id='orderQuantity' onChange={(e)=> setOrder({...order,quantity:e.target.value})} placeholder='Enter quantity'
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='advance' className='form-label'>Advance</Form.Label>
                        <Form.Control
                        type='number' className='form-control' id='advance' onChange={(e)=> setOrder({...order,advance:e.target.value})} placeholder='Enter advance'
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='orderQuantity' className='form-label'>Unit Price</Form.Label>
                        <Form.Control
                        type='number' className='form-control' id='orderQuantity' onChange={(e)=> setOrder({...order,unitPrice:e.target.value})} placeholder='Enter total price'
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
                {/* <div className='col-6'>
                    <Form.Label htmlFor="orderName" className="form-label">Placed Date</Form.Label>
                    <Form.Group className="mb-3">
                    <Form.Control
                        type="date"
                        className="form-control"
                        id="orderName"
                        onChange={(e) => setOrder({ ...order, name: e.target.value })}
                        placeholder="Enter brand"
                    />
                    </Form.Group>
                </div> */}
                {/* <div className='col-6'>
                     <Form.Group className="mb-3">
                        <Form.Label htmlFor="orderName" className="form-label">
                            Status
                        </Form.Label>
                        <Form.Select className="form-select" onChange={(e) => setOrder({ ...order,status:e.target.value})}>
                            <option value={"Available"}>Available</option>
                            <option value={"Not Available"} selected>Not Available</option>
                        </Form.Select>
                        </Form.Group>
                </div> */}
            </div>
            
           
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={(e)=> setOrder({...order,description:e.target.value})} placeholder='Enter specifications...' />
            </Form.Group>
            <Button type='submit' className="mt-3" variant='primary'>Add order</Button>
          </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateOrder