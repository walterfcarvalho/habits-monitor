import styled from 'styled-components'
import { TbHeartRateMonitor } from 'react-icons/tb'


const DivContainer = styled.div`
  display:flex;  
  flex-direction: row;
  align-items: center;
`


const Logo = ({ msg }) => {
  return <DivContainer>
    <TbHeartRateMonitor size={'70px'} />

    <h2>{msg}</h2>

  </DivContainer>
}
export default Logo
