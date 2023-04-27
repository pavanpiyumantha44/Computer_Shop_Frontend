import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import {Button, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import BreadCrumb from '../BreadCrumb';

const CreateEmployee = () => {
    const [customer,setCustomer] = useState({
        name:'',
        nic:'',
        mobile:'',
        address:''
    });
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(customer.name===''||customer.nic===''||customer.mobile===''||customer.address==='')
        {
            toast.error("Please Fill All Fields!!");
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
            path={"/dashboard/employee"}
            backTo={"Employee"}
            current={"New Employee"}
        />
    <div className='d-flex mt-5 justify-content-center align-items-center'>
        <div className='w-50 mb-5 bg-white rounded p-4 border'>
            <h2>Add New Employee</h2>
        <Form onSubmit={handleSubmit}>
            <div>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text"  id="name" onChange={e=>setCustomer({...customer,name:e.target.value})} placeholder='Enter name'/>
                    {/* <div id="emailHelp" className="form-text"></div> */}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nic" >NIC</Form.Label>
                    <Form.Control type="text" id="nic"  onChange={e=>setCustomer({...customer,nic:e.target.value})} placeholder='Enter NIC'/>
                </Form.Group>
                <Form className="mb-3">
                    <Form.Label htmlFor="mobile">Contact Number</Form.Label>
                    <Form.Control type="text" id="mobile"  onChange={e=>setCustomer({...customer,mobile:e.target.value})} placeholder='Enter mobile'/>
                </Form>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="mobile">Address</Form.Label>
                    <Form.Control type="text" className="form-control" id="address"  onChange={e=>setCustomer({...customer,address:e.target.value})} placeholder='Enter address'/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="mobile">Position</Form.Label>
                    <Form.Select>
                        <option disabled selected>_Select_</option>
                        <option value={"Cashier"}>Cashier</option>
                        <option value={"Technician"}>Technician</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="mobile">username</Form.Label>
                    <Form.Control type="text" className="form-control" id="username"  onChange={e=>setCustomer({...customer,address:e.target.value})} placeholder='Enter username'/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="mobile">password</Form.Label>
                    <Form.Control type="password" className="form-control" id="password"  onChange={e=>setCustomer({...customer,address:e.target.value})} placeholder='Enter password'/>
                </Form.Group>
            </div>
            <Button type="submit" variant='primary'>Add Employee</Button>
        </Form>
        </div>
    </div>
    </>
  )
}

export default CreateEmployee