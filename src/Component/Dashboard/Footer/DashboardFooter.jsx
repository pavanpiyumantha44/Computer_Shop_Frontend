import React from 'react'
import './style.css';
const DashboardFooter = () => {
  return (
    <div className='container-fluid px-0 shadow-sm'>
      <div className='row flex-nowrap'>
        <div className='col-auto col-md-2 col-xl-2 px-sm-2 px-0 bg-primary'></div>
        <div className='d-flex px-0 footer'>
            <div className="card card-body text-center text-dark">
              <h6 className="card-title"><span>&#169;</span> All Rights Reserved</h6>
            </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardFooter