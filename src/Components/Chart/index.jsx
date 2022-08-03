import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2'
// import faker from 'faker';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


// const labels = ['ddss', 'February', 'March', 'April', 'May', 'June', 'July'];


const TheChart = ({ data, labels, title }) => {

  function getOptions(title) {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: title,
          text: title,
        },
      },
    };
  }

  function getData(data, labels) {

    return {
      labels,
      datasets: [
        {
          label: '',
          data: data,
          //data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
          //borderColor: 'rgb(255, 99, 132)',
          borderColor: 'violet',
          backgroundColor: 'violet',
        }
      ],
    }
  }


  return <Line options={getOptions(title)} data={getData(data, labels)} />
}

export default TheChart

// uuid: JqwqJNbHtfXocFRkpMfOhZBuo6T2

// 3l9R4cPdUdTDlphfLzna  industrializado
// atAXXihMhfwz50OSM58I  salada
// cTptZJGx3egquH6QbMU5 treino 8 09
// cTptZJGx3egquH6QbMU5 acordar 8 9
// zDtVVIRSJ0yThdrPAagm bike 15 minutis