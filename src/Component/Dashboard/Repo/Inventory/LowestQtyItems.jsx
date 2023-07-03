import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Card,Table, Badge} from 'react-bootstrap';


const LowestQtyItems = () => {
const [data,setData] = useState([]);

useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/getReport/lowestQty')
    .then(res=>{
        console.log(res);
        setData(res.data.Result);
    })
    .catch(err=>{
        console.log(err);
    })
},[])
  return (
    <div>
        <Card>
            <Card.Header>
                <h5 className='text-center fw-bold text-danger'>Lowest Quantity Items</h5>
            </Card.Header>
            <Card.Body>
            <Table striped responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Brand</th>
                        <th>Item</th>
                        <th>Desc</th>
                        <th>Remain Qty</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((value,index)=>{
                        return(
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{value.brandName}</td>
                            <td>{value.categoryName}</td>
                            <td>{value.itemDesc}</td>
                            <td className='text-center'><Badge className='bg-danger p-3 fw-bold'>{value.itemQty}</Badge></td>
                            </tr>
                        )
                    })
                }

                </tbody>
            </Table>
            </Card.Body>
        </Card>
    </div>
  )
}

export default LowestQtyItems