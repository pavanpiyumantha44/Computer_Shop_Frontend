import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import axios from 'axios'
import './style.css';
// import Clock from './Clock/Clock';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import DashboardFooter from './Footer/DashboardFooter';
import Notification from './Notification/Notification';


const Dashboard = () => {
    
    const [auth,setAuth] = useState(false);
    const [name,setName] = useState('');
    const [message,setMessage] = useState();
    axios.defaults.withCredentials = true;
    useEffect(()=>{
        axios.get('http://localhost:5000')
        .then(res=>{
            if(res.data.Status === "Success"){
                setAuth(true);
                setName(res.data.name);
            }
            else{
                setAuth(false);
                setMessage(res.data.Message)
            }
        })
        .catch(err =>{
            console.log(err);
        })
    },[]);
    const handleLogout = ()=>
    {
        axios.get("http://localhost:5000/logout")
        .then(res=>{
            if(res.data.Status === "Success"){
                location.reload(true);
            }
            else{
                alert("Error");
            }
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <div>
        {auth ?
        <div className="container-fluid">
        <div className="row flex-nowrap">
            <div className="col-auto col-md-2 col-xl-2 px-sm-2 px-0 bg-primary">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <Link to="/dashboard/home" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5 d-none d-sm-inline fw-bold"><img src='../images/logo.png' style={{width:"50px"}}/>PC Solutions</span>
                </Link>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                {/* <li className="nav-item">
                    <Link to="/dashboard/home" className="nav-link align-middle px-0 text-light">
                    <i className="fs-4 bi-house" /> <span className="ms-1 d-none d-sm-inline">Home</span>
                    </Link>
                </li> */}

                {/* <li>
                    <Link to="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-light">
                    <i className="fs-4 bi-speedometer2"/> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
                    <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                    <li className="w-100">
                        <Link to='#' className="nav-link px-0 text-light"> <span className="d-none d-sm-inline">Item</span> 1 </Link>
                    </li>
                    <li>
                        <Link to="#" className="nav-link px-0 text-light"> <span className="d-none d-sm-inline">Item</span> 2 </Link>
                    </li>
                    </ul>
                </li> */}
                <li>
                    <Link to="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-light">
                    <i className="fs-4 bi-grid" /> <span className="ms-1 d-none d-sm-inline">Products</span> </Link>
                    <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                    <li className="w-100">
                        <Link to="/dashboard/brands" className="nav-link px-0 text-light"> <span className="d-none d-sm-inline">Brands</span></Link>
                    </li>
                    <li>
                        <Link to='/dashboard/category' className="nav-link px-0 text-light"> <span className="d-none d-sm-inline">Category</span></Link>
                    </li>
                    <li>
                        <Link to='/dashboard/items' className="nav-link px-0 text-light"> <span className="d-none d-sm-inline">Items</span></Link>
                    </li>
                    </ul>
                </li>
                <li>
                    <Link to="/dashboard/employee" className="nav-link px-0 align-middle text-light">
                    <i className="fs-4 bi-people" /> <span className="ms-1 d-none d-sm-inline">Employee</span> </Link>
                </li>
                <li>
                    <Link to="/dashboard/customer" className="nav-link px-0 align-middle text-light">
                    <i className="fs-4 bi-people" /> <span className="ms-1 d-none d-sm-inline">Customers</span> </Link>
                </li>
                <li>
                    <Link to="/dashboard/orders" className="nav-link px-0 align-middle text-light">
                    <i className="fs-4 bi-table" /> <span className="ms-1 d-none d-sm-inline">Orders</span></Link>
                </li>
                <li>
                    <Link to='/dashboard/repairs' className="nav-link px-0 align-middle text-light">
                    <i className="fs-4 bi bi-tools"></i><span className="ms-1 d-none d-sm-inline">Repair</span> </Link>
                </li>
                {/* <li>
                    <Link to='/dashboard/report' className="nav-link px-0 align-middle text-light">
                    <i className="fs-4 bi bi-file-earmark-bar-graph-fill"></i><span className="ms-1 d-none d-sm-inline">Reports</span> </Link>
                </li> */}
                <li>
                    <Link to="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle text-light">
                   <i className="fs-4 bi bi-file-earmark-bar-graph-fill"></i><span className="ms-1 d-none d-sm-inline">Reports</span></Link>
                    <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                    <li className="w-100">
                        <Link to="/dashboard/report/inventory" className="nav-link px-0 text-light"> <span className="d-none d-sm-inline">Inventory</span></Link>
                    </li>
                    <li className="w-100">
                        <Link to="/dashboard/report/repair" className="nav-link px-0 text-light"> <span className="d-none d-sm-inline">Repair</span></Link>
                    </li>
                    <li>
                        <Link to="/dashboard/report/sales" className="nav-link px-0 text-light"> <span className="d-none d-sm-inline">Sales Report</span></Link>
                    </li>
                    </ul>
                </li>
                {/* <li>
                    <Link to='/dashboard/billing' className="nav-link px-0 align-middle text-light">
                    <i className="fs-4 bi bi-receipt-cutoff"></i><span className="ms-1 d-none d-sm-inline">Billing</span> </Link>
                </li> */}
                </ul>
                <hr />
            </div>

            </div>
                <div className="col p-0 m-0">
                    <div className='p-2 d-flex shadow'>
                        {/* <Clock/> */}
                        <div className='d-flex ms-auto'>
                            {/* <i className="bi bi-bell-fill fs-4 mt-2 mx-4"></i> */}
                            {/* <i className="bi bi-bell-fill fs-4 mt-2"/><Notification/> */}
                            <i className="bi bi-bell-fill fs-4 mt-2 text-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false"/><Notification/>
                            <div className="dropdown-center">
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><a className="dropdown-item" href="#">Notification 1</a></li>
                                    <li><a className="dropdown-item" href="#">Notification 2</a></li>
                                </ul>
                            </div>
                            <div className="dropdown-center">
                                <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="../images/admin_icon.png" alt="" width={34} height={30} className="rounded-circle" /><span className='mx-2'>Admin</span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" to='/dashboard/adminprofile'>Settings</Link></li>
                                    <li><Link className="dropdown-item" to='/cashierDashboard/billing'>Switch to Cashier</Link></li>
                                    <li onClick={handleLogout}><Link className="dropdown-item" to="/#">Logout</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <Outlet/>
                </div>
            </div>
            <DashboardFooter/>
        </div>
        :
        <div className='d-flex justify-content-center mt-5'>
            <div className='card'>
            <div className='card-header'>
                <h1 className='text-danger'>You must loggedin first</h1>
            </div>
            <div className='card-body d-flex justify-content-center'>
                <Link to='/login' className='btn btn-primary'>Login</Link>
            </div>
            </div>
        </div>
        }
    </div>
  )
}

export default Dashboard