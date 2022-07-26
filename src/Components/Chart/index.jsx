import styled from 'styled-components'
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
// import { ChartContainer } from './styles'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const ChartContainer = styled.div`
  background-color: white;
  margin: auto;
  height: 30vh;
  width: 80vw;
  border-radius: 0px 0px 5px 5px;
`

const TheChart = ({ data, labels, title }) => {

  const [dataChart, setDataChart] = useState({
    labels,
    datasets: [
      {
        label: '',
        data: data,
        borderColor: 'black',
        backgroundColor: 'black',
      }
    ]
  })

  const [optionsChart] = useState({
    maintainAspectRatio: false,
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
  )

  useEffect(() => {
    setDataChart(old => {
      let newData = [...old.datasets]
      newData[0].data = [...data]
      return { ...old, datasets: newData }
    })
    // eslint-disable-next-line
  }, [data])


  return <ChartContainer>
    <Line
      datasetIdKey='id'
      options={optionsChart}
      data={dataChart}
    />
  </ChartContainer>
}

export default TheChart

// uuid: JqwqJNbHtfXocFRkpMfOhZBuo6T2

// 3l9R4cPdUdTDlphfLzna  industrializado
// atAXXihMhfwz50OSM58I  salada
// cTptZJGx3egquH6QbMU5 treino 8 09
// cTptZJGx3egquH6QbMU5 acordar 8 9
// zDtVVIRSJ0yThdrPAagm bike 15 minutis