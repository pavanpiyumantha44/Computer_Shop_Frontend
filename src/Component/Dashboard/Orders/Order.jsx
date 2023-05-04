import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";
import {Form, Card, Table, Badge,Button,Modal } from 'react-bootstrap';
import {AiFillEye} from "react-icons/ai"
import {BsFillTrashFill} from "react-icons/bs";

const Order = () => {

    const[orders,setOrders] = useState([]);
    const[loading,setLoading] = useState(true);
    const[search,setSearch] = useState('');
    const[display,setDisplay] = useState(false);
    const [customer,setCustomer] = useState([]);
    const[currOrder,setCurrOrder] = useState([]);
    const navigate = useNavigate();

    const [lgShow, setLgShow] = useState(false);
    const handleClose = ()=>{
        setLgShow(false);
    }

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
              size='lg'
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
                <div className='row text-center shadow'>
                  <div className='col-12'>
                    <div className='row'>
                      <div className='col-6 border p-1'>
                        <h4 className='text-center fw-bold'>Customer</h4>
                        <h5>Customer ID : {currOrder.cusID}</h5>
                        <h5>Name : {customer.name}</h5>
                        <h5>Address : {customer.address}</h5>
                        <h5>Contact : {customer.mobile}</h5>
                      </div>
                      <div className='col-6 border p-1'>
                      <h4 className='text-center fw-bold'>Item</h4>
                        <h5>Brand : {currOrder.brand}</h5>
                        <h5>Category : {currOrder.category}</h5>
                        <h5>Description : {currOrder.description}</h5>
                        <h5>Quantity : {currOrder.qty}</h5>
                        <h5>Category : {currOrder.category}</h5>
                        <h5>Advance : {currOrder.advance}</h5>
                        <h5>Unit Price : {currOrder.unitPrice}</h5>
                        <h5>Status: {currOrder.status==1?<Badge bg="warning">Pending</Badge>:<Badge bg="success">Approved</Badge>}</h5>
                      </div>
                    </div>
                      <Button variant="secondary" className='mx-3 m-3' onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="success" className='mx-3' onClick={handleClose}>
                        <i className='bi bi-printer mx-2'></i>Print
                      </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
            <div className="d-flex justify-content-end">
              <Link to="/dashboard/orders/" className="btn btn-success mx-5">
                <i class="bi bi-file-earmark-spreadsheet mx-2"></i>Export to
                Excel
              </Link>
              <Link to="/dashboard/orders/add/" className="btn btn-primary">
                Add New<i class="bi bi-plus-square mx-2"></i>
              </Link>
            </div>
          </div>
          <div className="mt-4 px-5 pt-3">
            <Card className="shadow-sm">
              <Card.Header>
                <div className="row">
                  <div className="col-md-8">
                    <h3>Orders</h3>
                  </div>
                  <div className="col-md-4">
                    <Form>
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                        className="form-control w-100"
                        placeholder="Search Brand..."
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
                      <th>CUS ID</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Quantitiy</th>
                      <th>Advance</th>
                      <th>Unit Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders
                      .filter((values) => {
                        return search.toLowerCase() === ""
                          ? values
                          : values.name.toLowerCase().includes(search);
                      })
                      .map((values, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>CUS-{values.cusID}</td>
                            <td>{values.brand}</td>
                            <td>{values.category}</td>
                            <td>{values.description}</td>
                            <td>{values.qty}</td>
                            <td>{values.advance}</td>
                            <td>{values.unitPrice}</td>
                            <td>
                              {values.status === 1 ? (
                                <Badge bg="warning">Pending</Badge>
                              ) : (
                                <Badge bg="success">Approved</Badge>
                              )}
                            </td>
                            <td>
                              <button className="btn btn-success" title="view" onClick={() => {setLgShow(true),getCustomer(values.cusID),getSpecificOrder(values.ordID)}}>
                                <AiFillEye/>
                              </button>
                              <Link
                                to={"/dashboard/orders/read/" + values.ordID}
                                className="btn btn-primary mx-2"
                                title="edit"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
                              <button
                                className="btn btn-danger"
                                title="delete"
                                onClick={() => hanldeDelete(values.itemID)}
                              >
                                <BsFillTrashFill/>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default Order;