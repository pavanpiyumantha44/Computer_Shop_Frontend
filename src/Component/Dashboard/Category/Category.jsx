import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card,Form,Table,Badge, Button } from 'react-bootstrap';
import { toast,ToastContainer } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";
import axios from 'axios';

const Category = () => {
    const [category,setCategory] = useState([]);
    const[loading,setLoading] = useState(true);
    const[search,setSearch] = useState('');
    const [display,setDisplay] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:5000/dashboard/category')
        .then(res=>{
          console.log(res);
          setCategory(res.data.Result);
          setLoading(false);
        })
        .catch(err=>{
          console.log(err);
        })
      },[display])
  
    const hanldeDelete = (id)=>{
      axios.delete('http://localhost:5000/dashboard/category/delete/'+id)
      .then(res=>{
        console.log(res);
          if(res.data.Status==="Success")
          {
                toast.success("Deleted successfully!!");
                setDisplay(true);
          }
      })
      .catch(err=>{
          console.log(err);
      })
    }

  return (
    <>
    <ToastContainer
        position='top-center'
        draggable={false}
        autoClose={1000}
      />
      {loading?
      <div className='alignment'>
      <PulseLoader color={'#1444e0'} loading={loading} size={15}/>
      </div>  
      :
    <div>
        <div className='px-5 mt-5'>
            <div className='d-flex justify-content-end'>
            <Link to='/dashboard/category/' className='btn btn-success mx-5'><i class="bi bi-file-earmark-spreadsheet mx-2"></i>Export to Excel</Link>
          <Link to='/dashboard/category/add' className='btn btn-primary'>Add New<i class="bi bi-plus-square mx-2"></i></Link>
            </div>
        </div>
        <div className='mt-4 px-5 pt-3'>
                <Card className='shadow-sm'>
                  <Card.Header>
                    <div className='row'>
                      <div className='col-md-8'>
                        <h3>Category List</h3>
                      </div>
                      <div className='col-md-4'>
                        <Form>
                            <Form.Control type='text' onChange={e=>{setSearch(e.target.value)}} className='form-control w-100' placeholder='Search Category...'/>
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
                          <th>Status</th>
                          <th>Created Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                      {category.filter((values)=>{
                        return search.toLowerCase()===''? values : values.name.toLowerCase().includes(search)
                      }).map((values,index)=>{
                        return(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{values.name}</td>
                          <td>{values.status==="Available"?<Badge bg="success">{values.status}</Badge>:<Badge bg="danger">{values.status}</Badge>}</td>
                          <td>{values.created_date}</td>
                          <td>
                            <Link to={"/dashboard/category/read/"+values.cID} className='btn btn-primary mx-2' title='edit'><i className='bi bi-pencil'></i></Link>
                            <Button variant='danger' title='delete' onClick={()=>hanldeDelete(values.cID)}><i className='bi bi-trash'></i></Button>
                          </td>
                        </tr>
                        )
                        })}
                        </tbody>
                    </Table>
                  </Card.Body>
                </Card>
          </div>
    </div>
    }
    </>
  )
}

export default Category;