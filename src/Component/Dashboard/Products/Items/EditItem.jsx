import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form } from 'react-bootstrap';
import BreadCrumb from '../../BreadCrumb';

const EditItem = () => {
    const navigate = useNavigate();
    const [bID,setBID] = useState();
    const [catID,setCatID] = useState();
    const [brand,setBrand] = useState([]);
    const [selectedBrand,setSelectedBrand] = useState({
        name:''
    });
    const [brandName,setBrandName] = useState('');
    const [categoryName,setCategoryName] = useState('');
    const [item,setItem] = useState({
        name:'',
        description:'',
        catID:'',
        bID:'',
        quantity:'',
        unitPrice:'',
        status:'',
    });
    const [items,setItems] = useState([]);
    const [category,setCategory] = useState([]);
    const [itemList,setItemList] = useState([]);
    
    const {id} = useParams();
    useEffect(()=>{
        axios.get('http://localhost:5000/dashboard/items/read/'+id)
        .then(res=>{
            console.log(res);
            setItem({
                ...item,
                name:res.data.Result[0].name,
                description:res.data.Result[0].description,
                catID:res.data.Result[0].catID,
                bID:res.data.Result[0].bID,
                quantity:res.data.Result[0].qty,
                unitPrice:res.data.Result[0].unitPrice,
                status:res.data.Result[0].status,
            });
            // setBID(res.data.Result[0].bID);
            // setCatID(res.data.Result[0].catID);
            setCategoryName(res.data.Result[0].categoryName);
            setBrandName(res.data.Result[0].brandName);
        })
        .catch(err=>{
            console.log(err);
        })
        axios.get('http://localhost:5000/dashboard/items/create/getBrands')
        .then(res=>{
            console.log(res);
            setBrand(res.data.Result);
        })
        .catch(err=>{
            console.log(err);
        })
        axios.get('http://localhost:5000/dashboard/items/create/getCategory')
        .then(res=>{
            console.log(res);
            setCategory(res.data.Result);
        })
        .catch(err=>{
            console.log(err);
        })
        axios.get('http://localhost:5000/dashboard/items')
        .then(res=>{
            console.log(res);
            setItemList(res.data.Result);
        })
        .catch(err=>{
            console.log(err);
        })
    },[])

    function validateSerialNumber(serialNumber) {
        const regex = /^[A-Z0-9]{10}$/;
        return regex.test(serialNumber);
    }
    // const checkExisSerialNumber = (serialNumber)=>{
    //     let flag = false;
    //     itemList.map((value)=>{
    //         if(value.name===serialNumber){
    //             flag = true;
    //         }
    //     })
    //     return flag;
    // }
    const handleSubmit = (e)=>{
        e.preventDefault();
       
        if(item.name=== ""||item.status=== ""||item.brand===""||item.catID===""||item.quantity==""||item.unitPrice==""||item.image==""||item.description==="")
        {
            toast.error("Please Fill All Fields!!");
        }
        else if(Number(item.quantity)<=0){
            toast.error("Invalid Quantity!!");
        }
        else if(Number(item.quantity)>500){
            toast.error("Mximum Qty limit 500!!");
        }
        else if(Number(item.unitPrice)<=0){
            toast.error("Invalid Unit Price!!");
        }
        else if(!validateSerialNumber(item.name)){
            toast.error("Invalid Serial Number!!");
        }
        else{
        axios.put('http://localhost:5000/dashboard/items/update/'+id,item)
        .then(res=>{
            console.log(res);
            if(res.data.Status==="Success"){
                toast.success("Item Updated!!");
                setTimeout(()=>{
                    navigate('/dashboard/items');
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
          path={"/dashboard/items"}
          backTo={"Items"}
          current={"Update Item"}
        />
        
        <div className="p-3 mt-5 w-100 d-flex justify-content-center">
        <div className='w-75 bg-white rounded p-3 border'>
            <h3>Update Item</h3>
          <Form onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-6'>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="itemName" className="form-label">Serial Number</Form.Label>
                    <Form.Control
                        type="text"
                        className="form-control"
                        id="itemName"
                        value={item.name}
                        onChange={(e) => setItem({ ...item, name: e.target.value })}
                        placeholder="Enter item name"
                    />
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="itemName" className="form-label">
                        Brands
                    </Form.Label>
                    <Form.Select className="form-select" onChange={(e) => setItem({ ...item, bID: e.target.value })}>
                        <option value={item.bID} selected disabled>
                        {brandName}
                        </option>
                        {
                            brand.map((values)=>{
                                return(
                                    <option value={values.bID}>{values.name}</option>
                                );
                            })
                        }
                    </Form.Select>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className="mb-3">
                    <Form.Label htmlFor="itemName" className="form-label">
                        Category
                    </Form.Label>
                    <Form.Select className="form-select" onChange={(e) => setItem({ ...item, catID: e.target.value })}>
                        <option value={item.catID} selected disabled>
                       {categoryName}
                        </option>
                        {
                            category.map((values)=>{
                                return(
                                    <option value={values.cID}>{values.name}</option>
                                );
                            })
                        }
                    </Form.Select>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='itemQuantity' className='form-label'>Quantity</Form.Label>
                        <Form.Control
                        type='number' value={item.quantity} className='form-control' id='itemQuantity' onChange={(e)=> setItem({...item,quantity:e.target.value})} placeholder='Enter quantity'
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className='col-6'>
                    <Form.Group className='mb-3'>
                        <Form.Label htmlFor='itemQuantity' className='form-label'>Unit Price</Form.Label>
                        <Form.Control
                        type='number' value={item.unitPrice} className='form-control' id='itemQuantity' onChange={(e)=> setItem({...item,unitPrice:e.target.value})} placeholder='Enter unit price'
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
                {/* <div className='col-6'>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Choose an Image</Form.Label>
                        <Form.Control type="file" value={item.image} onChange={e=>setItem({...item,image:e.target.files[0]})}/>
                    </Form.Group>
                </div> */}
            </div>
            
           
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={item.description} onChange={(e)=> setItem({...item,description:e.target.value})} placeholder='Enter specifications...' />
            </Form.Group>
                
            <Form.Group className="mb-3">
              <Form.Label htmlFor="itemName" className="form-label">
                Status
              </Form.Label>
              <Form.Select className="form-select" onChange={(e) => setItem({ ...item,status:e.target.value})}>
                <option selected disabled value={item.status}>
                 {item.status}
                </option>
                <option value={"Available"}>Available</option>
                <option value={"Not Available"}>Not Available</option>
              </Form.Select>
            </Form.Group>
            <Button type='submit' className="mt-3" variant='primary'>Update item</Button>
          </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditItem