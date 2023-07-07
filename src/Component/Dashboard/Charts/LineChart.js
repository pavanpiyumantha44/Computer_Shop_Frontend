import React from 'react'
import { Chart } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const labels = ["January","February","March","April","May","June"];
const data = {
    labels:labels,
    datasets:[
        {
            label:"Monthly Income",
            backgroundColor:"rgb(83, 156, 245)",
            borderColor:"rgb(6, 51, 105)",
            data:[0,10000,5000,2000,20000,30000,45000],
        },
    ],
};

const LineChart = () => {
  return (
    <div className='bg-white border border-secondary'>
        <Line
        data={data}>

        </Line>
    </div>
  )
}

export default LineChart