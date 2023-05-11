import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form } from 'react-bootstrap';
import BreadCrumb from '../BreadCrumb';
const EditOrder = () => {
    const navigate = useNavigate();
    const [customer,setCustomer] = useState([]);
    const [cusID,setCusID] = useState();
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
    const {id} = useParams();
    useEffect(()=>{
        axios.get('http://localhost:5000/dashboard/orders/read/'+id)
        .then(res=>{
            console.log(res);
            setOrder({
                ...order,
                cusID:res.data.Result[0].cusID,
                brand:res.data.Result[0].brand,
                category:res.data.Result[0].category,
                quantity:res.data.Result[0].qty,
                advance:res.data.Result[0].advance,
                unitPrice:res.data.Result[0].unitPrice,
                description:res.data.Result[0].description
            })
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
        else if(Number(order.quantity)>=10){
            toast.error("Max Qty 10!!")
        }
        else{
        console.log(order);
        axios.put('http://localhost:5000/dashboard/orders/update/'+id,order)
        .then(res=>{
            console.log(res);
           if(res.data.Status==="Success"){
            toast.success("Order Updted!!");
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
          current={"Update Order"}
        />
        <div className="p-3 mt-3 w-100 d-flex justify-content-center">
        <div className='w-75 bg-white rounded p-3 border'>
            <h3>Add New order</h3>
          <Form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-12'>
                    <Form.Label>Customer ID</Form.Label>
                    <Form.Group className='mb-2'>
                    <Form.Control type='text' value={order.cusID} disabled>
                    </Form.Control>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Label htmlFor="orderName" className="form-label">Brand</Form.Label>
                    <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        className="form-control"
                        id="orderName"
                        value={order.brand}
                        onChange={(e) => setOrder({ ...order, brand: e.target.value })}
                        placeholder="Enter brand"
                    />
                    </Form.Group>
                </div>
                <div className='col-6'>
                <Form.Label htmlFor="orderName" className="form-label">Category</Form.Label>
                    <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        className="form-control"
                        id="category"
                        value={order.category}
                        onChange={(e) => setOrder({ ...order, category: e.target.value })}
                        placeholder="Enter category"
                    />
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='orderQuantity' className='form-label'>Quantity</Form.Label>
                        <Form.Control
                        type='number' className='form-control' id='orderQuantity' value={order.quantity} onChange={(e)=> setOrder({...order,quantity:e.target.value})} placeholder='Enter quantity'
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='advance' className='form-label'>Advance</Form.Label>
                        <Form.Control
                        type='number' className='form-control' id='advance' value={order.advance} onChange={(e)=> setOrder({...order,advance:e.target.value})} placeholder='Enter advance'
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='orderQuantity' className='form-label'>Unit Price</Form.Label>
                        <Form.Control
                        type='number' className='form-control' id='orderQuantity' value={order.unitPrice} onChange={(e)=> setOrder({...order,unitPrice:e.target.value})} placeholder='Enter Unit Price'
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
                <Form.Control as="textarea" rows={3} value={order.description} onChange={(e)=> setOrder({...order,description:e.target.value})} placeholder='Enter specifications...' />
            </Form.Group>
            <Button type='submit' className="mt-3" variant='primary'>Update Order</Button>
          </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrder