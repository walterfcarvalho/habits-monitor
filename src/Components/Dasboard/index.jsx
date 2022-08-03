import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getUserIndicators, getActivitysOfDay } from '../../Firebase/api'
import TheChart from '../Chart'
import { TailSpin } from 'react-loader-spinner'

import { lastSevenDays, theDate } from '../../util/dateTime'
import  StyledHeader  from '../StyleHeader'
import { Box } from '../UI'

const Points = styled.div`
  background-color:white;
  border-radius:10px;
  margin: 5px 20px 5px 5px;
  padding: 2px;
  width:20%;
  text-align:center;
`
const ActList = styled.div`
  display:flex;
  flex-direction: column;
  align-items: center;
`
const Span = styled.span`
  width: 50%;
`
const Dasboard = () => {
  const [indicatorsByDay, setIndicatorsDay] = useState([])
  const [incatorsWeek, setIndicatorsWeek] = useState()

  useEffect(() => {
    getDataWeek()
    getDataDay()
  }, [])

  async function getDataWeek() {

    const userId = JSON.parse(localStorage.getItem("habbit-monitor")).uid

    let dataWeek = []

    for (let i = 7; i >= 1; i--) {

      let info = await mountResume(userId, theDate(-i), theDate(-i + 1))

      dataWeek.push(
        info.reduce((prev, curr) => prev + curr.quantity * (curr.positive ? 1 : -1), 0)
      )

    }
    setIndicatorsWeek(dataWeek)
  }

  async function getDataDay() {
    const userId = JSON.parse(localStorage.getItem("habbit-monitor")).uid
    const dayInitial = theDate(0)
    const dayFinal = theDate(1)

    const day = await mountResume(userId, dayInitial, dayFinal)

    setIndicatorsDay(day)
  }

  async function mountResume(userId, dayInitial, dayFinal) {

    const userIndicators = await getUserIndicators(userId)

    const activitysOfDay = await getActivitysOfDay(userId, dayInitial, dayFinal)

    let activityResume = userIndicators.map(userIndicator => {

      let idx = activitysOfDay.findIndex(act => act.activity === userIndicator.id)

      return idx >= 0
        ? { ...userIndicator, date: dayInitial, quantity: activitysOfDay[idx].quantity }
        : { ...userIndicator, date: dayInitial, quantity: 0 }
    })
    return activityResume
  }

  return <>

    <StyledHeader title={"Dashboard"}></StyledHeader>

    <ActList>

      {!incatorsWeek &&
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      }

      {incatorsWeek &&
        <TheChart
          data={incatorsWeek}
          labels={lastSevenDays()}
          title={'Last 7 days activities'}
        >
        </TheChart>
      }

      <p> Today activities </p>


      {indicatorsByDay.length > 0 &&
        indicatorsByDay.map((item, idx) => (
          <Box positive={item.positive} key={idx} >

            <Span>
              {item.indicator}
            </Span>

            <Points>
              <h3>
                {item.quantity ? item.quantity : 0}
              </h3>
            </Points>

          </Box>
        ))
      }

    </ActList>
  </>
}

export default Dasboard

/*
uuid: JqwqJNbHtfXocFRkpMfOhZBuo6T2

// 3l9R4cPdUdTDlphfLzna  industrializado
// atAXXihMhfwz50OSM58I  salada
// cTptZJGx3egquH6QbMU5 treino 8 09
// cTptZJGx3egquH6QbMU5 acordar 8 9 
// zDtVVIRSJ0yThdrPAagm bike 15 minutis

activity
date
quantity
user 
*/