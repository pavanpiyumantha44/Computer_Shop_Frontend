import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
};  
const labels = ["January","February","March","April","May","June"];
const data = {
    labels:labels,
    datasets:[
        // {
        //     label:"Monthly Expenses",
        //     backgroundColor:[
        //       'rgba(61, 121, 224,0.8)',
        //       'rgba(247, 15, 85,0.8)',
        //       'rgba(45, 13, 252,0.8)',
        //       'rgba(136, 12, 245,0.8)',
        //       'rgba(245, 175, 12,0.8)',
        //       'rgba(13, 252, 41,0.8)',
        //     ],
        //     borderColor:"rgb(6, 51, 105)",
        //     data:[0,10,5,2,20,30,45],

        // },
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
    ],
};
const BarChart = () => {
  return (
    <Bar options={options} data={data} />
  );
}

export default BarChart