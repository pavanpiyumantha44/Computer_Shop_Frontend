import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react'
import { Form,Table,Card,Badge,Modal,Button } from 'react-bootstrap';
// import './Billing.css';
import {toast,ToastContainer} from 'react-toastify';
// import BillPDF from './BillPDF';
import ReactToPrint from 'react-to-print';

////////////////////////////////////////////////////////////////////

class BillContent extends React.Component {
  render() {

    const {billData,handleInvovice,paidAmount,balance,invoiceID} = this.props;
    var tot=0;
    {billData.map((value)=>{tot+=value.itemPrice})};
    return (
      
      <>
      <div className='row'>
        <div className='col-5'></div>
        <div className='col-5'></div>
        <div className='col-2'>
            <ReactToPrint
            trigger={() => {return <button className='btn btn-primary mt-5' onClick={()=>handleInvovice()}>Print Bill</button>}}
            content={() => this.componentRef}
            pageStyle= "print"/>
        </div>
      </div>
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-8'>
          <div className='p-2' ref={el=>(this.componentRef=el)}>
            <h1 className='text-center fw-bold'><span className='text-primary'>PC</span> <span className='text-danger'>S</span>olutions</h1>
            <p className='text-center'>Computer Store</p>
            <p className='text-center'>No 44,Matale Road, Wattegama.</p>
            <p className='text-center'><span className='mx-3'>Pcsolutions@gmail.com</span><span>+94 7133 34 44</span><span className='mx-3'>081 533 444</span></p>
            <hr className='text-dark'/>
          <div className='mt-2'>
            <h1 className='text-center fw-bold'><u>WARRANTY-INVOICE</u></h1>
            <p className='text-center'><span className='mx-3'>Invoice No : {invoiceID}</span><span>Date : {new Date().toLocaleDateString()}</span><span className='mx-3'>Print Time: {new Date().toLocaleTimeString()}</span></p>
            <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Serial No</th>
          <th scope="col">Description</th>
          <th scope="col">Qty</th>
          <th scope="col">Unit Price</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
       {
         billData.map((value,key)=>{
            return(
                <tr key={key}>
                    <td>{value.name}</td>
                    <td>{value.desc}</td>
                    <td>{value.qty}</td>
                    <td>{value.price}</td>
                    <td>{value.itemPrice}</td>
                </tr>
            );
            })
       }
        
      </tbody>
            </table>
            <div className='row fw-bold'>
              <div className='col-6'>No of Items : {billData.length}</div>
            </div>
            <div className='row fw-bold'>
              <div className='col-6'></div>
              <div className='col-3 text-right'>Net Amount</div>
              <div className='col-3'>{tot}/=</div>
            </div>
            <div className='row fw-bold'>
              <div className='col-6'></div>
              <div className='col-3 text-right'>Paid Amount</div>
              <div className='col-3'>{paidAmount}/=</div>
            </div>
            <div className='row fw-bold'>
              <div className='col-6'></div>
              <div className='col-3 text-right'>Balance</div>
              <div className='col-3'>{balance}/=</div>
            </div>
            <p className='text-center fs-3 mt-5'>~ Thank You Come Again ~</p>
          </div>
          </div>
        </div>
        <div className='col-2'></div>
      </div>
      </>
    );
  }
}
////////////////////////////////////////////////////////////////////


const Billing2 = ()=> {
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
  const [lgShow, setLgShow] = useState(false);


  const handleLgShow = () => {
    handlePrintBill(data);
    setLgShow(true);
    toast.success("Invoice Generated !!")
  };

  //Handle Cart

  const [selectedItemId,setSelectedItemId] = useState();
  const [selectedItemName,setSelectedItemName] = useState();
  const [selectedItemDesc,setSelectedItemDesc] = useState();
  const [selectedItemPrice,setSelectedItemPrice] = useState();
  const [availableStock,setAvailableStock] = useState();
  const [lastID,setLastID] = useState(1);
  const [invoiceID,setInvoiceID] = useState(1);
  const [stockQty,setStockQty] = useState({qty:''});
  const [updateQty,setUpdateQty] = useState([]);

  //printData
  const [printData,setPrintData] = useState([]);
  const [printState,setPrintState] = useState(false);

  //Handle User paid Amount
  const [userPaid,setUserPaid] = useState(0);
  const [alreadyPaidAmount,setAlreadyPaidAmount] = useState(0);
  const [balance,setBalance] = useState(0);

  useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/items')
      .then(res=>{
        console.log(res);
        setItems(res.data.Result);
      })
      .catch(err=>{
        console.log(err);
      })
    axios.get('http://localhost:5000/billing/lastID')
    .then(res=>{
      console.log(res);
      if(res.data.Result.length!==0){
        setInvoiceID((res.data.Result[0].invoiceID)+1);
      }
    })
    .catch(err=>{
      console.log(err);
    })  
  },[display])

const handleCart = (id,name,desc,price)=>{
    //e.preventDefault();
    // handleClose();
    var qty = parseInt(currentQty);
    if(qty<=0 || isNaN(qty)){
        toast.error("Invalid Quantity!!");
        setCurrentQty(0);
    }
    else if(qty>availableStock){
        toast.info("Out Of Stock!!")
        setCurrentQty(0);
    }
    else{
    const tot = parseInt(total)+(parseInt(selectedItemPrice)*parseInt(qty));
    var itemPrice = (parseInt(selectedItemPrice)*parseInt(qty));
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
        data.push({invoiceID,id,name,desc,qty,price,itemPrice,date});
        // updateQtyFunc(id,qty);
        updateStockQty(id);
    }
    else{
         data[existKey].qty += Number(qty);
        //  updateQty[existKey].qty +=Number(qty);
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
  const updateStockQty = (id)=>{
    var remain = stockQty.qty;
    updateQty.push({id,remain});
  }

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

  const handlePrintBill = (incomeData)=>{
    for(var i=0; i<incomeData.length; i++){
      printData.push(incomeData[i]);
    }
    setPrintState(true);
  }
  const clearPrintBill = (existPrintData)=>{
    while(existPrintData.length>0){
      printData.pop();
    }
    setPrintState(false);
    alert("Data cleared!!");
  }
  const openBill = ()=>{
   
    if(data.length===0){
       toast.error("Cart is Empty!!");
    }
    else if(userPaid<=0 || isNaN(userPaid)){
      toast.error("Invalid Amount !!");
    }
    else{
          if(userPaid>=total){
            var remain = userPaid-total;
            setBalance(remain);
            setLgShow(true);
          }
          else{
            var remainPayment = total-userPaid;
           toast.error("Need more "+remainPayment+" /=");
          }
      }
        // toast.error("Cart is empty !!");
  }
  const handleInvovice = ()=>{
    setLgShow(false);
    console.log(data);
    if(data.length!==0){
      // setLgShow(true)
      axios.post('http://localhost:5000/billing/add',data)
      .then(res=>{
        console.log(res);
        // handlePrintBill(data);
        if(res.data.Status === "Success"){
          while(data.length>0){
            data.pop();
            updateQty.pop();
          }
          setTotal(0);
          setSubtotal(0);
          setUserPaid(0);
          toast.success("Data Added Successfully !!")
          if(!display){
            setPrintData([]);
            setDisplay(true);
          }
          else{
            setPrintData([]);
              setDisplay(false);
          }
        }
      })
      .catch(err=>{
        console.log(err);
      })
      axios.put('http://localhost:5000/billing/updateQty/',updateQty)
        .then(res=>{
            
        })        
        .catch(err=>{
          console.log(err);
      })
      axios.post('http://localhost:5000/billing/addInvoice',{invoiceID,total,userPaid})
      .then(res=>{
        console.log(res);
      })
      .catch(err=>{
        console.log(err);
      })
      axios.post('http://localhost:5000/payments/sales',{invoiceID,total,userPaid})
      .then(res=>{
        console.log(res);
      })
      .catch(err=>{
        console.log(err);
      })
    }
    else
    {
      toast.error("Cart is Empty!!");
    }
  }
  return (
    <>
    <div className="container mb-5" style={{height:'90vh'}}>
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
          <button className='btn btn-success d-flex ms-auto mx-4' onClick={handleInvovice}>Save Data</button>
          {/* <BillPDF billData={printData}/> */}
          {data.length!==0?<BillContent paidAmount={userPaid} balance={balance} billData={data} invoiceID={invoiceID} handleInvovice={handleInvovice}/>:""}
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
            <Card.Body style={{ maxHeight: '450px', overflowY: 'scroll' }}>
              <Table striped responsive>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Image</th>
                    {/* <th>Brand</th> */}
                    <th>Category</th>
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
                        : values.categoryName.toLowerCase().includes(search);
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
                          {/* <td>{values.brandName}</td> */}
                          <td>{values.categoryName}</td>
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
          <Card>
          <Card.Header>
            <h5 className='text-dark fw-bold'>Invoice ID: {invoiceID}</h5>
          </Card.Header>
          <Card.Body style={{ maxHeight: '350px', overflowY: 'scroll' }} className='border p-5 shadow-sm'>    
          <div className="d-flex justify-content-center ">
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Serial Number</th>
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
                      <td>{index+1}</td>
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
          </Card.Body>
          <Card.Footer>
          <div className="my-1 shadow py-4 d-flex justify-content-center">
            <h5 className="text-end mx-5">Total : <span className='fw-bold text-primary'>{total}</span></h5>
            <Form>
            <Form.Control type="number" placeholder='Amount' value={userPaid} onChange={(e)=>setUserPaid(e.target.value)}></Form.Control>
            </Form>
            <button className="btn btn-success mx-3" onClick={openBill}>Generate Invoice</button>
           
          </div>
          </Card.Footer>
          </Card>
          {/* <div className="mt-5 mb-5 shadow p-3 d-flex justify-content-center">
            <h5 className="text-end mx-5">Total : {total}</h5>
            <h5 className="text-end mx-5">Grand total : {subtotal}</h5>
            <button className="btn btn-success mx-5" onClick={openBill}>Generate Invoice</button>
           
          </div> */}
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

export default Billing2;