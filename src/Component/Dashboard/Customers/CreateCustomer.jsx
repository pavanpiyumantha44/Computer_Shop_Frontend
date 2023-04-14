import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CreateCustomer = () => {
    const [customer,setCustomer] = useState({
        name:'',
        nic:'',
        mobile:'',
        address:''
    });
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post('http://localhost:5000/dashboard/customer/add',customer)
        .then(res=>{
            if(res.data.Status === "Success")
            {
                navigate('/dashboard/customer');
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
  return (
    <div className='d-flex mt-5 justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3 border'>
            <h1>Add New Customer</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" onChange={e=>setCustomer({...customer,name:e.target.value})}/>
                {/* <div id="emailHelp" className="form-text"></div> */}
            </div>
            <div className="mb-3">
                <label htmlFor="nic" className="form-label">NIC</label>
                <input type="text" className="form-control" id="nic"  onChange={e=>setCustomer({...customer,nic:e.target.value})}/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="mobile">Contact Number</label>
                <input type="text" className="form-control" id="mobile"  onChange={e=>setCustomer({...customer,mobile:e.target.value})}/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="mobile">Address</label>
                <input type="text" className="form-control" id="address"  onChange={e=>setCustomer({...customer,address:e.target.value})}/>
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
  )
}

export default CreateCustomer