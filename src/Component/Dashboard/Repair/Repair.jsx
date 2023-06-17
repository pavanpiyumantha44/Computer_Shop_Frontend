import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";
import {Button,Form,Card,Table, Badge, Pagination, Modal} from 'react-bootstrap';
import {AiFillEye} from "react-icons/ai"
import {AiOutlineSend} from 'react-icons/ai';
import Swal from 'sweetalert2';
const Repair = () => {
  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const[search,setSearch] = useState('');
  const [display,setDisplay] = useState(false);

 //Manage Pagination
 const [currentPage, setCurrentPage] = useState(1);
 const [searchTerm, setSearchTerm] = useState('');
 const itemsPerPage = 5; // Number of items to display per page

 const filteredData = data.filter((value) =>
 value.cusName.toLowerCase().includes(searchTerm.toLowerCase())||value.cusNIC.toLowerCase().includes(searchTerm.toLowerCase())
);
const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const pageNumbers = [];

for (let i = 1; i <= totalPages; i++) {
 pageNumbers.push(i);
}

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentRepairs = filteredData.slice(indexOfFirstItem, indexOfLastItem);

// Change page
const handlePageChange = (pageNumber) => {
 setCurrentPage(pageNumber);
};

// Handle search input change
const handleSearchChange = (e) => {
 setSearchTerm(e.target.value);
 setCurrentPage(1); // Reset to first page when search term changes
};

//Check Completed Repairs
const [completedRepairs,setCompletedRepairs] = useState([]);
const [totalAmount,setTotalAmount] = useState(0);


const handleCompletedRepairs = (id)=>{
  axios.get('http://localhost:5000/dashboard/repairs/completedRepairs/'+id)
  .then(res=>{
    console.log(res);
    if(res.data.Result.length!==0){
      setLgShow(true);
      setCompletedRepairs(res.data.Result);
      
      var itemPrice=null;
      for(let i=0; i<res.data.Result.length; i++){
        itemPrice+=(res.data.Result[i].item_qty*res.data.Result[i].itemPrice);
      }
      setTotalAmount(itemPrice+res.data.Result[0].service_charge)
    }
    else{
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Wait until technician complete the repair!',
      })
    }
  })
  .catch(err=>{
    console.log(err);
  })
}

//Handle Modal

const [lgShow, setLgShow] = useState(false);
    const handleClose = ()=>{
        setLgShow(false);
    }


  useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/repairs')
    .then(res=>{
      console.log(res);
      setData(res.data.Result)
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
    })
  },[display])
  const handleDelete = (id)=>{
    axios.delete('http://localhost:5000/dashboard/repairs/delete/'+id)
    .then(res=>{
      console.log(res);
      if(res.data.Status === "Success")
      {
        toast.success("Deleted!!");
        if(!display)
        {
          setDisplay(true);
        }
        else{
          setDisplay(false);
        }
      }
    })
    .catch(err=>{
      console.log(err);
    })
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

        {/* Modal */}
        { completedRepairs.length!==0?
          <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">
                  Repair ID : {1}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className='shadow py-4'>
                  <div className='row'>
                    <h3 className='text-center mb-3'>Repair Details</h3>
                    <div className='col-3'></div>
                    <div className='col-3'>
                      <h5>Name :</h5>
                      <h5>NIC :</h5>
                      <h5>Email :</h5>
                      <h5>Received Item : </h5>
                      <h5>Received Date : </h5>
                      <h5>Service Charge : </h5> 
                      <h5>Repair Details : </h5> 
                    </div>
                    <div className='col-4'>
                      <h5>{completedRepairs[0].cusName}</h5>
                      <h5>{completedRepairs[0].cusNIC}</h5>
                      <h5>{completedRepairs[0].cusEmail}</h5>
                      <h5>{completedRepairs[0].categoryName}</h5>
                      <h5>{completedRepairs[0].receive_date.substr(0,10)}</h5>
                      <h5 className='text-success fw-bold'>{completedRepairs[0].service_charge} /=</h5>
                      <h5 className='text-danger fw-bold'>{completedRepairs[0].repair_details}</h5>

                    </div>
                    <div className='col-2'></div>
                  </div>
                  <div className='row my-4'>
                    <div className='col-2'></div>
                    <div className='col-8'>
                      <h5 className='text-center fw-bold'>Added Items</h5>
                      <Table className='table shadow-sm mb-5' striped>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Item</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          completedRepairs.map((value,index)=>{
                            return(
                              <tr key={index}>
                                <td>{index+1}</td>
                                <td>{value.itemdesc}</td>
                                <td>{value.itemPrice}</td>
                                <td>{value.item_qty}</td>
                                <td>{value.item_qty*value.itemPrice}</td>
                              </tr>
                            )
                          })
                        }
                        </tbody>
                      </Table>
                      {/* <h5 className='text-success fw-bold text-center my-4 text-decoration-underline'>Total Amount : {completedRepairs[0].service_charge+((completedRepairs[0].itemPrice*completedRepairs[0].item_qty)+(completedRepairs[1].itemPrice*completedRepairs[1].item_qty))} /=</h5> */}
                      <h5 className='text-success fw-bold text-center my-4 text-decoration-underline'>Total Amount : {totalAmount}/=</h5>
                    </div>
                    <div className='col-2'></div>
                    <div className='row'>
                      <div className='col-3 mx-2'></div>
                      <div className='col-6 ms-5'>
                      <Button variant='primary' className=''>Send Confirmation Email <AiOutlineSend/></Button>
                      </div>
                      <div className='col-3'></div>
                    </div>
                  </div>
                  </div>
                 
                </Modal.Body>
          </Modal>
        :
        ""
        }

        <h1 className='px-5 mt-4'>Repair</h1>
        <div className='px-5 mt-2'>
          <div className='d-flex justify-content-end'>
            <Link to='/dashboard/repairs/' className='btn btn-success mx-3'><i className="bi bi-file-earmark-spreadsheet mx-2"></i>Export to Excel</Link>
            <Link to='/dashboard/repairs/add' className='btn btn-primary mx-3'>Add New<i className="bi bi-plus-square mx-2"></i></Link>
          </div>
        </div>
        <div className='mt-4 px-5 pt-3'>
            <Card className='shadow-sm'>
              <Card.Header>
                <div className='row'>
                  <div className='col-8'>
                    <h3>Repair List</h3>
                  </div>
                  <div className='col-4'>
                  <Form>
                      <Form.Control
                        type="text"
                        onChange={handleSearchChange}
                        className="form-control w-100"
                        placeholder="Search Repair..."
                      />
                    </Form>
                  </div>
                </div>  
              </Card.Header>
              <Card.Body>
                <Table striped>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Customer</th>
                    <th>Category ID</th>
                    <th>Repair Details</th>
                    <th>Received Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRepairs.map((value,index)=>{
                    return(
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{value.cusName}</td>
                      <td>{value.categoryName}</td>
                      <td>{value.repair_details===null?<Badge bg="warning">Pending</Badge>:value.repair_details}</td>
                      <td>{value.receive_date.replace('T',' - ').substr(0,21)}</td>
                      <td>{value.status===0?<Badge bg="warning">Pending</Badge>:<Badge bg='success'>Repaired</Badge>}</td>
                      <td>
                        <Button variant='success' title='View Repair' onClick={()=>handleCompletedRepairs(value.repID)}><AiFillEye/></Button>
                        <Link to={`/dashboard/repairs/read/${value.repID}`} className='btn btn-primary mx-2'><i className='bi bi-pencil'></i></Link>
                        <Button variant='danger' onClick={()=>{handleDelete(value.repID)}}><i className='bi bi-trash'></i></Button>
                      </td>
                    </tr>)
                  })}   
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
      }
    </div>
  )
}

export default Repair