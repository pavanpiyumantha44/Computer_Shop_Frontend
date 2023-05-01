import React, { useEffect, useState } from 'react'
import { toast,ToastContainer } from 'react-toastify';
import BreadCrumb from '../BreadCrumb';
import { Form,Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const EditEmployee = () => {
    const navigate = useNavigate();
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
    const {id} = useParams();
    useEffect(()=>{
        axios.get('http://localhost:5000/dashboard/employee/read/'+id)
        .then(res=>{
            setEmployee({
                ...employee,
                name:res.data.Result[0].name,
                nic:res.data.Result[0].nic,
                mobile:res.data.Result[0].mobile,
                address:res.data.Result[0].address,
                position:res.data.Result[0].role,
                email:res.data.Result[0].email,
                password:res.data.Result[0].password
            })
        })
        .catch(err=>{
            console.log(err);
        })
    },[])
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.put('http://localhost:5000/dashboard/employee/update/'+id,employee)
        .then(res=>{
            if(res.data.Status==="Success"){
                toast.success("Updated Successfully!!");
                setTimeout(()=>{
                    navigate('/dashboard/employee');
                },1500);
            }
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
        <BreadCrumb
            path={"/dashboard/employee"}
            backTo={"Employee"}
            current={"Update Employee"}
        />
    <div className='d-flex mt-5 justify-content-center align-items-center'>
        <div className='w-50 mb-5 bg-white rounded p-4 border'>
            <h2>Update Employee</h2>
        <Form onSubmit={handleSubmit}>
            <div>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control type="text"  id="name" value={employee.name} onChange={e=>setEmployee({...employee,name:e.target.value})} placeholder='Enter name'/>
                    {/* <div id="emailHelp" className="form-text"></div> */}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nic" >NIC</Form.Label>
                    <Form.Control type="text" id="nic" value={employee.nic} onChange={e=>setEmployee({...employee,nic:e.target.value})} placeholder='Enter NIC'/>
                </Form.Group>
                <Form className="mb-3">
                    <Form.Label htmlFor="mobile">Contact Number</Form.Label>
                    <Form.Control type="text" id="mobile" value={employee.mobile}  onChange={e=>setEmployee({...employee,mobile:e.target.value})} placeholder='Enter mobile'/>
                </Form>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="mobile">Address</Form.Label>
                    <Form.Control type="text" className="form-control" id="address" value={employee.address} onChange={e=>setEmployee({...employee,address:e.target.value})} placeholder='Enter address'/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="mobile">email</Form.Label>
                    <Form.Control type="email" className="form-control" id="email" value={employee.email} onChange={e=>setEmployee({...employee,email:e.target.value})} placeholder='Enter username'/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="mobile">password</Form.Label>
                    <Form.Control type="password" className="form-control" id="password" value={employee.password} onChange={e=>setEmployee({...employee,password:e.target.value})} placeholder='Enter password'/>
                </Form.Group>
            </div>
            <Button type="submit" variant='primary'>Update Employee</Button>
        </Form>
        </div>
    </div>
    </>
  )
}

export default EditEmployee