import React, { useEffect, useState } from 'react';
import ReactToPrint from 'react-to-print';
import Doughnut2 from './Doughnut';
import LowestQtyItems from './LowestQtyItems';

class InventoryPDF extends React.Component {
    render() {

        return (
        <>
      <div className='row mt-4 mb-5'>
        <div className='col-5'><h1 className=''>Inventory Report</h1></div>
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
                <div className='col-xl-6 md-6 sm-3'>
                    <Doughnut2/>
                </div>
                <div className='col-xl-6 md-6 sm-3'>
                    <LowestQtyItems/>
                </div>
            </div>
      </div>
      </>
    );
  }
}
export default InventoryPDF