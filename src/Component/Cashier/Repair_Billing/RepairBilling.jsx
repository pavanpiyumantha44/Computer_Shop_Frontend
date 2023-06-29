import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form,Table,Card,Badge,Modal,Button } from 'react-bootstrap';
import {toast,ToastContainer} from 'react-toastify';
import {FaFileInvoiceDollar} from 'react-icons/fa';
import RepairBillPDF from './RepairBillPDF';

const RepairBilling = () => {
 
  const [display,setDisplay] = useState(false);

  //Modal
  const [showModal,setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [lgShow, setLgShow] = useState(false);
  const [billModal,setBillModal] = useState(false);


  const handleLgShow = () => {
    setLgShow(true);
  };

  //Repair States
  const [repairs,setRepairs] = useState([]);


  useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/repairs/repairedWithoutPayment')
    .then(res=>{
        console.log(res);
        setRepairs(res.data.Result);
    })
    .catch(err=>{
        console.log(err);
    })
  },[display])

  //Check Completed Repairs
const [repID,setRepID] = useState('');
const [completedRepairs,setCompletedRepairs] = useState([]);
const [totalAmount,setTotalAmount] = useState(0);
const [userPaidAmount,setUserPaidAmount] = useState(0);
const [balance,setBalance] = useState(0);

const handleCompletedRepairs = (id)=>{
  axios.get('http://localhost:5000/dashboard/repairs/completedRepairs/'+id)
  .then(res=>{ 
    console.log(res);
    if(res.data.Result.length!==0){
      setLgShow(true);
      setCompletedRepairs(res.data.Result);
      setRepID(res.data.Result[0].repID);
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
        text: 'Something went wrong!!',
      })
    }
  })
  .catch(err=>{
    console.log(err);
  })
}
const handleBill = ()=>{
  if(userPaidAmount<=0||isNaN(userPaidAmount)){
    toast.error("Invalid Amount!!");
  }
  else{
    if(userPaidAmount>=totalAmount){
      var remain = parseFloat(userPaidAmount)-parseFloat(totalAmount);
      setBalance(remain);
      setLgShow(false);
      setBillModal(true);
    }
    else{
      var remainAmount = Math.abs(parseFloat(totalAmount)-parseFloat(userPaidAmount));
      toast.error("Pay more "+remainAmount+"/=");
    }
  }
}
const handleInvoice = ()=>{
  axios.post('http://localhost:5000/payments/repair/',{repID,totalAmount,userPaidAmount})
  .then(res=>{
    console.log(res);
    if(res.data.Status==="Success"){
      toast.success("Data Added Sucessfully!!");
      setBillModal(false);
      setUserPaidAmount(0);
    }
  })
  .catch(err=>{
    console.log(err);
  })

  axios.put('http://localhost:5000/dashboard/repairs/updateRepairedPayment/'+repID)
  .then(res=>{
    console.log(res);
  })
  .catch(err=>{
    console.log(err);
  })
}
  return (
    <>
    <div className="container" style={{height:'90vh'}}>

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
                            <th>Brand</th>
                            <th>Desc</th>
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
                                <td>{value.brandName}</td>
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
                      <div className='col-2 mx-5'></div>
                      <div className='col-4'>
                        <Form>
                          <Form.Control type='number' value={userPaidAmount} onChange={(e)=>setUserPaidAmount(e.target.value)}></Form.Control>
                        </Form>
                      </div>
                      <div className='col-3'>
                        <Button className='btn btn-success' onClick={handleBill}>Generate Invoice</Button>
                      </div>
                    </div>
                  </div>
                  </div>
                 
                </Modal.Body>
          </Modal>
        :
        ""
        }
      <Modal
        size="lg"
        show={billModal}
        onHide={() => setBillModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <button className='btn btn-success d-flex ms-auto mx-4' onClick={handleInvoice}>Save Data</button>
          <RepairBillPDF billData={completedRepairs} totalPrice={totalAmount} userPaid={userPaidAmount} Balance={balance}/> 
        </Modal.Body>
      </Modal>

      <ToastContainer
        position='top-right'
        draggable={false}
        autoClose={1000}
      />
      <h1 className="text-center m-3">Billing Repairs</h1>
      <Card>
        <Card.Header>
          <h3>Completed Repairs</h3>
        </Card.Header>
        <Card.Body>
            <Table striped>
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
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{value.cusName}</td>
                      <td>{value.categoryName}</td>
                      <td>{value.repair_details}</td>
                      <td>{value.receive_date.replace('T',' - ').substr(0,21)}</td>
                      <td><Button variant='success' title='bill' onClick={()=>handleCompletedRepairs(value.repID)}><FaFileInvoiceDollar/></Button></td>
                    </tr>
                  )
                })
              }
            </tbody>
            </Table>
          </Card.Body>
      </Card>
      
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