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
const Doughnut2 = ()=>{
  //Handle Doughnut Chart
const [mostSoldItem,setMostSoldItem] = useState([]);
const [soldItemsForDoughnut,setSoldItemsForDoughnut] = useState([]);
const [soldItemsCountForDoughnut,setSoldItemsCountForDoughnut] = useState([]);
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
  labels: soldItemsForDoughnut,
  datasets: [
    {
      label: 'Count',
      data: soldItemsCountForDoughnut,
      backgroundColor: bgColorForDoughnut,
      borderColor: borderColorForDoughnut,
      borderWidth: 1,
    },
  ],
};
const setDoughnut = ()=>{
  for(let i=0; i<mostSoldItem.length; i++){
    let item = mostSoldItem[i].brandName+ " - "+mostSoldItem[i].ItemName;
    soldItemsForDoughnut.push(item);
    soldItemsCountForDoughnut.push(mostSoldItem[i].item_count);
    bgColorForDoughnut.push(bgColor[i]);
    borderColorForDoughnut.push(borderColor[i]);
  }
}
const [display,setDisplay] = useState(false);
useEffect(()=>{
  axios.get('http://localhost:5000/dashboard/getReport/mostSold')
    .then(res=>{
      console.log(res);
      if(res.data.Result.length!==0){
        setMostSoldItem(res.data.Result);
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
<div className='bg-white shadow-sm pb-2 mb-5 ms-5'>
  <h6 className='text-center p-2'>Most Sold items</h6>
  {mostSoldItem.length!==0?<Doughnut data={dataForDoughnut}/>:<Doughnut data={data}/>}
</div>
);
}
export default Doughnut2;