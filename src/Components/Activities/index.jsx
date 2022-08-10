import { useState } from 'react'

import { ActList } from '../UI'
import StyledHeader from '../StyleHeader'
import Indicators from '../Indicators'
import DateSelector from '../DateSelector'
// import "react-datepicker/dist/react-datepicker.css"
//import DatePicker from "react-datepicker"



const Activities = () => {
  const [startDate, setStartDate] = useState(new Date());

  return <>

    <StyledHeader title={"Daily activities"}></StyledHeader>

    <ActList>

      Activities

      <DateSelector
        startDate={startDate}
        fnOnChange={(date) => setStartDate(date)}      
      />


{/*       <DatePicker 
        selected={startDate} 
        onChange={ (date) => setStartDate(date)} 
      />
 */}
      <Indicators
        dateStart={startDate}
        isShowPoints={false}
        isEdit={true}
        isShowRemove={false}
      />

    </ActList>
  </>
}

export default Activities
