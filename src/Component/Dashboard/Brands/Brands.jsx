import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { toast,ToastContainer } from 'react-toastify';
import PulseLoader from "react-spinners/PulseLoader";

const Brands = () => {

    const[brand,setBrands] = useState([]);
    const[loading,setLoading] = useState(true);
    const [display,setDisplay] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
      axios.get('http://localhost:5000/dashboard/brands')
      .then(res=>{
        console.log(res);
        setBrands(res.data.Result);
        setLoading(false);
      })
      .catch(err=>{
        console.log(err);
      })
    },[display])

  const hanldeDelete = (id)=>{
    axios.delete('http://localhost:5000/dashboard/brands/delete/'+id)
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
      <Link to='/dashboard/brands/' className='btn btn-success mx-5'><i class="bi bi-file-earmark-spreadsheet mx-2"></i>Export to Excel</Link>
      <Link to='/dashboard/brands/create/' className='btn btn-primary'>Add New<i class="bi bi-plus-square mx-2"></i></Link>
    </div>
    </div>
      <div className='mt-4 px-5 pt-3'>
            <div className='card'>
              <div className='card-header'>  
                <h3>Brands</h3>
              </div>
              <div className='card-body'>
                <table className='table table-striped'>
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
                  {brand.map((values,index)=>{
                    return(
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{values.name}</td>
                      <td>{values.status==="Available"?<span className="badge text-bg-success">{values.status}</span>:<span className="badge text-bg-danger">{values.status}</span>}</td>
                      <td>{values.created_date}</td>
                      <td>
                        <Link to={"/dashboard/brands/read/"+values.bID} className='btn btn-primary mx-2' title='edit'><i className='bi bi-pencil'></i></Link>
                        <button className='btn btn-danger' title='delete' onClick={()=>hanldeDelete(values.bID)}><i className='bi bi-trash'></i></button>
                      </td>
                    </tr>
                    )
                    })}
                    </tbody>
                </table>
              </div>
            </div>
      </div>
    </div>
    }
    </div>
  )
}

export default Brands