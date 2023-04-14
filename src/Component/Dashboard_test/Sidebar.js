import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
const Sidebar = () => {
    const [active1,setactive1] = useState(1);
  return (
    <div className='d-flex sidebar justify-content-between flex-column bg-primary text-light py-3 ps-3 pe-5 vh-100'>
        <div>
            <a href='' className='p-3'>
                <i className='bi bi-code-slash fs-4 me-4'></i>
                <span className='fs-4'>Code with me</span>
            </a>
            <hr className='text-white mt-2'/>
            <ul className='nav nav-pills flex-column' mt-3>
                <li className={ active1===1 ? ' active1 nav-item p-3' : "nav-item p-3"} onClick={e=>setactive1(1)}>
                    <Link to="/dashboard" className='p-1 text-decoration-none text-white'>
                        <i className='bi bi-speedometer2 me-3 fs-5'></i>
                        <span className='fs-4'>Dashboard</span>
                    </Link>
                </li>
                <li className={ active1===2 ? ' active1 nav-item p-3' : "nav-item p-3"} onClick={e=>setactive1(2)}>
                    <Link to="/dashboard/users" className='p-1 text-decoration-none text-white'>
                        <i className='bi bi-people me-3 fs-5'></i>
                        <span className='fs-4'>Users</span>
                    </Link>
                </li>
                <li className={ active1===3 ? ' active1 nav-item p-3' : "nav-item p-3"} onClick={e=>setactive1(3)}>
                    <Link to="/dashbaord/orders" className='p-1 text-decoration-none text-white'>
                        <i className='bi bi-table me-3 fs-5'></i>
                        <span className='fs-4'>Orders</span>
                    </Link>
                </li>
                <li className={ active1===4 ? ' active1 nav-item p-3' : "nav-item p-3"} onClick={e=>setactive1(4)}>
                    <Link className='p-1 text-decoration-none text-white'>
                        <i className='bi bi-grid me-3 fs-5'></i>
                        <span className='fs-4'>Report</span>
                    </Link>
                </li>
            </ul>
        </div>
        <div>
            <hr className='text-secondary'/>
            <li className='nav-item p-2'>
                <span className='p-1 text-decoration-none text-white'>
                    <i className='bi bi-person-circle me-3 fs-r'></i>
                    <span className='fs-4'><strong>Admin</strong></span>
                </span>
            </li>
        </div>
    </div>
  )
}

export default Sidebar