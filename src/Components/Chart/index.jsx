import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { ChartContainer } from './styles'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const TheChart = ({ data, labels, title }) => {

  const options = {
    maintainAspectRatio : false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: title,
        text: title,
      },
    },
  }

  const chartData = {
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
    ]
  }


  return (
    <ChartContainer>
      <Line options={options} data={chartData} />
    </ChartContainer>
  )
}

export default TheChart

// uuid: JqwqJNbHtfXocFRkpMfOhZBuo6T2

// 3l9R4cPdUdTDlphfLzna  industrializado
// atAXXihMhfwz50OSM58I  salada
// cTptZJGx3egquH6QbMU5 treino 8 09
// cTptZJGx3egquH6QbMU5 acordar 8 9
// zDtVVIRSJ0yThdrPAagm bike 15 minutis