import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import {Table,Form,Button} from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import PulseLoader from "react-spinners/PulseLoader";
import {toast,ToastContainer} from 'react-toastify';
import RportPDF from './ReportPDF';

const Report = () => {
  
  const[loading,setLoading] = useState(true);
  const [data,setData] = useState([]);
  const [date,setDate] = useState({
    startDate:'',
    endDate:''
  });

  const filename = "Reoprt";
  const handleSubmit = (e)=>{
      e.preventDefault();
      if(date.startDate===""||date.endDate===""){
        toast.error("Select a Range !!");
      }else{
      axios.post('http://localhost:5000/dashboard/getReport/sales',date)
      .then(res=>{
        if(res.data.Result.length !==0){
          console.log(res);
          setData(res.data.Result);
        }
        else{
          toast.error("Empty Data !!");
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
  return (
    <div>
      <ToastContainer
        position='top-center'
        draggable={false}
        autoClose={1000}
      />
      <div>
        {/* <h1 className='px-5 mt-4'>Generate Reports</h1> */}
        <div className='px-5 mt-4'>
          <div className='d-flex justify-content-end'>
            {/* <Link to='/dashboard/customer/' className='btn btn-success mx-3'><i className="bi bi-file-earmark-spreadsheet mx-2"></i>Export to Excel</Link> */}
            {data.length!==0?
            <CSVLink data={data} filename={filename} onClick={()=>{toast.success("Downloaded Successfully!!")}} className='btn btn-success mx-3'><i className="bi bi-file-earmark-spreadsheet mx-2"></i>Export to Excel</CSVLink> 
              :
              <button onClick={()=>{toast.error("Empty Data !!")}} className='btn btn-success mx-3'><i className="bi bi-file-earmark-spreadsheet mx-2"></i>Export to Excel</button>
            }             
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
      <div>
        <Form onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col-5'>
              <Form.Group>
                <Form.Label>Select Starting Date</Form.Label>
                <Form.Control type='date' onChange={(e)=>setDate({...date,startDate:e.target.value})}></Form.Control>
              </Form.Group>
            </div>
            <div className='col-5'>
            <Form.Group>
                <Form.Label>Select Ending Date</Form.Label>
                <Form.Control type='date' onChange={(e)=>setDate({...date,endDate:e.target.value})}></Form.Control>
              </Form.Group>
            </div>
            <div className='col-2 mt-1'>
              <Button variant='secondary' type='submit' className='mt-4'>Generate</Button>
            </div>
          </div>
        </Form>
      </div>
       {/* <Table className='table mt-5' striped>
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
           data.map((value,index)=>{
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
       </Table> */}
       <div style={{ maxHeight: '650px', overflowY: 'scroll' }} className='border shadow my-5'>
       {data.length!==0?
        <div><RportPDF billData={data} startDate={date.startDate} endDate={date.endDate}/></div>:<div style={{display:'none'}}><RportPDF billData={data} startDate={date.startDate} endDate={date.endDate}/></div>}
      </div>
      </div>
    </div>
  )
}

export default Report