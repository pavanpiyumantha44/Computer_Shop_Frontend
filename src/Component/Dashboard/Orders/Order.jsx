import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";
import {Form, Card, Table, Badge,Button,Modal, Pagination } from 'react-bootstrap';
import {AiFillEye} from "react-icons/ai"
import {BsFillTrashFill} from "react-icons/bs";
import {AiOutlineSend} from "react-icons/ai";
import Swal from 'sweetalert2';

const Order = () => {

    const[orders,setOrders] = useState([]);
    const[loading,setLoading] = useState(true);
    const[search,setSearch] = useState('');
    const[display,setDisplay] = useState(false);
    const[customer,setCustomer] = useState([]);
    const[currOrder,setCurrOrder] = useState([]);
    const[mail,setMail] = useState({
      name:'',
      email:'',
      brand:'',
      category:'',
      qty:'',
      description:'',
      unitPrice:'',
      advancePayment:'',
      totalAmount:'',
      remainPayment:'',
      
    })
    const navigate = useNavigate();

    const [lgShow, setLgShow] = useState(false);
    const handleClose = ()=>{
        setLgShow(false);
    }

    //Mange Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5; // Number of items to display per page

    const filteredData = orders.filter((item) =>
    item.cusName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };
  
    useEffect(()=>{
      axios.get('http://localhost:5000/dashboard/orders')
      .then(res=>{
        console.log(res);
        setOrders(res.data.Result);
        //setCustomer(res.data.Result.cusID)
        setLoading(false);
      })
      .catch(err=>{
        console.log(err);
      })
    },[display])
  
  const getCustomer = (id)=>{
    axios.get('http://localhost:5000/dashboard/customer/read/'+id)
    .then(res=>{
        setCustomer(res.data.Result[0]);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  const getSpecificOrder = (id)=>{
    axios.get('http://localhost:5000/dashboard/orders/read/'+id)
    .then(res=>{
      console.log(res)
      setCurrOrder(res.data.Result[0]);
      setMail({
        ...mail,
        name:res.data.Result[0].cusName,
        email:res.data.Result[0].cusEmail,
        brand:res.data.Result[0].brandName,
        category:res.data.Result[0].categoryName,
        qty:res.data.Result[0].ordQty,
        description:res.data.Result[0].description,
        unitPrice:res.data.Result[0].unitPrice,
        advancePayment:res.data.Result[0].advance,
        totalAmount:res.data.Result[0].totalPrice,
        remainPayment:Number(res.data.Result[0].totalPrice)-Number(res.data.Result[0].advance)
      })
    })
    .catch(err=>{
      console.log(err);
    })
  }
  const hanldeDelete = (id)=>{
    axios.delete('http://localhost:5000/dashboard/orders/delete/'+id)
    .then(res=>{
      console.log(res);
        if(res.data.Status==="Success")
        {
              toast.success("Deleted successfully!!");
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
  const handleLoadingAnimation = ()=>{
    let timerInterval
    Swal.fire({
      html: '<b>Sending Email...</b>',
      timer: 2800,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          // b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('Sending Email..')
      }
    })
  }
  const handleEmail = ()=>{
    handleClose();
    handleLoadingAnimation();
    axios.post('http://localhost:5000/mail/orderConfirmation/',mail)
    .then(res=>{
      console.log(res);
      if(res.data.Status==="Success"){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Email sent successfully !!',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    })
    .catch(err=>{
      console.log(err);
    })
    //console.log(mail);
  }
  return (
    <div>
      <ToastContainer
        position="top-center"
        draggable={false}
        autoClose={1000}
      />
      {loading ? (
        <div className="alignment">
          <PulseLoader color={"#1444e0"} loading={loading} size={15} />
        </div>
      ) : (
        <div>
          <div className="px-5 mt-5">
            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  Order ID : {currOrder.ordID}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row text-center shadow">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-6 border p-1">
                        <h4 className="text-center fw-bold">Customer</h4>
                        <h5>Customer ID : {currOrder.cusID}</h5>
                        <h5>Name : {customer.name}</h5>
                        <h5>Email : {customer.email}</h5>
                        <h5>Address : {customer.address}</h5>
                        <h5>Contact : {customer.mobile}</h5>
                      </div>
                      <div className="col-6 border p-1">
                        <h4 className="text-center fw-bold">Item</h4>
                        <h5>Brand : {currOrder.brandName}</h5>
                        <h5>Category : {currOrder.categoryName}</h5>
                        <h5>Description : {currOrder.description}</h5>
                        <h5>Quantity : {currOrder.ordQty}</h5>
                        <h5>Advance : {currOrder.advance}</h5>
                        <h5>Unit Price : {currOrder.unitPrice}</h5>
                        <h5>
                          Status:{" "}
                          {currOrder.status == 1 ? (
                            <Badge bg="warning">Pending</Badge>
                          ) : (
                            <Badge bg="success">Approved</Badge>
                          )}
                        </h5>
                      </div>
                    </div>
                    <Button
                      variant="secondary"
                      className="mx-3 m-3"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      className="mx-3"
                      onClick={handleEmail}
                    >
                    Send Confirmation Email <AiOutlineSend/>
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <div className="d-flex justify-content-end">
              <Link to="/dashboard/orders/" className="btn btn-success mx-5">
                <i className="bi bi-file-earmark-spreadsheet mx-2"></i>Export to
                Excel
              </Link>
              <Link to="/dashboard/orders/add/" className="btn btn-primary">
                Add New<i className="bi bi-plus-square mx-2"></i>
              </Link>
            </div>
          </div>
          <div className="mt-4 px-5 pt-3">
            <Card className="shadow-sm mb-4">
              <Card.Header>
                <div className="row">
                  <div className="col-md-8">
                    <h3>Orders</h3>
                  </div>
                  <div className="col-md-4">
                    <Form>
                      <Form.Control
                        type="text"
                        onChange={handleSearchChange}
                        className="form-control w-100"
                        placeholder="Search Brand..."
                      />
                    </Form>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Quantitiy</th>
                      <th>Advance</th>
                      <th>Unit Price</th>
                      <th>Status</th>
                      <th colSpan={3} className='text-center'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((values, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{values.cusName}</td>
                            <td>{values.cusMobile}</td>
                            <td>{values.brandName}</td>
                            <td>{values.categoryName}</td>
                            <td>{values.description}</td>
                            <td>{values.ordQty}</td>
                            <td>{values.advance}</td>
                            <td>{values.unitPrice}</td>
                            <td>
                              {values.status === 1 ? (
                                <Badge bg="warning">Pending</Badge>
                              ) : (
                                <Badge bg="success">Approved</Badge>
                              )}
                            </td>
                            <td className='px-0'>
                              <button
                                className="btn btn-success"
                                title="view"
                                onClick={() => {
                                  setLgShow(true),
                                    getCustomer(values.cusID),
                                    getSpecificOrder(values.ordID);
                                }}
                              >
                                <AiFillEye />
                              </button>
                        
                            </td>
                            <td className='px-0'>
                            <Link
                                to={"/dashboard/orders/read/" + values.ordID}
                                className="btn btn-primary mx-2"
                                title="edit"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
                            </td>
                            <td className='px-0'><button
                                className="btn btn-danger"
                                title="delete"
                                onClick={() => hanldeDelete(values.ordID)}
                              >
                                <BsFillTrashFill />
                              </button></td>
                          </tr>
                        );
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
      )}
    </div>
  );
}

export default Order;