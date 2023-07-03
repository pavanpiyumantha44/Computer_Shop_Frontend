import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Card} from 'react-bootstrap';
import {FcBarChart} from 'react-icons/fc'

const TotalEarning = () => {
const [totalEarning,setTotalEarning] = useState(0);

useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/getReport/totalRepairEarning')
    .then(res=>{
        console.log(res);
        setTotalEarning(res.data.Result[0].total);
    })
    .catch(err=>{
        console.log(err);
    })
})
    return (
    <div>
      <div className="row mb-5">
        <div className="col-12">
          <Card>
            <Card.Body className="text-center p-5 shadow rounded">
              <h6 className="fw-bold text-primary">Total Earning </h6><FcBarChart className='fs-1'/>
              <p className="text-center fw-bold fs-1">{totalEarning}$</p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TotalEarning