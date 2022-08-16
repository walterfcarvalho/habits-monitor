import { useEffect, useState } from 'react'

import { getUserIndicators, getActivitysOfDay } from '../../Firebase/api'
import { ActList,EmptyBox } from '../UI'
import { lastSevenDays, theDate } from '../../util/dateTime'
import TheChart from '../Chart'
import StyledHeader  from '../StyleHeader'
import Indicators from '../Indicators'
import TailSpinContainer from '../../LoadingComponent'


const Dasboard = ({ theTheme, setTheme}) => {
  const [incatorsWeek, setIndicatorsWeek] = useState()

  useEffect(() => {
    getDataWeek()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getDataWeek() {

    const userId = JSON.parse(localStorage.getItem("habbit-monitor")).uid

    let dataWeek = []

    for (let i = 6; i >= 0; i--) {

      let info = await mountResume(userId, theDate(-i), theDate(-i + 1))
      
      dataWeek.push(
        info.reduce((prev, curr) => prev + curr.quantity * (curr.positive ? 1 : -1), 0)
      )
    }
    setIndicatorsWeek(dataWeek)
  }


  async function mountResume(userId, dayInitial, dayFinal) {

    // const userIndicators = mockData.userIndicators || await getUserIndicators(userId)
    // const activitysOfDay = mockData.activities || await getActivitysOfDay(userId, dayInitial, dayFinal)

    const userIndicators = await getUserIndicators(userId)

    const activitysOfDay = await getActivitysOfDay(userId, dayInitial, dayFinal)

    let activityResume = userIndicators.map(userIndicator => {

      let idx = activitysOfDay.findIndex(act => act.indicator === userIndicator.userIndicator)

      return idx >= 0
        ? { ...userIndicator, date: dayInitial, quantity: activitysOfDay[idx].quantity }
        : { ...userIndicator, date: dayInitial, quantity: 0 }
    })
    return activityResume
  }

  return <>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

    <StyledHeader 
      theTheme={theTheme}
      setTheme={setTheme}
      title={"Dashboard"}
    />

    <ActList>

      { !incatorsWeek &&
        <TailSpinContainer />
      }

      {incatorsWeek &&
        <TheChart
          data={incatorsWeek}
          labels={lastSevenDays()}
          title={'Last 7 days activities'}
        >
        </TheChart>
      }

      <EmptyBox>
        <p> Today activities </p>
      </EmptyBox>


      <Indicators
        dateStart={ new Date() }
        isShowPoints={true}
        isEdit={false}
        isShowRemove={false}
      />
    </ActList>
  </>
}

export default Dasboard

/*
uuid: qtLQLiRqtFcbrqUu8zOnPsfEuPv2

// 3l9R4cPdUdTDlphfLzna  industrializado
// atAXXihMhfwz50OSM58I  salada
// cTptZJGx3egquH6QbMU5 treino 8 09
// zDtVVIRSJ0yThdrPAagm bike 15 minutis

activity
date
quantity
user 
*/