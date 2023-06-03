import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form,Table,Card,Badge,Modal,Button } from 'react-bootstrap';
// import './Billing.css';
import {toast,ToastContainer} from 'react-toastify';
import BillPDF from './BillPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';

const Billing = () => {
  const [data,setData] = useState([]);
  const [total,setTotal] = useState(0);
  const [subtotal,setSubtotal] = useState(0);
  const [display,setDisplay] = useState(false);
  const [items,setItems] = useState([]);
  const [search,setSearch] = useState('');
  const [currentQty,setCurrentQty] = useState(0);

  //Modal
  const [showModal,setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  //Handle Cart

  const [selectedItemId,setSelectedItemId] = useState();
  const [selectedItemName,setSelectedItemName] = useState();
  const [selectedItemDesc,setSelectedItemDesc] = useState();
  const [selectedItemPrice,setSelectedItemPrice] = useState();
  const [availableStock,setAvailableStock] = useState();
  const [updateQty,setUpdateQty] = useState({qty:'2'});
  const [lastID,setLastID] = useState(1);
  const [invoiceID,setInvoiceID] = useState(1);

  useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/items')
      .then(res=>{
        console.log(res);
        setItems(res.data.Result);
      })
      .catch(err=>{
        console.log(err);
      })
  },[display])

const handleCart = (id,name,desc,price)=>{
    //e.preventDefault();
    // handleClose();
    var qty = parseInt(currentQty);
    if(qty<=0){
        toast.error("Invalid Quantity!!");
        setCurrentQty(0);
    }
    else if(qty>availableStock){
        toast.info("Out Of Stock!!")
        setCurrentQty(0);
    }
    else{
    const tot = parseInt(total)+(parseInt(selectedItemPrice)*parseInt(qty));
    var isFound = false
    var existKey = null;
    const date = new Date();
    data.filter((value,index)=>{
        if(value.id===id){
            isFound = true;
            existKey = index;
        }
    })
    if(!isFound){
        data.push({invoiceID,id,name,desc,qty,price,tot,date});
        // updateQtyFunc(id,qty);        
    }
    else{
         data[existKey].qty += Number(qty);
    }
    setTotal(parseInt(tot));
    // const rate = tot*0.1;
    setSubtotal(parseInt(tot));
    // console.log(data.slice(-1));
    
    if(!display){
        setDisplay(true);
        setCurrentQty(0);
        setSelectedItemName();
        setSelectedItemId();
        setSelectedItemPrice();
        setSelectedItemDesc();
    }
    else{
        setDisplay(false);
        setCurrentQty(0);
        setSelectedItemName();
        setSelectedItemId();
        setSelectedItemPrice();
        setSelectedItemDesc();
    }
    handleShow();
    }
  };

  //Delete From Cart List
  const handleDelete = (id,tot)=>{
    data.splice(id,1)
    //const rate = tot*0.1;
    const remain = parseInt(total)-parseInt(tot);
    setTotal(parseInt(remain));
    setSubtotal(parseInt(remain))
    if(!display){
        setDisplay(true);
    }
    else{
        setDisplay(false);
    }
  }

  const handleInvovice = ()=>{
    // let getDetails = false;
    // axios.get('http://localhost:5000/billing/lastID')
    // .then(res=>{
    //   console.log(res);
    //   if(res.data.Result.length!=0){
    //     setLastID(res.data.Result[0].id);
    //     setInvoiceID(res.data.Result[0].invoiceID);
        
    //     for(var i=0; i<data.length; i++){
          
    //       data[i].lastID = prevID;
    //       data[i].invoiceID = prevInvoiceID;
    //       prevID++;
          
    //     }
    //     getDetails = true;
    //   }
    //   else{
    //     for(var i=0; i<data.length; i++){
    //       //var currLastID = lastID+1;
    //       data[i].lastID = i+1;
    //       data[i].invoiceID = invoiceID;
    //     }
    //     getDetails = true;
    //   }
    // })
    // .catch(err=>{
    //   console.log(err);
    // })
      axios.post('http://localhost:5000/billing/add',data)
      .then(res=>{
        console.log(res);
        if(res.data.Status === "Success"){
          while(data.length>0){
            data.pop();
          }
          setTotal(0);
          setSubtotal(0);
          if(!display){
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
    <div className="container">
      <Modal
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
                    onChange={(e) => setCurrentQty(e.target.value)}
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
      <ToastContainer
        position='top-right'
        draggable={false}
        autoClose={1000}
      />
      <h1 className="text-center m-3">Billing</h1>
      <div className="row">
        <div className="col-6">
          <h3>Add to cart</h3>
          <Card className="shadow-sm">
            <Card.Header>
              <div className="row">
                <div className="col-md-8">
                  <h3>Items</h3>
                </div>
                <div className="col-md-4">
                  <Form>
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      className="form-control w-100"
                      placeholder="Search Item..."
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
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Available Stock</th>
                    <th>Unit Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items
                    .filter((values) => {
                      return search.toLowerCase() === ""
                        ? values
                        : values.name.toLowerCase().includes(search);
                    })
                    .map((values, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {
                              <img
                                src={`http://localhost:5000/images/${values.image}`}
                                style={{ width: "50px" }}
                              />
                            }
                          </td>
                          <td>{values.name}</td>
                          <td>{values.description}</td>
                          <td>{values.qty}</td>
                          <td>{values.unitPrice}</td>
                          <td>
                            <button
                              className="btn btn-success"
                              title="add"
                              onClick={() =>{setSelectedItemId(values.itemID),setSelectedItemName(values.name),setSelectedItemDesc(values.description),setSelectedItemPrice(values.unitPrice),setAvailableStock(values.qty),handleShow()}}
                            >
                              <i className="bi bi-plus"></i>
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
        <div className="col-6">
          <h3>Invoice</h3>
          <div className="d-flex justify-content-center border p-5 shadow-sm">
            <Table responsive>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Desc</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((value, index) => {
                  return (
                    <tr key={index}>
                      <td>{value.name}</td>
                      <td>{value.desc}</td>
                      <td>{value.qty}</td>
                      <td>{value.price}</td>
                      <td>{value.qty * value.price}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            handleDelete(index, value.qty * value.price)
                          }
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
          <div className="mt-5 mb-5 shadow p-3 d-flex justify-content-center">
            <h5 className="text-end mx-5">Total : {total}</h5>
            <h5 className="text-end mx-5">Grand total : {subtotal}</h5>
            <button className="btn btn-success mx-5" onClick={handleInvovice}>Generate Invoice</button>
            {/* <PDFDownloadLink document={<BillPDF data={data}/>}filename='bill.pdf'>Download</PDFDownloadLink> */}
            {/* <PDFDownloadLink document={<BillPDF data={data} />} fileName="Bill.pdf">
            {({ blob, url, loading, error }) =>
      loading ? 'Loading document...' : 'Download now!'
    }
            </PDFDownloadLink> */}
            <PDFDownloadButton data={data}/>
          </div>
        </div>
      </div>
    </div>
  );
}

const PDFDownloadButton = ({ data }) => {
  const documentData = <BillPDF data={data} />;
  const fileName = 'bill.pdf';
  console.log(data);
  return (
    <PDFDownloadLink document={documentData} fileName={fileName}>
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
  );
};

export default Billing