import { useState } from 'react'

import { ActList, EmptyBox } from '../UI'
import StyledHeader from '../StyleHeader'
import Indicators from '../Indicators'
import DateSelector from '../DateSelector'

const Activities = ({ theTheme, setTheme }) => {
  const [startDate, setStartDate] = useState(new Date());

  return <>

    <StyledHeader
      title={"Daily activities"}
      theTheme={theTheme}
      setTheme={setTheme}
    />

    <ActList>

      <EmptyBox>
        <p> Today activities </p>
      </EmptyBox>

      <DateSelector
        startDate={startDate}
        fnOnChange={(date) => setStartDate(date)}
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
