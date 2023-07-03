import React, { useEffect, useState } from 'react';
import ReactToPrint from 'react-to-print';
import DoughnutChart from '../../Charts/DoughnutChart';
import { Card } from 'react-bootstrap';
import TotalEarning from './TotalEarning';
import TechnicianEarning from './TechnicianEarning';


class RepairReportPDF extends React.Component {
    render() {

        return (
        <>
      <div className='row mt-4 mb-5'>
        <div className='col-5'><h1 className=''>Repair Report</h1></div>
        <div className='col-5'></div>
        <div className='col-2'>
            <ReactToPrint
            trigger={() => {return <button className='btn btn-primary'>Print Report</button>}}
            content={() => this.componentRef}
            pageStyle= "print"/>
        </div>
      </div>
      <div ref={el=>(this.componentRef=el)}>
      <div className='row mb-5'>
                <div className='col-xl-6 md-6 sm-3 px-5 pb-5'>
                    <DoughnutChart/>
                </div>
                <div className='col-xl-6 md-6 sm-3'>
                    {/* <LowestQtyItems/> */}
                    <TotalEarning/>
                    <div className='row my-5'>
                        <TechnicianEarning/>
                    </div>
                </div>
            </div>
      </div>
      </>
    );
  }
}
export default RepairReportPDF