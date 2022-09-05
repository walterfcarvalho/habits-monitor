
import React, {useReducer} from 'react'
import {DateSingleInput} from '@datepicker-react/styled'

const DateSelector = ({startDate, fnOnChange}) => {

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':{
      return {...state, showDatepicker: action.payload}
    } 
    case 'dateChange':{
      fnOnChange(action.payload.date)
      return action.payload
    }
    default:
      throw new Error()
  }
}

  const [state, dispatch] = useReducer(reducer, {date: startDate, showDatepicker: false} )

  return <>
  <DateSingleInput
      onDateChange={data => dispatch({type: 'dateChange', payload: data})}
      onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
      date={state.date} // Date or null
      showDatepicker={state.showDatepicker} // Boolean
      showResetDate={false}
  />
  </>

}

export default DateSelector
