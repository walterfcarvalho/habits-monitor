import { useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { ActList } from '../UI'
import StyledHeader from '../StyleHeader'
import Indicators from '../Indicators'


const Activities = () => {
  const [startDate, setStartDate] = useState( new Date() );

  return <>

    <StyledHeader title={"Daily activities"}></StyledHeader>

    <ActList>

      Activities


      <DatePicker 
        selected={startDate} 
        onChange={ (date) => setStartDate(date)} 
      />

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