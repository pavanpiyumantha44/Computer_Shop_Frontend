import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";
import {Form, Card, Table, Badge } from 'react-bootstrap';

const Item = () => {

    const[items,setItems] = useState([]);
    const[loading,setLoading] = useState(true);
    const[search,setSearch] = useState('');
    const [display,setDisplay] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
      axios.get('http://localhost:5000/dashboard/items')
      .then(res=>{
        console.log(res);
        setItems(res.data.Result);
        setLoading(false);
      })
      .catch(err=>{
        console.log(err);
      })
    },[display])

  const hanldeDelete = (id)=>{
    axios.delete('http://localhost:5000/dashboard/items/delete/'+id)
    .then(res=>{
      console.log(res);
        if(res.data.Status==="Success")
        {
              toast.success("Deleted successfully!!");
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
    {loading?
      <div className='alignment'>
      <PulseLoader color={'#1444e0'} loading={loading} size={15}/>
      </div>  
      :
      <div>
        <div className='px-5 mt-5'>
        <div className='d-flex justify-content-end'>
          <Link to='/dashboard/items/' className='btn btn-success mx-5'><i class="bi bi-file-earmark-spreadsheet mx-2"></i>Export to Excel</Link>
          <Link to='/dashboard/items/create/' className='btn btn-primary'>Add New<i class="bi bi-plus-square mx-2"></i></Link>
        </div>
        </div>
          <div className='mt-4 px-5 pt-3'>
                <Card className='shadow-sm'>
                  <Card.Header>
                    <div className='row'>
                      <div className='col-md-8'>
                        <h3>Items</h3>
                      </div>
                      <div className='col-md-4'>
                        <Form>
                            <Form.Control type='text' onChange={e=>{setSearch(e.target.value)}} className='form-control w-100' placeholder='Search Brand...'/>
                        </Form>
                      </div>
                    </div>  
                  </Card.Header>
                  <Card.Body>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Quantitiy</th>
                          <th>Unit Price</th>
                          <th>Status</th>
                          <th>Created Date</th>
                          <th colSpan={2} className='text-center'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                      {items.filter((values)=>{
                        return search.toLowerCase()===''? values : values.name.toLowerCase().includes(search)
                      }).map((values,index)=>{
                        return(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{<img src={`http://localhost:5000/images/${values.image}`} style={{width:"50px"}}/>}</td>
                          <td>{values.name}</td>
                          <td>{values.description}</td>
                          <td>{values.qty}</td>
                          <td>{values.unitPrice}</td>
                          <td>{values.status==="Available"?<Badge bg="success">{values.status}</Badge>:<Badge bg="danger">{values.status}</Badge>}</td>
                          <td>{values.added_date}</td>
                          <td>
                            <Link to={"/dashboard/items/read/"+values.itemID} className='btn btn-primary mx-2' title='edit'><i className='bi bi-pencil'></i></Link>
                          </td>
                          <td>
                          <button className='btn btn-danger' title='delete' onClick={()=>hanldeDelete(values.itemID)}><i className='bi bi-trash'></i></button>
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
    </div>
  )
}

export default Item