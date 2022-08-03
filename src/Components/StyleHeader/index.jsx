import styled from 'styled-components'
import { BtnCabecalho } from '../UI'
import SideBar from '../SideBar/index'
import { corPrimaria } from '../UI/variables'
import { useNavigate } from 'react-router-dom'

const TheStyledHeader = styled.nav`
background-color: ${corPrimaria};
display: flex;
justify-content: space-between;
padding: 0 1vw;
height: 7vh;
align-items: center;
`

const StyledHeader = ({title}) => {
  let navigate = useNavigate()

  function logout() {
    localStorage.clear()
    navigate("/login")
  }

  return <TheStyledHeader id={'outer-container'} >
    <SideBar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}></SideBar>
    <h1>  {title}  </h1>
    
    <BtnCabecalho onClick={logout}   >
      Logout
    </BtnCabecalho>

  </TheStyledHeader>
}

export default StyledHeader
