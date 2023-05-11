import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";
import {Button,Form,Card,Table, Badge, Modal} from 'react-bootstrap';
import { AiFillEye } from 'react-icons/ai';

const ShowRepairs = () => {
  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true);
  const [display,setDisplay] = useState(false);
  const [items,setItems] = useState([]);
  const [repID,setRepID] = useState();
  const [repDetails,setRepDetails] = useState({
    issue:'',
    added_items:'',
    service_charge:'',
  })

  //Modal states
  const [lgShow, setLgShow] = useState(false);
  const handleClose = ()=>{
        setLgShow(false);
  }
  useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/repairs/active')
    .then(res=>{
      console.log(res);
      if(res.data.Result.length>0){
        setData(res.data.Result)
      }
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
    })
    axios.get('http://localhost:5000/dashboard/items')
    .then(res=>{
        setItems(res.data.Result);
        console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
  },[display])
  
  const handleDisplay = ()=>{
    if(!display)
    {
      setDisplay(true);
    }
    else{
      setDisplay(false);
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(repDetails.issue===""||repDetails.added_items===""||repDetails.service_charge===""){
      toast.error("Please Fill All The Fields!!")
    }
    else if(isNaN(repDetails.service_charge)){
      toast.error("Invalid Service Charge!!");
    }
    else{
      axios.put('http://localhost:5000/dashboard/repairs/update/'+repID,repDetails)
      .then(res=>{
        console.log(res);
        handleDisplay();
        if(res.data.Status === "Success"){
          toast.success("Repair Completed!!");
          setLgShow(false);
        }
        else{
          toast.error("Something Went Wrong!!");
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
  return (
    <div>
      <ToastContainer
        position='top-center'
        draggable={false}
        autoClose={1000}
      />
      {loading ?
        <div className='alignment'>
        <PulseLoader color={'#1444e0'} loading={loading} size={15}/>
        </div>  
        :
      <div>
         <Modal
              size='lg'
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  Repair ID : {repID}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {/* <div className='row'>
                <div className='col-6'>
                <Form.Group className='mb-3'>
                  <Form.Label>
                    Select Products
                  </Form.Label>
                  <Form.Select onChange={e=>{setSelectItem(e.target.value)}}>
                    {items.map((values)=>{
                      return(
                        <option value={values.name}>{values.name}</option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                </div>
                <div className='col-4'>
                  <Form.Group className='mb-3'>
                    <Form.Label>Select Quantity</Form.Label>
                    <Form.Control type='number'></Form.Control>
                  </Form.Group>
                </div>
                <div className='col-2 mt-1'>
                  <Button variant='success' className='mt-4' onClick={()=>addItems()}>+</Button>
                </div>
              </div> */}
              <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>
                      Repair Issue
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter Repair Issue' onChange={(e)=>setRepDetails({...repDetails,issue:e.target.value})}></Form.Control>

                  </Form.Group>
                  <Form.Group className='mb-3' controlId="exampleForm.ControlTextarea1">
                    <Form.Label>
                      Added Items
                    </Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder='Enter Added Items' onChange={(e)=>setRepDetails({...repDetails,added_items:e.target.value})}></Form.Control>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>
                      Service Charge
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter Service Charge' onChange={(e)=>setRepDetails({...repDetails,service_charge:e.target.value})}></Form.Control>
                  </Form.Group>
                  <Button type='submit' variant='success'>Complete Repair</Button>
               </Form>
              </Modal.Body>
            </Modal>
        <h1 className='px-5 mt-4'>Available Repairs</h1>
        <div className='mt-4 px-5 pt-3'>
            <Card className='shadow-sm'>
              <Card.Header>
                <div className='row'>
                  <div className='col-8'>
                    <h3>Repair List</h3>
                  </div>
                </div>  
              </Card.Header>
              <Card.Body>
                <Table striped>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Category ID</th>
                    <th>Repair Details</th>
                    <th>Addedd Items</th>
                    <th>Received Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length>=0?data.map((value,index)=>{
                    return(
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>CAT-{value.catID}</td>
                      <td>{value.repair_details===null?<Badge bg="warning">Pending</Badge>:value.repair_details}</td>
                      <td>{value.added_items===null?<Badge bg="warning">Pending</Badge>:value.added_items}</td>
                      <td>{value.receive_date.substr(0,10)}</td>
                      <td>{value.status===0?<Badge bg="warning">Pending</Badge>:<Badge bg='success'>Repaired</Badge>}</td>
                      <td>
                      <button className="btn btn-success" title="view" onClick={() => {setLgShow(true),setRepID(value.repID)}}>
                                <AiFillEye/>
                              </button>
                      </td>
                    </tr>)
                  }):"Not Available Repairs"}   
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
        </div>
      </div>
      }
    </div>
  )
}

export default ShowRepairs