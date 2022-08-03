import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

 const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Meus habitos',
    },
  },
};

const labels = ['ddss', 'February', 'March', 'April', 'May', 'June', 'July'];

 const data = {
  labels,
  datasets: [
    {
      label: 'olha la',
      data: [1,2,5,3],
      //data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      //borderColor: 'rgb(255, 99, 132)',
      borderColor: 'violet',
      // backgroundColor: 'rgba(255, 99, 132, 0.5)',
      backgroundColor: 'yellow',
    }
  ],
};

export function Dashboard() {
  return <Line options={options} data={data} />;
}

export default Dashboard

uuid: JqwqJNbHtfXocFRkpMfOhZBuo6T2
