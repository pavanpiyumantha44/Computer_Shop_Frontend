import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import {Button, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import BreadCrumb from '../BreadCrumb';

const CreateEmployee = () => {
    const [employee,setEmployee] = useState({
        name:'',
        nic:'',
        mobile:'',
        address:'',
        position:'',
        email:'',
        password:'',
        isActive:1,

    });
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(employee.name===''||employee.nic===''||employee.mobile===''||employee.address==='')
        {
            toast.error("Please Fill All Fields!!");
        }
        else{
            console.log(employee);
            axios.post('http://localhost:5000/dashboard/employee/add',employee)
            .then(res=>{
                console.log(res);
                if(res.data.Status === "Success")
                {
                    toast.success("employee Added!!");
                    setTimeout(()=>{
                        navigate('/dashboard/employee');
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
                    <Form.Control type="text"  id="name" onChange={e=>setEmployee({...employee,name:e.target.value})} placeholder='Enter name'/>
                    {/* <div id="emailHelp" className="form-text"></div> */}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nic" >NIC</Form.Label>
                    <Form.Control type="text" id="nic"  onChange={e=>setEmployee({...employee,nic:e.target.value})} placeholder='Enter NIC'/>
                </Form.Group>
                <Form className="mb-3">
                    <Form.Label htmlFor="mobile">Contact Number</Form.Label>
                    <Form.Control type="text" id="mobile"  onChange={e=>setEmployee({...employee,mobile:e.target.value})} placeholder='Enter mobile'/>
                </Form>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="mobile">Address</Form.Label>
                    <Form.Control type="text" className="form-control" id="address"  onChange={e=>setEmployee({...employee,address:e.target.value})} placeholder='Enter address'/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="position">Position</Form.Label>
                    <Form.Select onChange={e=>setEmployee({...employee,position:e.target.value})}>
                        <option disabled selected>_Select_</option>
                        <option value={1}>Cashier</option>
                        <option value={2}>Technician</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="mobile">email</Form.Label>
                    <Form.Control type="email" className="form-control" id="email"  onChange={e=>setEmployee({...employee,email:e.target.value})} placeholder='Enter username'/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="mobile">password</Form.Label>
                    <Form.Control type="password" className="form-control" id="password"  onChange={e=>setEmployee({...employee,password:e.target.value})} placeholder='Enter password'/>
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