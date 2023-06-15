import React, { useEffect, useState } from 'react'
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
        email:'',
        mobile:'',
        address:''
    });
    const [registerCustomers,setRegisterdCustomers] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:5000/dashboard/customer')
        .then(res=>{
            console.log(res);
            setRegisterdCustomers(res.data.Result);
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    const navigate = useNavigate();
    const nicValidate = (nic)=>{
        const pattern = /^([0-9]{9}[xXvV]|[0-9]{12})$/;
        return pattern.test(nic);
    }
    const checkExistNIC = (nic)=>{
        let flag = false;
        registerCustomers.map((value)=>{
            if(value.nic===nic){
                flag = true;
            }
        })
        return flag;
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(customer.name===''||customer.nic===''||customer.email===''||customer.mobile===''||customer.address==='')
        {
            toast.error("Please Fill All Fields!!");
        }
        else if(!nicValidate(customer.nic)){
            toast.error("Invalid NIC !!");
        }
        else if(checkExistNIC(customer.nic)){
            toast.error("NIC Already Exist!!");
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
    <div className='d-flex mt-2 justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-4 border my-4'>
            <h2>Add New Customer</h2>
        <Form onSubmit={handleSubmit}>
            <div>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text"  id="name" placeholder='Enter Name' onChange={e=>setCustomer({...customer,name:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nic" >NIC</Form.Label>
                    <Form.Control type="text" id="nic" placeholder='Enter NIC'  onChange={e=>setCustomer({...customer,nic:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nic" >Email</Form.Label>
                    <Form.Control type="email" id="email" placeholder='Enter Email'  onChange={e=>setCustomer({...customer,email:e.target.value})}/>
                </Form.Group>
                <Form className="mb-3">
                    <Form.Label htmlFor="mobile">Contact Number</Form.Label>
                    <Form.Control type="text" id="mobile" placeholder='Enter Mobile'  onChange={e=>setCustomer({...customer,mobile:e.target.value})}/>
                </Form>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="mobile">Address</Form.Label>
                    <Form.Control type="text" className="form-control" id="address" placeholder='Enter Address'  onChange={e=>setCustomer({...customer,address:e.target.value})}/>
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