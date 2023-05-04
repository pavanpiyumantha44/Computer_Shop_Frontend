import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import {Button, Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import BreadCrumb from '../BreadCrumb';
import {FaSave} from 'react-icons/fa';

const CreateRepair = () => {
    const [customer,setCustomer] = useState([]);
    const [category,setCategory] = useState([]);
    const [repair,setRepair] = useState({
        cusID:'',
        catID:'',
    });
    useEffect(()=>{
        axios.get('http://localhost:5000/dashboard/customer/')
        .then(res=>{
            console.log(res);
            setCustomer(res.data.Result);
        })
        .catch(err=>{
            console.log(err);
        })
        axios.get('http://localhost:5000/dashboard/category/')
        .then(res=>{
            console.log(res);
            setCategory(res.data.Result);
        })
        .catch(err=>{
            console.log(err);
        })
    },[]);
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(repair.cusID==''||repair.catID=='')
        {
            toast.error("Please Fill All Fields!!");
        }
        else{
            console.log(repair);
            axios.post('http://localhost:5000/dashboard/repairs/add',repair)
            .then(res=>{
                console.log(res);
                if(res.data.Status === "Success")
                {
                    toast.success("repair Added!!");
                    setTimeout(()=>{
                        navigate('/dashboard/repairs');
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
    <ToastContainer position='top-center' draggable={false} autoClose={1000}/>
        <BreadCrumb
            path={"/dashboard/repairs"}
            backTo={"repair"}
            current={"Add repair"}
        />
    <div className='d-flex mt-5 justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-4 border'>
            <h2>Add New repair</h2>
        <Form onSubmit={handleSubmit}>
            <div>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Customer</Form.Label>
                    <Form.Select onChange={e=>setRepair({...repair,cusID:e.target.value})}>
                        <option disabled selected>_Select_</option>
                        {customer.map((values)=>{
                            return(
                                <option value={values.cusID}>{values.name} - {values.nic} - {values.address}</option>
                            );
                        })}
                    </Form.Select>
                    {/* <div id="emailHelp" className="form-text"></div> */}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nic" >Category</Form.Label>
                    <Form.Select onChange={e=>setRepair({...repair,catID:e.target.value})}>
                        <option disabled selected>_Select_</option>
                        {category.map((values)=>{
                            return(
                                <option value={values.cID}>{values.name}</option>
                            );
                        })}
                    </Form.Select>
                </Form.Group>
                {/* <Form.Group className="mb-3">
                    <Form.Label htmlFor="mobile">Contact Number</Form.Label>
                    <Form.Control type="text" id="mobile"  onChange={e=>setRepair({...repair,mobile:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label" htmlFor="mobile">Address</Form.Label>
                    <Form.Control type="text" className="form-control" id="address"  onChange={e=>setRepair({...repair,address:e.target.value})}/>
                </Form.Group> */}
            </div>
            <Button type="submit" variant='primary'><FaSave/><span className='mx-2'>Add Repair</span></Button>
        </Form>
        </div>
    </div>
    </>
  )
}

export default CreateRepair;