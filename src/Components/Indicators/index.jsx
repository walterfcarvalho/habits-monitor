import { useState, useEffect } from 'react'
import { getUserIndicators, updateDocument, getActivitysOfDay, addDocument } from '../../Firebase/api'
import styled from 'styled-components'

import * as dateUtil from '../../util/dateTime'
import { Box, EmptyBox } from '../UI'
//import IMG_ADD from '../../images/add-button.png'
//import IMG_DEL from '../../images/rem-button.png'
import TailSpinContainer from '../../LoadingComponent'

const H3 = styled.h3`
color: ${({ theme }) => theme.text} ;
`

const Points = styled.input`
  background-color: ${({ theme }) => theme.body};
  border-radius:5px;
  margin: 5px 10px 5px 10px;
  padding: 20px;
  width:50px;
  text-align:center;
  padding: 5px;
  font-size: x-large;
  `

const SetQuantity = styled.div`
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `

const Indicators = ({ dateStart, isShowRemove, isEdit, setIndicatorsWeek }) => {

  const [useIndicators, setUseIndicators] = useState([])
  //const [flag, setFlag] = useState(true)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {

    getDataDay(dateStart)
    //}, [dateStart, flag])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function deactivateIndicator(idx) {
    updateDocument('userIndicators', useIndicators[idx].userIndicator, { deleted: true })
      .then(res => (
        setUseIndicators(
          useIndicators.filter(item => item.userIndicator !== useIndicators[idx].userIndicator)
        )
      ))
  }

  function setValueTodayChart() {
    const iniValue = 0
    let resultDia = useIndicators.reduce( (p,c) =>  p + parseInt(c.quantity) * (c.positive ? 1 : -1), iniValue)

    setIndicatorsWeek( oldState => {
      oldState[6] = resultDia
      return [...oldState]
    })
  }


  function setActivity(e, idx) {
    let quantity = parseInt(e.target.value)

    if (useIndicators[idx].quantity === quantity) return

    if (useIndicators[idx].activityId ) {
      updateDocument('activity', useIndicators[idx].activityId, { quantity: quantity })
      setValueTodayChart()
    } else {
      
      addDocument('activity', {
        indicator: useIndicators[idx].userIndicator,
        date: dateStart,
        quantity: quantity,
        user: JSON.parse(localStorage.getItem("habbit-monitor")).uid
      })
      setValueTodayChart()
    }
    //setFlag(!flag)
  }

  function handleChange(e) {

    setUseIndicators(indicators =>
      indicators.map(item => item.userIndicator === e.target.id
        ? { ...item, quantity: e.target.value }
        : { ...item }
      )
    )

  }

  async function getDataDay(date) {
    const userId = JSON.parse(localStorage.getItem("habbit-monitor")).uid
    const dayInitial = dateUtil.roundDate(date) // theDate(0)
    const dayFinal = dateUtil.ceilDate(date)

    setLoading(true)

    const day = await mountResume(userId, dayInitial, dayFinal)

    setLoading(false)

    console.log('getDataDay', day)

    setUseIndicators(day)
  }

  async function mountResume(userId, dayInitial, dayFinal) {

    const userIndicators = await getUserIndicators(userId)

    let res = undefined

    if (isEdit) {

      const activitysOfDay = await getActivitysOfDay(userId, dayInitial, dayFinal)

      let activityResume = userIndicators.map(userIndicator => {

        let idx = activitysOfDay.findIndex(act => act.indicator === userIndicator.userIndicator)

        return idx >= 0
          ? { ...userIndicator, date: dayInitial, quantity: activitysOfDay[idx].quantity, activityId: activitysOfDay[idx].id }
          : { ...userIndicator, date: dayInitial, quantity: 0, activityId: "" }
      })

      res = activityResume
    } else {

      res = userIndicators
    }
    return res
  }

  return <>

    {!isLoading && useIndicators.length === 0 &&
      <EmptyBox>

        <p> No indicators added yet </p>

      </EmptyBox>
    }

    {isLoading && <TailSpinContainer />}

    {useIndicators.length > 0 &&
      useIndicators.map((item, idx) => (
        <Box positive={item.positive} key={idx} >

          <H3>
            {item.indicator}
          </H3>

          {isShowRemove &&
            <img
              onClick={() => deactivateIndicator(idx)}
              src={require("../../images/trash.png")}
              height="30px" width="30px" alt="icon"
            />
          }

          {isEdit &&

            <SetQuantity>

              <Points
                value={item.quantity}
                id={item.userIndicator}
                onChange={handleChange}
                onBlur={(e) => setActivity(e, idx) }
              >
              </Points>

            </SetQuantity>
          }

        </Box>
      ))
    }

  </>
}

export default Indicators
