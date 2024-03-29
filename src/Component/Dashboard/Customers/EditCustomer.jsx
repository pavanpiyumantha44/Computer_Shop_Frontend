import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BreadCrumb from '../BreadCrumb';
import {toast,ToastContainer} from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";

const EditCustomer = () => {
  const[loading,setLoading] = useState(true);
  const [customer,setCustomer] = useState({
    name:'',
    nic:'',
    email:'',
    mobile:'',
    address:''
  })
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/customer/read/'+id)
    .then(res=>{
        setLoading(false);
        console.log(res.data);
        setCustomer({
            ...customer,
            name:res.data.Result[0].name,
            nic:res.data.Result[0].nic,
            email:res.data.Result[0].email,
            mobile:res.data.Result[0].mobile,
            address:res.data.Result[0].address,
        }
        )
    })
    .catch(err=>{
        console.log(err);
    })
  },[])
  const nicValidate = (nic)=>{
    const pattern = /^([0-9]{9}[xXvV]|[0-9]{12})$/;
    return pattern.test(nic);
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
    else{
        axios.put('http://localhost:5000/dashboard/customer/update/'+id,customer)
        .then(res=>{
            if(res.data.Status === "Success")
            {
                toast.success("Updated Successfully!!");
                setTimeout(()=>{
                    navigate('/dashboard/customer');
                },1500)
            }
            else{
                toast.error("Something went wrong!!");
            }  
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
    }
  }
  return (
    <>
    <ToastContainer position='top-center' draggable='false' autoClose={1000}/>
    <BreadCrumb
        path={"/dashboard/customer"}
        backTo={"Customer"}
        current={"Update Customer"}
    />
    {loading ? 
     <div className='alignment'>
      <PulseLoader color={'#1444e0'} loading={loading} size={15}/>
      </div>
        :
    <div className='d-flex mt-5 justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3 border mb-4'>
            <h1>Edit Customer Details</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" value={customer.name} onChange={e=>setCustomer({...customer,name:e.target.value})}/>
                {/* <div id="emailHelp" className="form-text"></div> */}
            </div>
            <div className="mb-3">
                <label htmlFor="nic" className="form-label">NIC</label>
                <input type="text" className="form-control" id="nic" value={customer.nic} onChange={e=>setCustomer({...customer,nic:e.target.value})}/>
            </div>
            <div className="mb-3">
                <label htmlFor="nic" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={customer.email} onChange={e=>setCustomer({...customer,email:e.target.value})}/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="mobile">Contact Number</label>
                <input type="text" className="form-control" id="mobile" value={customer.mobile} onChange={e=>setCustomer({...customer,mobile:e.target.value})}/>
            </div>
            <div className="mb-3">
                <label className="form-label" htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" value={customer.address} onChange={e=>setCustomer({...customer,address:e.target.value})}/>
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
        </form>
        </div>
    </div>
    }
    </>
  )
}

export default EditCustomer;