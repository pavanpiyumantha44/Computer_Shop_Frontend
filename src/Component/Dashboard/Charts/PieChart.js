import React from 'react'
import { Chart } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';

const labels = ["January","February","March","April","May","June"];
const data = {
    labels:labels,
    datasets:[
        {
            label:"Monthly Expenses",
            backgroundColor:[
              'rgba(61, 121, 224,0.8)',
              'rgba(247, 15, 85,0.8)',
              'rgba(45, 13, 252,0.8)',
              'rgba(136, 12, 245,0.8)',
              'rgba(245, 175, 12,0.8)',
              'rgba(13, 252, 41,0.8)',
            ],
            borderColor:"rgb(6, 51, 105)",
            data:[0,10,5,2,20,30,45],

        },
    ],
};

const PieChart = () => {
  return (
    <div className='bg-white border border-secondary pb-3'>
        {/* <p className='text-center text-danger fw-bold mt-1 fs-5'>Monthly Expenses</p> */}
        <Pie
        data={data}>

        </Pie>
    </div>
  )
}

export default PieChart