


// export const Clabels =  [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
// ];
// export const Cdata = {
//   labels: Clabels,
//   datasets: [{
//     label: 'My First Dataset',
//     data: [65, 59, 80, 81, 56, 55, 40],
//     fill: false,
//     borderColor: 'rgb(75, 192, 192)',
//     tension: 0.1
//   }]
// };

// const config = {
//   type: 'line',
//   data: Cdata,
//   options: {}
// };

// export const myChart = new Chart(
//   document.getElementById('myChart'),
//   config
// );










// chart react 2


export const getSalesData = (data) => {
  return {
    labels: data?.labels,
    datasets: [
      {
        data: data?.data,
        fill: false,
        backgroundColor: "rgb(13, 51, 112)",
        borderColor: "rgba(13, 51, 112, 0.2)",
      },
    ],
  };
};

export const getPaymethodsData = (data) => {
  return {
    labels: data.bancolombia.labels,
    datasets: [
      {
        label: "Pagos Bancolombia",
        data: data.bancolombia.data,
        fill: false,
        backgroundColor: "rgb(13, 51, 112)",
        borderColor: "rgba(13, 51, 112, 0.2)",
      },
      {
        label: "Pagos Nequi",
        data: data.nequi.data,
        fill: false,
        backgroundColor: "rgb(225, 77, 100)",
        borderColor: "rgba(225, 77, 100, 0.2)",
      },
      {
        label: "Pagos Criptomonedas",
        data: data.crypto.data,
        fill: false,
        backgroundColor: "rgb(254, 242, 0)",
        borderColor: "rgba(254, 242, 0, 0.2)",
      },
    ],
  };
};

export const getTrainingsData = (data = []) => {
  let total = 0;

  for (let training of data) {
    total += training.total;
  }

  return total;
};

export const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 3, 5, 2, 3],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "#06D186",
      // lineTension:0.2
    },
    {
      label: 'Revenue',
      data: [15, 6, 7, 4, 1, 5],
      fill: true,

      backgroundColor: "#9595d136",
      borderColor: "#5768F3",
    },
  ],

};



export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: true,
      // text: "Resumen de transacciones",
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  }, maintainAspectRatio: false,
  scales: {
    x: { grid: { display: true } },
    y: { grid: { display: true } }
  }
};

export const data2 = {
  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  datasets: [
    {
      label: 'Sales',
      data: [],
      fill: true,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "#06D186",
    },

  ],
};

export const options2 = {
  responsive: true, maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: true,
      // text: "Resumen de transacciones",
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};


export const data3 = {
  labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  datasets: [
    {
      label: 'purchases',
      data: [],
      fill: true,
      backgroundColor: "#b796c954",
      borderColor: "#8642addb",
    },

  ],
};

export const options3 = {
  responsive: true, maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: true,
      // text: "Resumen de transacciones",
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export const data4 = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};






// export const data3 = {
//   labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
//   datasets: [
//     {
//       label: "",
//       data: [12, 19, 3, 5, 2, 3, 6],
//       backgroundColor: [
//         "rgb(13, 51, 112)",
//         "rgba(255, 99, 132",
//         "rgba(54, 162, 235",
//         "rgba(255, 206, 86",
//         "rgba(75, 192, 192",
//         "rgba(153, 102, 255",
//         "rgba(255, 159, 64",
//       ],
//       borderColor: ["rgba(13, 51, 112, 1)"],
//       borderWidth: 0,
//     },
//   ],
// };

// export const options3 = {
//   responsive: true,
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     ],
//   },
// };
