import React, { useEffect, useState } from 'react'
import InventoryPDF from './InventoryPDF'


const InventoryReport = () => {
    
  return (
    <>
    <div className='px-5'>
            {/* <div className='row mb-5'>
                <div className='col-6'>
                    <Doughnut2/>
                </div>
                <div className='col-6'>
                    <LowestQtyItems/>
                </div>
            </div> */}
            <InventoryPDF/>
    </div>
    </>
  )
}

export default InventoryReport