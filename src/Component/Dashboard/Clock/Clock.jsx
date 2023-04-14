import React, { useState } from 'react'
import './style.css';
const Clock = () => {
    let time = new Date().toLocaleTimeString();
    const [clock,setClock] = useState();
    const updateClock = ()=>{
        time = new Date().toLocaleTimeString();
        setClock(time);
    }
    setInterval(updateClock,1000);
  return (
    <>
    <div className='wrapper'>
    <h3 className='mx-4'>
        {clock}
    </h3>
    </div>
    </>
  )
}

export default Clock