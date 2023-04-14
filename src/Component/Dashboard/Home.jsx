import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import LineChart from '../Dashboard/Charts/LineChart';
import PieChart from '../Dashboard/Charts/PieChart';
import { Link } from 'react-router-dom';
import Customer from './Customers/Customer';
const Home = () => {

  return (
    <div>
        <div className='p-3 d-flex justify-content-around mt-3'>    
          <div className='px-3 pt-2 border shoadow-sm w-25'>
            <h4 className='text-center pb-1 text-primary'>Admin</h4>
            <hr/>
            <p>Total: {}</p>
          </div>
          <div className='px-3 pt-2 border shoadow-sm w-25'>
          <h4 className='text-center pb-1 text-success'>Sales</h4>
            <hr/>
            <p>Earn:<span className='text-center fs-5'>${}</span></p>
          </div>
          <div className='px-3 pt-2 border shoadow-sm w-25'>
            <h4 className='text-center pb-1 text-danger'>Orders</h4>
            <hr/>
            <p>Total: {}</p>
          </div>
        </div>
        
        <div className='row mt-4 px-5 pt-3'>
          <div className='col-12 col-md-8 p-3'>
            <LineChart/>
          </div>
          <div className='col-12 col-md-4 p-3'>
            <PieChart/>
          </div>
        </div>
        {/* List of users */}
        <div className='mt-4 px-5 pt-3'>
        {/* <Customer/> */}
          {/* <div className='card'>
          <div className='card-header'>  
          <h3>List of customers</h3>
          </div>
          
          <div className='card-body'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>NIC</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Tommy</td>
                <td>234234531</td>
                <td>12345567</td>
                <td>
                  <Link to="#" className='btn btn-primary mx-2'>Edit</Link>
                  <Link to="#" className='btn btn-danger'>Delete</Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tommy</td>
                <td>234234531</td>
                <td>12345567</td>
                <td>
                  <Link to="#" className='btn btn-primary mx-2'>Edit</Link>
                  <Link to="#" className='btn btn-danger'>Delete</Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tommy</td>
                <td>234234531</td>
                <td>12345567</td>
                <td>
                  <Link to="#" className='btn btn-primary mx-2'>Edit</Link>
                  <Link to="#" className='btn btn-danger'>Delete</Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tommy</td>
                <td>234234531</td>
                <td>12345567</td>
                <td>
                  <Link to="#" className='btn btn-primary mx-2'>Edit</Link>
                  <Link to="#" className='btn btn-danger'>Delete</Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>Tommy</td>
                <td>234234531</td>
                <td>12345567</td>
                <td>
                  <Link to="#" className='btn btn-primary mx-2'>Edit</Link>
                  <Link to="#" className='btn btn-danger'>Delete</Link>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          </div> */}
        </div>
    </div>
  )
}

export default Home