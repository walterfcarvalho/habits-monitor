import { useState, useEffect } from 'react'
import { getUserIndicators, updateDocument, getActivitysOfDay, addDocument } from '../../Firebase/api'
import styled from 'styled-components'

import { roundDate, ceilDate } from '../../util/dateTime'
import { Box, Span, EmptyBox } from '../UI'
import IMG_ADD from '../../images/add-button.png'
import IMG_DEL from '../../images/rem-button.png'
import TailSpinContainer from '../../LoadingComponent'

const SetQuantity = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

const Points = styled.div`
  background-color:white;
  border-radius:5px;
  margin: 5px 10px 5px 10px;
  padding: 20px;
  width:50px;
  text-align:center;
  padding: 5px;
`

const Indicators = ({ dateStart, isShowRemove, isEdit, isShowPoints }) => {

  const [useIndicators, setUseIndicators] = useState([])
  const [flag, setFlag] = useState(true)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {

    getDataDay(dateStart)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateStart, flag])

  function deactivateIndicator(idx) {
    updateDocument('userIndicators', useIndicators[idx].userIndicator, { deleted: true })
      .then(res => (
        setUseIndicators(
          useIndicators.filter(item => item.userIndicator !== useIndicators[idx].userIndicator)
        )
      ))
  }

  function addActivity(idx, step) {

    if (useIndicators[idx].activityId) {
      let aux = useIndicators

      updateDocument('activity', aux[idx].activityId, { quantity: aux[idx].quantity + step })

    } else {

      addDocument('activity', {
        indicator: useIndicators[idx].userIndicator,
        date: dateStart,
        quantity: 1,
        user: JSON.parse(localStorage.getItem("habbit-monitor")).uid
      })

    }

    setFlag(!flag)
  }


  async function getDataDay(date) {
    const userId = JSON.parse(localStorage.getItem("habbit-monitor")).uid
    const dayInitial = roundDate(date) // theDate(0)
    const dayFinal = ceilDate(date)

    const day = await mountResume(userId, dayInitial, dayFinal)

    setUseIndicators(day)
  }

  async function mountResume(userId, dayInitial, dayFinal) {

    setLoading(true)

    const userIndicators = await getUserIndicators(userId)
    
    let res = undefined

    if (isShowPoints || isEdit) {

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

    setLoading(false)

    return res
  }

  return <>

    {useIndicators.length === 0 && !isLoading &&
      <EmptyBox>
        
        <p> No indicators added yet </p>

      </EmptyBox>
    }


    { isLoading && <TailSpinContainer/> }

    {useIndicators.length > 0 &&
      useIndicators.map((item, idx) => (
        <Box positive={item.positive} key={idx} >

          <Span>
            {item.indicator}
          </Span>

          {isShowPoints &&
            <Points>
              <h3>
                {item.quantity ? item.quantity : 0}
              </h3>
            </Points>
          }

          {isShowRemove &&
            <img
              onClick={() => deactivateIndicator(idx)}
              src={require("../../images/trash.png")}
              height="30px" width="30px" alt="icon"
            />
          }

          {isEdit &&

            <SetQuantity>
              <img src={IMG_DEL} alt="remove quantity" onClick={() => addActivity(idx, -1)} />

              <Points>
                {item.quantity ? item.quantity : 0}
              </Points>

              <img src={IMG_ADD}  alt="add quantity" onClick={() => addActivity(idx, +1)} />

            </SetQuantity>
          }

        </Box>
      ))
    }

  </>
}

export default Indicators
