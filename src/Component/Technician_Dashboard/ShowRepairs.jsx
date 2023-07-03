import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";
import {Button,Form,Card,Table, Badge, Modal, Pagination} from 'react-bootstrap';
import { AiFillEye } from 'react-icons/ai';
import {BsFillTrash3Fill} from 'react-icons/bs';
import DoughnutChart from '../Dashboard/Charts/DoughnutChart'


const ShowRepairs = () => {
  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true);
  const [display,setDisplay] = useState(false);
  const [items,setItems] = useState([]);
  const [repID,setRepID] = useState();

  //Manage Stat Cards

  const [availableRepairCount,setAvailableRepairCount] = useState(0);
  const [completedRepairCount,setCompletedRepairCount] = useState(0);
 

  const [repDetails,setRepDetails] = useState({
    issue:'',
    service_charge:'',
  })

  const [addedItems,setAddedItems] = useState({
    itemID:'',
    qty:''
  });

  const [itemList,setItemList] = useState([]);
  const [earn,setEarn] = useState(0);
  //Handle Items List Functions

  const handleItemList = () => {
    if(addedItems.itemID===''|| addedItems.qty===''){
      toast.error("Select item and qty !!");
    }
    else if(addedItems.qty<=0||isNaN(addedItems.qty)){
      toast.error("Invalid Qty");
    }
    else{
    var isFound = false;
    var existKey = null;
    var qty = Number(addedItems.qty);
    itemList.filter((value,index)=>{
        if(value.itemID===addedItems.itemID){
            isFound = true;
            existKey = index;
        }
    })
    if(!isFound){  
        itemList.push({repairID:repID,itemID:addedItems.itemID,qty:qty})
    }
    else{
      itemList[existKey].qty += qty;
    }
  }
  if(!display){
    setDisplay(true);
  }
  else{
    setDisplay(false);
  }
  };
  const removeItems = (id)=>{
    if(!display){
      itemList.pop(id)
      setDisplay(true)
    }
    else{
      itemList.pop(id)
      setDisplay(false)
    }
  }

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
    axios.get('http://localhost:5000/dashboard/repairs/availableRepairCount')
    .then(res=>{
      console.log(res);
      setAvailableRepairCount(res.data.Result[0].available);
    })
    .catch(err=>{
      console.log(err);
    })
    axios.get('http://localhost:5000/dashboard/repairs/completedRepairCount')
    .then(res=>{
      console.log(res);
      setCompletedRepairCount(res.data.Result[0].completed);
    })
    .catch(err=>{
      console.log(err);
    })
    axios.get('http://localhost:5000/dashboard/getReport/totalTechnicianEarning')
    .then(res=>{
      console.log(res);
      setEarn(res.data.Result[0].total);
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
    else if(isNaN(repDetails.service_charge)||repDetails.service_charge<=0){
      toast.error("Invalid Service Charge!!");
    }
    else{
      axios.put('http://localhost:5000/dashboard/repairs/updateRepaired/'+repID,repDetails)
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
      axios.post('http://localhost:5000/dashboard/repairs/addedItems',itemList)
      .then(res=>{
        console.log(res);
      })
      .catch(err=>{
        console.log(err);
      })
      console.log(repDetails);
      console.log(itemList);
    }
  }

  //Manage Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5; // Number of items to display per page

  const filteredData = data.filter((value) =>
  value.cusName.toLowerCase().includes(searchTerm.toLowerCase())||value.nic.toLowerCase().includes(searchTerm.toLowerCase())
);
const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const pageNumbers = [];

for (let i = 1; i <= totalPages; i++) {
  pageNumbers.push(i);
}

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentRepair = filteredData.slice(indexOfFirstItem, indexOfLastItem);

// Change page
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

// Handle search input change
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
  setCurrentPage(1); // Reset to first page when search term changes
};

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
                        <Form.Select onChange={(e)=>setAddedItems({...addedItems,itemID:e.target.value})}>
                          <option defaultValue={""} selected disabled>_Select_</option>
                          {
                            items.map((value,index)=>{
                              return(
                                <option value={value.itemID} key={index}>{value.name}</option>
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
                          onChange={(e)=>setAddedItems({...addedItems,qty:e.target.value})}
                        ></Form.Control>
                      </Form.Group>
                    </div>
                    <div className='col-2'>
                      <Form.Group className=' mt-4 mb-3'>
                          <Button variant='success' className='mt-2' onClick={handleItemList}>+</Button>
                      </Form.Group>
                    </div>
                  </div>
                  {/* <Form.Group className='mb-3' controlId="exampleForm.ControlTextarea1">
                    <Form.Label>
                      Added Items
                    </Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder='Enter Added Items' value={textareaValue}></Form.Control>
                  </Form.Group> */}
                  <Form.Group className='mb-3 shadow-sm'>
                    <Table className='table text-center'>
                      <thead>
                        <tr>
                          <th>Item ID</th>
                          <th>Qty</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        itemList.map((value,index)=>{
                          return(
                            <tr key={index}>
                              <td>{value.itemID}</td>
                              <td>{value.qty}</td>
                              <td><Button variant='danger' onClick={()=>{removeItems(index)}}><BsFillTrash3Fill/></Button></td>
                            </tr>
                          )
                        })
                      }
                      </tbody>
                    </Table>
                  </Form.Group>
                  <Form.Group className='mb-3'>
                    <Form.Label>
                      Service Charge
                    </Form.Label>
                    <Form.Control type='number' placeholder='Enter Service Charge' onChange={(e)=>setRepDetails({...repDetails,service_charge:e.target.value})}></Form.Control>
                  </Form.Group>
                  <Button type='submit' variant='success'>Complete Repair</Button>
               </Form>
              </Modal.Body>
        </Modal>
        
        <div className='mt-4 px-5 pt-3'>
          <div className='row mb-3 ms-5'>
            <div className='col-4'>
              <div className='px-4 py-3 rounded w-75 shadow' style={{background:"rgba(50, 223, 91, 0.8)"}}>
                <div>
                  <p className='fs-5 fw-bold text-light text-center'>Completed Reparis</p>
                  <h1 className='text-center text-light'>{completedRepairCount}</h1>
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='px-4 py-3 rounded w-75 shadow' style={{background:"rgba(229, 69, 69, 0.8)"}}>
                <div>
                  <p className='fs-5 fw-bold text-light text-center'>Available Reparis</p>
                  <h1 className='text-center text-light'>{availableRepairCount}</h1>
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='px-4 py-3 rounded w-75 shadow'  style={{background:"rgba(55, 90, 229, 0.8)"}}>
                <div>
                  <p className='fs-5 fw-bold text-light text-center'>Total Earnings</p>
                  <h1 className='text-center text-light'>{earn}$</h1>
                </div>
              </div>
            </div>
          </div>
          <div className='row px-5 pt-3'>
            <div className='col-12 col-md-4 mt-3'>
              <DoughnutChart/>
            </div>
            <div className='col-12 col-md-8 p-3'>
              <Card className='shadow-sm mb-5 pb-5'>
              <Card.Header>
                <div className='row'>
                  <div className='col-8'>
                    <h3>Repair List</h3>
                  </div>
                </div>  
              </Card.Header>
              <Card.Body>
                <Table striped responsive>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Customer</th>
                    <th>Received Item</th>
                    <th>Repair Details</th>
                    <th>Received Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRepair.length>=0?currentRepair.map((value,index)=>{
                    return(
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{value.cusName}</td>
                      <td>{value.categoryName}</td>
                      <td>{value.repair_details===null?<Badge bg="warning">Pending</Badge>:value.repair_details}</td>
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
                <Pagination>
                <Pagination.First onClick={() => handlePageChange(1)} />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {pageNumbers.map((pageNumber) => (
                  <Pagination.Item
                    key={pageNumber}
                    active={pageNumber === currentPage}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last onClick={() => handlePageChange(totalPages)} />
                </Pagination>
              </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <br/><br/><br/>
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