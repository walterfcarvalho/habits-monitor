import { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

import { getUserIndicators, getActivitysOfDay } from '../../Firebase/api'
import { ActList } from '../UI'
import { lastSevenDays, theDate } from '../../util/dateTime'
import TheChart from '../Chart'
import StyledHeader  from '../StyleHeader'
import Indicators from '../Indicators'

// const Points = styled.div`
//   background-color:white;
//   border-radius:10px;
//   margin: 5px 20px 5px 5px;
//   padding: 2px;
//   width:20%;
//   text-align:center;
// `

// const Span = styled.span`
//   width: 50%;
// `
const Dasboard = () => {
  const [incatorsWeek, setIndicatorsWeek] = useState()

  useEffect(() => {
    getDataWeek()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // async function getDataDay() {
  //   const userId = JSON.parse(localStorage.getItem("habbit-monitor")).uid
  //   const dayInitial = theDate(0)
  //   const dayFinal = theDate(1)

  //   const day = await mountResume(userId, dayInitial, dayFinal)

  //   setIndicatorsDay(day)
  // }

  async function mountResume(userId, dayInitial, dayFinal) {

    const userIndicators = await getUserIndicators(userId)

    const activitysOfDay = await getActivitysOfDay(userId, dayInitial, dayFinal)

    let activityResume = userIndicators.map(userIndicator => {

      let idx = activitysOfDay.findIndex(act => act.indicator === userIndicator.id)

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