import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Card} from 'react-bootstrap';
import {BsCashCoin} from 'react-icons/bs';
const TechnicianEarning = () => {
  const [totalTechEarning,setTotalTechEarning] = useState(0);
  useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/getReport/totalTechnicianEarning')
    .then(res=>{
        console.log(res);
        setTotalTechEarning(res.data.Result[0].total);
    })
    .catch(err=>{
        console.log(err);
    })
  })
  return (
    <div>
      <div className="col-12">
        <Card>
          <Card.Body className="text-center p-5 shadow rounded">
            <h6 className="fw-bold text-primary">Technician Earning</h6><BsCashCoin className='fs-1 text-success'/>
            <p className="text-center fw-bold fs-1">{totalTechEarning}$</p>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default TechnicianEarning