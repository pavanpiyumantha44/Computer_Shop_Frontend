import React from 'react';
import ReactToPrint from 'react-to-print';

class BillContent extends React.Component {
  render() {

    const {billData} = this.props;
    return (
      
      <>
      <div className='row'>
        <div className='col-5'></div>
        <div className='col-5'></div>
        <div className='col-2'>
            <ReactToPrint
            trigger={() => {return <button className='btn btn-primary mt-5'>Print Bill</button>}}
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
            <h1 className='text-center fw-bold'><u>WARRANTY-INVOICE</u></h1>
            <p className='text-center'><span className='mx-3'>Invoice No : {billData.invoiceID}</span><span>Date : {new Date().toLocaleDateString()}</span><span className='mx-3'>Print Time: {new Date().toLocaleTimeString()}</span></p>
            <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Description</th>
          <th scope="col">Brand</th>
          <th scope="col">Qty</th>
          <th scope="col">Unit Price</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
       {
         billData.map((value,key)=>{
            return(
                <tr key={key}>
                    <td>{value.desc}</td>
                    <td>{value.brand}</td>
                    <td>{value.qty}</td>
                    <td>{value.price}</td>
                    <td>{value.tot}</td>
                </tr>
            );
            })
       }
        
      </tbody>
            </table>
            <div className='row fw-bold'>
              <div className='col-4'>No of Items : {billData.length}</div>
              <div className='col-4 text-right'>Discount</div>
              <div className='col-4'>0</div>
            </div>
            <div className='row fw-bold'>
              <div className='col-4'></div>
              <div className='col-4 text-right'>Net Amount</div>
              <div className='col-4'>2000</div>
            </div>
            <p className='text-center fs-3 mt-5'>~ Thank You Come Again ~</p>
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