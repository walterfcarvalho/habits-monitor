import { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

 

const Activities = () => {
  const [startDate, setStartDate] = useState(new Date());

  return <>
    Activities

    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />


  </>
}

export default Activities