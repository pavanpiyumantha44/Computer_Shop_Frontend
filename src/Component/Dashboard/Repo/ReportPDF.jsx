import React, { useEffect, useState } from 'react';
import ReactToPrint from 'react-to-print';

class BillContent extends React.Component {
    render() {
        
        const {billData,startDate,endDate} = this.props;
        var earning=0;
        var tot = billData.map((value)=> { earning+=(value.total)})
        return (
        <>
      <div className='row'>
        <div className='col-5'></div>
        <div className='col-5'></div>
        <div className='col-2'>
            <ReactToPrint
            trigger={() => {return <button className='btn btn-primary mt-5'>Print Report</button>}}
            content={() => this.componentRef}
            pageStyle= "print"/>
        </div>
      </div>
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-8'>
          <div className='mt-5 p-2' ref={el=>(this.componentRef=el)}>
            <h1 className='text-center fw-bold'><span className='text-primary'>PC</span> <span className='text-danger'>S</span>olution</h1>
            <p className='text-center'>Computer Store</p>
            <p className='text-center'>No 44,Matale Road, Wattegama.</p>
            <p className='text-center'><span className='mx-3'>Pcsolutions@gmail.com</span><span>+94 7133 34 44</span><span className='mx-3'>081 533 444</span></p>
            <hr className='text-dark'/>
          <div className='mt-2'>
            <h3 className='text-center fw-bold'><u>SALES-REPORT</u></h3>
            <p className='text-center fw-bold'><span className='mx-3'>From : {startDate}</span><span>To : {endDate}</span></p>
            <p className='text-center fw-bold '><span className='mx-3'>No of Sales : {billData.length}</span><span>Total Earning : {earning}</span></p>
        <table class="table table-striped">
         <thead>
         <tr>
           <th>Id</th>
           <th>Item</th>
           <th>Description</th>
           <th>Qty</th>
           <th>UnitPrice</th>
           <th>Total</th>
           <th>Date</th>
         </tr>
       </thead>
      <tbody>
      {
           billData.map((value,index)=>{
             return(
               <tr key={index}>
                 <td>{index+1}</td>
                 <td>{value.name}</td>
                 <td>{value.description}</td>
                 <td>{value.qty}</td>
                 <td>{value.unitPrice}</td>
                 <td>{value.total}</td>
                 <td>{value.added_Date}</td>
               </tr>
             )
           })
         }
        
      </tbody>
    </table>
          </div>
          </div>
        </div>
        <div className='col-2'></div>
      </div>
      </>
    );
  }
}
export default BillContent