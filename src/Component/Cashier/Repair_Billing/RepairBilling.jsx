import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form,Table,Card,Badge,Modal,Button } from 'react-bootstrap';
import {toast,ToastContainer} from 'react-toastify';

const RepairBilling = () => {
 
  const [display,setDisplay] = useState(false);

  //Modal
  const [showModal,setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [lgShow, setLgShow] = useState(false);


  const handleLgShow = () => {
    setLgShow(true);
  };

  //Repair States
  const [repairs,setRepairs] = useState([]);
  
  useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/repairs/repaired')
    .then(res=>{
        console.log(res);
        setRepairs(res.data.Result);
    })
    .catch(err=>{
        console.log(err);
    })
  },[display])

  return (
    <>
    <div className="container">
      {/* <Modal
        show={showModal}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Item ID : {selectedItemId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
                <Form>
                    <Form.Group className='mb-3'>
                        <Form.Control type='text' value={selectedItemName} disabled></Form.Control>
                    </Form.Group>
                </Form>
            </div>
            <div className="col-4">
              <Form>
                <Form.Group>
                  <Form.Control
                    type="number"
                    size="20"
                    value={currentQty}
                    onChange={(e) => {setCurrentQty(e.target.value),setStockQty({...stockQty,qty:(availableStock-e.target.value)})}}
                  ></Form.Control>
                </Form.Group>
              </Form>
            </div>
            <div className="col-2">
            <Button variant="success" onClick={()=>{handleCart(selectedItemId,selectedItemName,selectedItemDesc,selectedItemPrice),handleClose()}}>+</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button className='btn btn-success mt-4' onClick={handleInvovice}>Save</button>
          <BillPDF billData={printData}/>
        </Modal.Body>
      </Modal> */}
      <ToastContainer
        position='top-right'
        draggable={false}
        autoClose={1000}
      />
      <h1 className="text-center m-3">Billing Repairs</h1>
      <div className='row'>
        <div className='col-6'>
        <Card>
        <Card.Header>
          <div className='row'>
            <h4>Repaird list</h4>
          </div>
        </Card.Header>
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Issue</th>
                <th>Received Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                repairs.map((value,index)=>{
                  return(
                    <tr>
                      <td>{index+1}</td>
                      <td>{value.cusName}</td>
                      <td>{value.categoryName}</td>
                      <td>{value.repair_details}</td>
                      <td>{value.receive_date.replace('T',' - ').substr(0,21)}</td>
                      <td><Button variant='success'>+</Button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          </Card.Body>
        </Card>
        </div>
        <div className='col-6'>
        <Card>
        <Card.Header>
          <div className='row'>
            <h4>Repaird list</h4>
          </div>
        </Card.Header>
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Issue</th>
                <th>Received Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                repairs.map((value,index)=>{
                  return(
                    <tr>
                      <td>{index+1}</td>
                      <td>{value.cusName}</td>
                      <td>{value.categoryName}</td>
                      <td>{value.repair_details}</td>
                      <td>{value.receive_date.replace('T',' - ').substr(0,21)}</td>
                      <td><Button variant='success'>+</Button></td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          </Card.Body>
        </Card>
        </div>
      </div>
    </div>
    {/* Footer */}
    <div className='container-fluid px-0 shadow-sm w-100 mt-4'>
      <div className='row flex-nowrap'>
        <div className='d-flex px-0'>
            <div className="card card-body text-center text-light bg-dark">
              <h6 className="card-title"><span>&#169;</span> All Rights Reserved</h6>
            </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default RepairBilling