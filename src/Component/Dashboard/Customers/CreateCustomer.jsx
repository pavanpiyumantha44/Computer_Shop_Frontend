import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import {Button, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import BreadCrumb from '../BreadCrumb';

const CreateCustomer = () => {
    const [customer,setCustomer] = useState({
        name:'',
        nic:'',
        mobile:'',
        address:''
    });
    const navigate = useNavigate();
    const nicValidate = (nic)=>{
        const re = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/g
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(customer.name===''||customer.nic===''||customer.mobile===''||customer.address==='')
        {
            toast.error("Please Fill All Fields!!");
        }
        else if(customer.nic.length>12||customer.nic.length<10||customer.nic.length==11){
            toast.error("Invalid NIC");
        }
        else{
            axios.post('http://localhost:5000/dashboard/customer/add',customer)
            .then(res=>{
                if(res.data.Status === "Success")
                {
                    toast.success("Customer Added!!");
                    setTimeout(()=>{
                        navigate('/dashboard/customer');
                    },1500)
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
  return (
    <>
    <ToastContainer
        position='top-center'
        draggable={false}
        autoClose={1000}
      />
        <BreadCrumb
            path={"/dashboard/customer"}
            backTo={"Customer"}
            current={"New Customer"}
        />
    <div className='d-flex mt-5 justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-4 border'>
            <h2>Add New Customer</h2>
        <Form onSubmit={handleSubmit}>
            <div>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text"  id="name" onChange={e=>setCustomer({...customer,name:e.target.value})}/>
                    {/* <div id="emailHelp" className="form-text"></div> */}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nic" >NIC</Form.Label>
                    <Form.Control type="text" id="nic"  onChange={e=>setCustomer({...customer,nic:e.target.value})}/>
                </Form.Group>
                <Form className="mb-3">
                    <Form.Label htmlFor="mobile">Contact Number</Form.Label>
                    <Form.Control type="text" id="mobile"  onChange={e=>setCustomer({...customer,mobile:e.target.value})}/>
                </Form>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="mobile">Address</Form.Label>
                    <Form.Control type="text" className="form-control" id="address"  onChange={e=>setCustomer({...customer,address:e.target.value})}/>
                </Form.Group>
            </div>
            <Button type="submit" variant='primary'>Add</Button>
        </Form>
        </div>
    </div>
    </>
  )
}

export default CreateCustomer