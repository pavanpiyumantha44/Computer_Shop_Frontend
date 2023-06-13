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

  const [dropdownValue, setDropdownValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const [repDetails,setRepDetails] = useState({
    issue:'',
    added_items:'',
    service_charge:'',
  })

  // const handleDropdownChange = (event) => {
  //   setDropdownValue(event.target.value);
  // };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInsertClick = () => {
    setTextareaValue((prevTextareaValue) =>
      prevTextareaValue + dropdownValue + ' - ' + inputValue + ' | '
    );
    setRepDetails({...repDetails,added_items:textareaValue})
    setDropdownValue('');
    setInputValue('');
  };

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
      // axios.put('http://localhost:5000/dashboard/repairs/update/'+repID,repDetails)
      // .then(res=>{
      //   console.log(res);
      //   handleDisplay();
      //   if(res.data.Status === "Success"){
      //     toast.success("Repair Completed!!");
      //     setLgShow(false);
      //   }
      //   else{
      //     toast.error("Something Went Wrong!!");
      //   }
      // })
      // .catch(err=>{
      //   console.log(err);
      // })
      console.log(repDetails);
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
        <div className='alignment' style={{marginLeft:"50%"}}>
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
                  <div className='row'>
                    <div className='col-4'>
                      <Form.Group className='mb-3'>
                        <Form.Label>Select Item</Form.Label>
                        <Form.Select value={dropdownValue} onChange={(e)=> setDropdownValue(e.target.value)}>
                          {
                            items.map((value)=>{
                              return(
                                <option value={value.name}>{value.name}</option>
                              )
                            })
                          }
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <div className='col-4'>
                      <Form.Group className='mb-3'>
                        <Form.Label>Qty</Form.Label>
                        <Form.Control
                          type='number'
                          value={inputValue}
                          onChange={handleInputChange}
                        ></Form.Control>
                      </Form.Group>
                    </div>
                    <div className='col-2'>
                      <Form.Group className=' mt-4 mb-3'>
                          <Button variant='success' className='mt-2' onClick={handleInsertClick}>+</Button>
                      </Form.Group>
                    </div>
                  </div>
                  <Form.Group className='mb-3' controlId="exampleForm.ControlTextarea1">
                    <Form.Label>
                      Added Items
                    </Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder='Enter Added Items' value={textareaValue}></Form.Control>
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
        {/* <h1 className='px-5 mt-4'>Available Repairs</h1> */}
        <div className='mt-4 px-5 pt-3'>
          <div className='row mb-5 ms-5'>
            <div className='col-4'>
              <div className='px-4 py-3 rounded w-75 shadow' style={{background:"rgba(50, 223, 91, 0.8)"}}>
                <div>
                  <p className='fs-5 fw-bold text-light text-center'>Completed Reparis</p>
                  <h1 className='text-center text-light'>{0}</h1>
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='px-4 py-3 rounded w-75 shadow' style={{background:"rgba(55, 90, 229, 0.8)"}}>
                <div>
                  <p className='fs-5 fw-bold text-light text-center'>Available Reparis</p>
                  <h1 className='text-center text-light'>{0}</h1>
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='px-4 py-3 rounded w-75 shadow' style={{background:"rgba(229, 69, 69, 0.8)"}}>
                <div>
                  <p className='fs-5 fw-bold text-light text-center'>Available Reparis</p>
                  <h1 className='text-center text-light'>{0}</h1>
                </div>
              </div>
            </div>
          </div>
            <Card className='shadow-sm mb-5'>
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
        </div><br/><br/><br/>
        <div className='container-fluid px-0 shadow-sm w-100'>
        <div className='row flex-nowrap'>
          <div className='d-flex px-0'>
              <div className="card card-body text-center text-light bg-dark p-4">
                <h6 className="card-title"><span>&#169;</span> All Rights Reserved</h6>
              </div>
          </div>
        </div>
        </div>
      </div>
      }
    </div>
  )
}

export default ShowRepairs