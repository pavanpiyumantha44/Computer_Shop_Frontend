import React from 'react';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

// const styles = StyleSheet.create({
//   page: {
//     fontFamily: 'Helvetica',
//     padding: 30,
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   content: {
//     fontSize: 12,
//     marginBottom: 10,
//   },
// });
const BillPDF = ({data})=>{

    const billData = [
        {
            Desc: 'SanDisk 24Gb',
            Brand: 'SanDisk',
            qty: 2,
            unitPrice:2000,
            totalAmount:4000
        // Add additional bill data
        },
        {
            Desc: 'SanDisk 24Gb',
            Brand: 'SanDisk',
            qty: 2,
            unitPrice:2000,
            totalAmount:4000
        // Add additional bill data
        },
        {
            Desc: 'SanDisk 24Gb',
            Brand: 'SanDisk',
            qty: 2,
            unitPrice:2000,
            totalAmount:4000
        // Add additional bill data
        },
        {
            Desc: 'SanDisk 24Gb',
            Brand: 'SanDisk',
            qty: 2,
            unitPrice:2000,
            totalAmount:4000
        // Add additional bill data
        },
    ];
return(
  <Document>
    <Page size="A4">
      <Text>
      <div className='row'>
        <div className='col-1'></div>
        <div className='col-10 border shadow p-5'>
            <h1 className='text-center mt-4'><span className='text-primary fw-bold'>PC</span><span className='fw-bold text-danger'>S</span>olution</h1>
            <div className='text-center'>
                <small className='text-center'>Computer Store</small><br/>
                <small className='text-center'>No 44, Matale Road, Wattegama.</small><br/>
                <small className='text-center'>pcsolutions@gmail.com</small>
                <small className='text-center mx-5'>+94 7133 34 44</small>
                <small className='text-center'>081 533 444</small>
            <hr/>
            </div>
            <div className='text-center'>
                <h3 className='text-decoration-underline'>WARRANTY-INVOICE</h3>
                <p className='text-secondary'>Invoice No : {701}<span className='mx-5'>Date : {new Date().toLocaleDateString()}</span><span>Print Time: {new Date().toLocaleTimeString()}</span></p>
            </div>
      <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Brand</th>
                                <th>Qty</th>
                                <th>Unit Price</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
      {billData.map((value,key)=>{
        return(
           <tr key={key}>
                <td>{value.Desc}</td>
                <td>{value.Brand}</td>
                <td>{value.qty}</td>
                <td>{value.unitPrice}</td>
                <td>{value.totalAmount}</td>
           </tr>
        );
      })}
      </tbody>
       </table>
       <div className='row'>
            <div className='col-6'>
                <p className='text-dark fw-bold'>No of Items : {billData.length}</p>
            </div>
            <div className='col-3'>
                <p className='text-dark fw-bold'>Discount</p>
                <p className='text-dark fw-bold'>Net Amount</p>
            </div>
            <div className='col-3'>
                <p className='text-dark fw-bold ms-5'>{0.00}</p>
                <p className='text-dark fw-bold mx-5'>{2000}</p>
            </div>
       </div>
       <div className='text-center mt-5'>
            <p className='text-dark'>~ Thank You Come Again ~</p>
            <hr/>
        </div>
       </div>
        <div className='col-1'></div>
      </div>
    </Text>
    </Page>
  </Document>
);
}
export default BillPDF;
