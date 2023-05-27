import React from 'react'
import { Button, Form } from 'react-bootstrap'

const OrderBililng = () => {
  return (
    <div className='p-3 mx-2'>
        <div className='row'>
            <Form>
                <div className='col-3'>
                <Form.Group className='mt-3'>
                    <Form.Label>Search Customer</Form.Label>
                    <Form.Control type='text'>
                    </Form.Control>
                </Form.Group>
                </div>
                <Button variant='success'>Search</Button>
            </Form>
        </div>
    </div>
  )
}

export default OrderBililng