import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Home from './Home'
import User from './User'
import Order from './Order'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
const Dashboard = () => {
    const [toggle,setToggle] = useState(false);
    const Toggle = ()=>{
        setToggle(!toggle);
    }
    useEffect(()=>{
        const handleSize = ()=>{
            if(window.innerWidth>769)
            {
                setToggle(false);
            }
            window.addEventListener('resize',handleSize);
            return()=>{
                window.removeEventListener('resize',handleSize);
            }
        }
    },[])
  return (
    <BrowserRouter>
    <div className='d-flex'>
        <div className={toggle?"d-none":"w-auto position-fixed"}>
            <Sidebar/>
        </div>
        <div className={toggle?"d-none":"invisible"}>
            <Sidebar/>
        </div>
        <div className='col overflow-auto'>
            <Navbar
                Toggle = {Toggle}
            />
            {/* <Routes>
                <Route path='/dashboard' element={<Home/>}></Route>
                <Route path='/dashboard/users' element={<User/>}></Route>
                <Route path='/dashboard/orders' element={<Order/>}></Route>
            </Routes> */}
        </div>
    </div>
    </BrowserRouter>
  )
}

export default Dashboard