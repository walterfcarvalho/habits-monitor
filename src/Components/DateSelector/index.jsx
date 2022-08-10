//import DatePicker from "react-datepicker"

import React, {useReducer} from 'react'
import {DateSingleInput} from '@datepicker-react/styled'

// import "react-datepicker/dist/react-datepicker.css"
// import './react-datepicker.css'
//import "react-datepicker/dist/react-datepicker.css"

const DateSelector = ({startDate, fnOnChange}) => {

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':{
      console.log('çhange' )
      return {...state, showDatepicker: action.payload}
    }
    case 'dateChange':{
      console.log('datachange' )
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

{/*   <DateSingleInput
      onDateChange={data => dispatch({type: 'dateChange', payload: data})}
      onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
      date={state.date} // Date or null
      showDatepicker={state.showDatepicker} // Boolean
  />
 */}




{/*    <DatePicker
    selected={startDate}
    onChange={fnOnChange}
  />
 */}  </>

}

export default DateSelector
