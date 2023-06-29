import React from 'react';
import ReactToPrint from 'react-to-print';

class BillContent extends React.Component {
  render() {

    const {billData,totalPrice,userPaid,Balance} = this.props;
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
            <h1 className='text-center fw-bold'><u>REPAIR-INVOICE</u></h1>
            <p className='text-center'><span className='mx-3'>Invoice No : {billData[0].repID}</span><span>Date : {new Date().toLocaleDateString()}</span><span className='mx-3'>Print Time: {new Date().toLocaleTimeString()}</span></p>
            <p className='fw-bold text-dark'>Customer : {billData[0].cusName}</p>
            <p className='fw-bold text-dark'>Item : {billData[0].categoryName}</p>
            <p className='fw-bold text-dark'>Repair : {billData[0].repair_details}</p>
            <p className='fw-bold text-dark'>Received Date : {billData[0].receive_date.replace('T',' - ').substr(0,21)}</p>
            <p className='fw-bold text-dark'>Service Charge : {billData[0].service_charge}/=</p>
            <h5 className='fw-bold my-4 text-center'>Added Items</h5>
      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">Brand</th>
          <th scope="col">Description</th>
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
                    <td>{value.brandName}</td>
                    <td>{value.itemdesc}</td>
                    <td>{value.item_qty}</td>
                    <td>{value.itemPrice}</td>
                    <td>{value.itemPrice*value.item_qty}</td>
                </tr>
            );
            })
       }
        
      </tbody>
            </table>
            <div className='row fw-bold'>
              <div className='col-4'>No of Items : {billData.length}</div>
              <div className='col-4 text-right'>Net Amount</div>
              <div className='col-4'>{totalPrice}/=</div>
            </div>
            <div className='row'>
            <div className='col-4'></div>
            <div className='col-4 text-right'>Paid Amount</div>
              <div className='col-4'>{userPaid}/=</div>
            </div>
            <div className='row'>
            <div className='col-4'></div>
              <div className='col-4 text-right'>Balance</div>
              <div className='col-4'>{Balance}/=</div>
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