import React from 'react';
import './style.css';

const StatusCard = ({type,count,icon,bgColor}) => {
  return (
    <>
        <div className='px-3 pt-2 border rounded-4  shadow-sm pop w-25' style={{background:bgColor}}>
            <div className='row p-3'>
              <div className='col-8'>
              <h1 className='text-center text-white fw-bold'>{count}</h1>
              <h6 className='text-center pb-1 text-white'>{type}</h6>
              </div>
              <div className='col-4 mt-1'>
              {icon}
              </div>  
            </div>
        </div>
    </>
  )
}

export default StatusCard