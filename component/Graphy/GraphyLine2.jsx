import React from 'react'
import {
    Chart,

} from 'chart.js';
import { useEffect } from 'react';
const GraphyLine2 = () => {

    // useEffect(() => {

    //     const ctx = document.getElementById('myChart').getContext('2d');
    //     const myChart = new Chart(ctx, {
    //         type: 'line',
    //         data: {
    //             labels: ['1', '2', '3', '4', '5', '6'],
    //             datasets: [{
    //                 // label: false,
    //                 data: [5, 7, 10, 13, 17, 24, 27],
    //                 fill: true,
    //                 borderColor: '#F35757',
    //                 backgroundColor: '#cd7c7cbf',
    //                 tension: 0.5,
    //                 pointStyle: 'circle',
    //                 pointRadius: 5,
    //                 pointHoverRadius: 15,
    //                 pointBackgroundColor: "#edece357"
    //             }]
    //         },
    //         options: {
    //             scales: {
    //                 yAxes: [
    //                     {
    //                         ticks: {
    //                             beginAtZero: true,
    //                         },
    //                     },
    //                 ],
    //             }, maintainAspectRatio: false,
    //             scales: {
    //                 x: { grid: { display: true } },
    //                 y: { grid: { display: true } }
    //             }
    //         }
    //     });
    // })

    return (
        <div>   <canvas id="myChart" width="400" height="400"></canvas>

        </div>
    )
}

export default GraphyLine2