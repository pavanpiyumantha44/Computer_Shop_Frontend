import React from 'react'

const StatusCard = ({type,count,icon}) => {
  return (
    <>
        <div className='px-3 pt-2 border rounded-4 bg-white shadow-sm pop w-25'>
            <div className='row p-3'>
              <div className='col-8'>
              <h1 className='text-center'>{count}</h1>
              <h6 className='text-center pb-1 text-secondary'>{type}</h6>
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