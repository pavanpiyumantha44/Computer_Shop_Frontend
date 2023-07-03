import React, { useEffect, useState } from 'react'
import { Button, Card, Table, Pagination, Form } from 'react-bootstrap'
import AdvancePayment from './AdvancePayment';
import FullPayment from './FullPayment';

const OrderBililng = () => {

  const [display,setDisplay] = useState(false);

  const [paymentType,setPaymentType] = useState(1);

  useEffect(()=>{
    display!==true?setDisplay(true):setDisplay(false);
  },[display])

  return (
    <div className='p-3 mx-2'>
      <div className='row'>
        <div className='col-4'></div>
        <div className='col-4'>
        <Form>
        <div className='text-center fw-bold'>
          <Form.Label>Select Payment Type</Form.Label>
          <Form.Select onChange={(e)=>setPaymentType(e.target.value)}>
            <option value={1}>Advance Payment</option>
            <option value={2}>Full Payment</option>
          </Form.Select>
        </div>
      </Form>
        </div>
        <div className='col-4'></div>
      </div>
      <hr/>
    </div>
  )
}

export default OrderBililng