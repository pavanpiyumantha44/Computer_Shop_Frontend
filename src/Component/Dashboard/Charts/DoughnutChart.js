import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: 'Count : ',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 0.9)',
        'rgba(54, 162, 235, 0.9)',
        'rgba(255, 206, 86, 0.9)',
        'rgba(75, 192, 192, 0.9)',
        'rgba(153, 102, 255,0.9)',
        'rgba(255, 159, 64, 0.9)',
      ],
      borderWidth: 1,
    },
  ],
};
const DoughnutChart = ()=>{
  //Handle Doughnut Chart
const [mostRepairedItem,setMostRepairedItem] = useState([]);
const [repairItemsForDoughnut,setRepairItemsForDoughnut] = useState([]);
const [repairItemsCountForDoughnut,setRepairItemsCountForDoughnut] = useState([]);
const [bgColorForDoughnut,setBgColorForDoughnut] = useState([]);
const [borderColorForDoughnut,setBorderColorForDoughnut] = useState([]);

const bgColor = [
  'rgba(255, 99, 132, 0.8)',
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
];

const borderColor = [
  'rgba(255, 99, 132, 0.9)',
  'rgba(54, 162, 235, 0.9)',
  'rgba(255, 206, 86, 0.9)',
  'rgba(75, 192, 192, 0.9)',
  'rgba(153, 102, 255,0.9)',
  'rgba(255, 159, 64, 0.9)',
]

const  dataForDoughnut = {
  labels: repairItemsForDoughnut,
  datasets: [
    {
      label: 'Count',
      data: repairItemsCountForDoughnut,
      backgroundColor: bgColorForDoughnut,
      borderColor: borderColorForDoughnut,
      borderWidth: 1,
    },
  ],
};
const setDoughnut = ()=>{
  for(let i=0; i<mostRepairedItem.length; i++){
    repairItemsForDoughnut.push(mostRepairedItem[i].Item);
    repairItemsCountForDoughnut.push(mostRepairedItem[i].item_count);
    bgColorForDoughnut.push(bgColor[i]);
    borderColorForDoughnut.push(borderColor[i]);
  }
}
const [display,setDisplay] = useState(false);
useEffect(()=>{
  axios.get('http://localhost:5000/dashboard/repairs/mostRepairedItem')
    .then(res=>{
      console.log(res);
      if(res.data.Result.length!==0){
        setMostRepairedItem(res.data.Result);
        if(!display){
          setDisplay(true);
          setDoughnut();
        }
        else{
          setDisplay(true);
          setDoughnut();
        }
      }
    })
    .catch(err=>{
      console.log(err);
    })
},[display])
return( 
<div className='bg-white shadow pb-2'>
  <h6 className='text-center p-2'>Most received items to repair</h6>
  {mostRepairedItem.length!==0?<Doughnut data={dataForDoughnut}/>:<Doughnut data={data}/>}
</div>
);
}
export default DoughnutChart;