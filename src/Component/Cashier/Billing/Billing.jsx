import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form,Table,Card,Badge,Modal,Button } from 'react-bootstrap';
// import './Billing.css';
import {toast,ToastContainer} from 'react-toastify';

const Billing = () => {
  const [data,setData] = useState([]);
  const [total,setTotal] = useState(0);
  const [subtotal,setSubtotal] = useState(0);
  const [display,setDisplay] = useState(false);
  const [items,setItems] = useState([]);
  const [search,setSearch] = useState('');
  const [currentQty,setCurrentQty] = useState(0);
  const [cart,setCart] = useState({
    id:'',
    name:'',
    qty:'',
    price:''
  });

  //Modal
  const [showModal,setShowModal] = useState(false)
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  //Handle Cart

  const [selectedItemId,setSelectedItemId] = useState();
  const [selectedItemName,setSelectedItemName] = useState();
  const [selectedItemDesc,setSelectedItemDesc] = useState();
  const [selectedItemPrice,setSelectedItemPrice] = useState();
  const [availableStock,setAvailableStock] = useState();

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

  //Add To Cart list

const handleCart = (id,name,desc,price)=>{
    //e.preventDefault();
    handleClose();
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
    data.filter((value,index)=>{
        if(value.id===id){
            isFound = true;
            existKey = index;
        }
    })
     if(!isFound){
        data.push({id,name,desc,qty,price});
     }
     else{
         data[existKey].qty += Number(qty);
     }
    setTotal(parseInt(tot));
    const rate = tot*0.1;
    setSubtotal(parseInt(tot-rate));
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
        position='top-center'
        draggable={false}
        autoClose={1000}
      />
      <h1 className="text-center m-3">Billing</h1>
      <div className="row">
        <div className="col-6">
          <h3>Add to cart</h3>
          {/* <div className='d-flex justify-content-center border p-5 shadow-sm'>
                    <form onSubmit={handleCart}>
                        <div className='mb-3'>
                        <input type='text' className='form-control' placeholder='item' onChange={e =>{setCart({...cart,name:e.target.value})}}/>
                        </div>
                        <div className='mb-3'>
                        <input type='number' className='form-control' placeholder='Quantity' onChange={e=>setCart({...cart,qty:e.target.value})}></input>
                        </div>
                        <div className='mb-3'>
                            <input type='text' className='form-control' placeholder='Price'onChange={e=>setCart({...cart,price:e.target.value})}></input>
                        </div>
                        <button className='btn btn-success mx-5'><i className='bi bi-plus text-white'></i>Add Item</button>
                    </form>
                    </div> */}
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
              <Table striped>
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
            <table className="table  table-fixed">
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
                      <td>{value.name}</td>
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
            </table>
          </div>
          <div className="mt-5 mb-5 shadow p-3 d-flex justify-content-center">
            <h5 className="text-end mx-5">Total : {total}</h5>
            <h5 className="text-end mx-5">Grand total : {subtotal}</h5>
            <button className="btn btn-success mx-5">Generate Invoice</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing