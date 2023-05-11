import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";
import {Button,Form,Card,Table, Badge} from 'react-bootstrap';


const Repair = () => {
  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const[search,setSearch] = useState('');
  const [display,setDisplay] = useState(false);

  useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/repairs')
    .then(res=>{
      console.log(res);
      setData(res.data.Result)
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
    })
  },[display])
  const handleDelete = (id)=>{
    axios.delete('http://localhost:5000/dashboard/repairs/delete/'+id)
    .then(res=>{
      console.log(res);
      if(res.data.Status === "Success")
      {
        toast.success("Deleted!!");
        if(!display)
        {
          setDisplay(true);
        }
        else{
          setDisplay(false);
        }
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <div>
      <ToastContainer
        position='top-center'
        draggable={false}
        autoClose={1000}
      />
      {loading ?
        <div className='alignment'>
        <PulseLoader color={'#1444e0'} loading={loading} size={15}/>
        </div>  
        :
      <div>
        <h1 className='px-5 mt-4'>Repair</h1>
        <div className='px-5 mt-2'>
          <div className='d-flex justify-content-end'>
            <Link to='/dashboard/repairs/' className='btn btn-success mx-3'><i class="bi bi-file-earmark-spreadsheet mx-2"></i>Export to Excel</Link>
            <Link to='/dashboard/repairs/add' className='btn btn-primary mx-3'>Add New<i class="bi bi-plus-square mx-2"></i></Link>
          </div>
        </div>
        <div className='mt-4 px-5 pt-3'>
            <Card className='shadow-sm'>
              <Card.Header>
                <div className='row'>
                  <div className='col-8'>
                    <h3>Repair List</h3>
                  </div>
                  <div className='col-4'>
                      {/* <Form>
                        <Form.Control type='text' placeholder='Search Customer...' onChange={(e)=>{setSearch(e.target.value)}}></Form.Control>
                      </Form> */}
                  </div>
                </div>  
              </Card.Header>
              <Card.Body>
                <Table striped>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Customer ID</th>
                    <th>Category ID</th>
                    <th>Repair Details</th>
                    <th>Addedd Items</th>
                    <th>Received Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.filter((data)=>{
                    return search.toLowerCase()===''? data : data.name.toLowerCase().includes(search) || search.toLowerCase()===''? data : data.nic.toLowerCase().includes(search);
                  }).map((value,index)=>{
                    return(
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>CUS-{value.cusID}</td>
                      <td>CAT-{value.catID}</td>
                      <td>{value.repair_details===null?<Badge bg="warning">Pending</Badge>:value.repair_details}</td>
                      <td>{value.added_items===null?<Badge bg="warning">Pending</Badge>:value.added_items}</td>
                      <td>{value.receive_date.substr(0,10)}</td>
                      <td>{value.status===0?<Badge bg="warning">Pending</Badge>:<Badge bg='success'>Repaired</Badge>}</td>
                      <td>
                        <Link to={`/dashboard/repairs/read/${value.repID}`} className='btn btn-primary mx-2'><i className='bi bi-pencil'></i></Link>
                        <Button variant='danger' onClick={()=>{handleDelete(value.repID)}}><i className='bi bi-trash'></i></Button>
                      </td>
                    </tr>)
                  })}   
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
        </div>
      </div>
      }
    </div>
  )
}

export default Repair