
import { useEffect, useState } from 'react'
import { Box, Button, ActList } from '../../Components/UI'
import { getUserIndicators, updateIndicator } from '../../Firebase/api'
import StyledHeader from '../StyleHeader'


const UserIndicators = () => {
  const [useIndicators, setUseIndicators] = useState([])
  const [flagForm, setFlagForma] = useState(false)
  
  useEffect(() => {
    listUserIndicators()
  }, [])


  function deactivateIndicator(idx) {
    updateIndicator(useIndicators[idx].userIndicator)
    .then( res => (
      setUseIndicators(
        useIndicators.filter( item => item.userIndicator != useIndicators[idx].userIndicator )
      )
    ))
  }


  function listUserIndicators() {
    const userId = JSON.parse(localStorage.getItem("habbit-monitor")).uid

    getUserIndicators(userId)
      .then(data => setUseIndicators(data))
  }

  return <>
     <StyledHeader></StyledHeader>

    <ActList>

      {useIndicators.map((item, idx) => (

        <Box key={idx} positive={item.positive}  >
          {item.indicator}

          <img onClick={() => deactivateIndicator(idx)} src={require("../../images/trash.png")} height="30px" width="30px" />

        </Box>

      ))}

      <Button primary type="submit" value={"go"} > Add </Button>

    </ActList>




  </>
}
export default UserIndicators
