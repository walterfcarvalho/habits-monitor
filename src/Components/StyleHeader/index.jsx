//import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

//import { BtnCabecalho } from '../UI'
import SideBar from '../SideBar/index'
import { corPrimaria } from '../UI/variables'
import Switcher from '../Switcher'

const TheStyledHeader = styled.nav`
  background-color: ${corPrimaria};
  display: flex;
  justify-content: space-between;
  padding: 0 1vw;
  height: 7vh;
  align-items: center;
`

const StyledHeader = ({theTheme, setTheme, title}) => {

  return <TheStyledHeader id={'outer-container'} >
    <SideBar 
      pageWrapId={'page-wrap'} 
      outerContainerId={'outer-container'}
    />

    <h1>  {title}  </h1>
    
    {/* <BtnCabecalho onClick={logout} >
      Logout
    </BtnCabecalho> */}
  
    <Switcher 
      theTheme={theTheme} 
      setTheme={setTheme} 
    /> 

  </TheStyledHeader>
}

export default StyledHeader
