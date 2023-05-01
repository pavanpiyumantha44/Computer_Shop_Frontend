import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PulseLoader from "react-spinners/PulseLoader";
import {Button,Badge,Form,Card,Table} from 'react-bootstrap';


const Employee = () => {
  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true);
  const navigate = useNavigate();
  const[search,setSearch] = useState('');
  const [display,setDisplay] = useState(false);

  useEffect(()=>{
    axios.get('http://localhost:5000/dashboard/employee')
    .then(res=>{
      console.log(res);
      setData(res.data.Result)
      setLoading(false);
    })
    .catch(err=>{
      console.log(err);
    })
  },[display]);
  
  const hanldeDelete = (id)=>{
    axios.delete('http://localhost:5000/dashboard/employee/delete/'+id)
    .then(res=>{
      console.log(res);
        if(res.data.Status==="Success")
        {
              toast.success("Deleted successfully!!");
              if(!display){
                setDisplay(true);
              }else{
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
        <h1 className='px-5 mt-4'>Employee</h1>
        <div className='px-5 mt-2'>
          <div className='d-flex justify-content-end'>
            <Link to='/dashboard/employee/' className='btn btn-success mx-3'><i class="bi bi-file-earmark-spreadsheet mx-2"></i>Export to Excel</Link>
            <Link to='/dashboard/employee/add' className='btn btn-primary mx-3'>Add New<i class="bi bi-plus-square mx-2"></i></Link>
          </div>
        </div>
        <div className='mt-4 px-5 pt-3'>
            <Card className='shadow-sm'>
              <Card.Header>
                <div className='row'>
                  <div className='col-8'>
                    <h3>Employee List</h3>
                  </div>
                  <div className='col-4'>
                      <Form>
                        <Form.Control type='text' placeholder='Search Customer...' onChange={(e)=>{setSearch(e.target.value)}}></Form.Control>
                      </Form>
                  </div>
                </div>  
              </Card.Header>
              <Card.Body>
                <Table striped>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>NIC</th>
                    <th>Mobile</th>
                    <th>Address</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.filter((data)=>{
                    return search.toLowerCase()===''? data : data.name.toLowerCase().includes(search)||data.nic.toLowerCase().includes(search)
                  }).map((value,index)=>{
                    return(
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{value.name}</td>
                      <td>{value.nic}</td>
                      <td>{value.mobile}</td>
                      <td>{value.address}</td>
                      <td>{value.role===1? "Cashier":"Technician"}</td>
                      <td>{value.isActive===1?<Badge bg="success">Active</Badge>:<Badge bg="danger">Not Active</Badge>}</td>
                      <td>
                        <Link to={`/dashboard/employee/read/${value.id}`} className='btn btn-primary mx-2'><i className='bi bi-pencil'></i></Link>
                        <Button variant='danger' onClick={()=>hanldeDelete(value.id)}><i className='bi bi-trash'></i></Button>
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

export default Employee