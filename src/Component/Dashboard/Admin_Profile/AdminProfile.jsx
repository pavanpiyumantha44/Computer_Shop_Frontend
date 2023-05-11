import React, { useEffect, useState } from 'react'
import BreadCrumb from '../BreadCrumb'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify'

const AdminProfile = () => {
    const [admin,setAdmin] = useState({
        username:'',
        password:''
    });
    
    useEffect(()=>{
        axios.get('http://localhost:5000/dashboard/settings/admin')
        .then(res=>{
            setAdmin({
                ...admin,
                username:res.data.Result[0].email,
                password:res.data.Result[0].password
            })
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(admin.username===""||admin.password===""){
            toast.error("Please Fill All Fields!!");
        }
        else{
            axios.put('http://localhost:5000/dashboard/settings/admin/update',admin)
            .then(res=>{
                console.log(res);
                if(res.data.Status==="Success"){
                    toast.success("Updated Successfully!!");
                }
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
    return (
    <div>
        <ToastContainer position='top-center' draggable={false} autoClose={1000}/>
        <BreadCrumb
            backTo={"Home"}
            path={'/dashboard/home'}
            current={"Profile"}
        />
    <div className='mt-4 px-5 pt-3'>
        <div className='row'>
            <div className='col-3'>
            </div>
            <div className='col-5 shadow p-5 mb-3 rounded'>
            <div className='row'>
            <div className='col-2'></div>
            <div className='col-4'>
            <img src='../images/admin_icon.png' style={{marginLeft:"15px",textAlign:"center",width:"200px", background:"#ffffff", borderRadius:"100px", padding:"10px"}}/>
            </div>
            <div className='col-6'></div>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-2 mt-4'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type='email' value={admin.username} placeholder='Enter username'onChange={e=>setAdmin({...admin,username:e.target.value})}></Form.Control>
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' value={admin.password} placeholder='Enter Password'onChange={e=>setAdmin({...admin,password:e.target.value})}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Update</Button>
            </Form>
            </div>
            <div className='col-4'>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AdminProfile