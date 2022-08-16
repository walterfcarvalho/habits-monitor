import { Routes, Route, unstable_HistoryRouter as HistoryRouter } from "react-router-dom"

import Dasboard from './Components/Dasboard'

import { ThemeProvider } from 'styled-components'
import { temaClaro, temaEscuro } from './Components/UI/temas'
import { getThemeObj, getTheme } from './Components/UI/getTheme'
import { useState } from 'react'
import { GlobalStyle } from './Components/globalStyle'


import LockedRoute from './Components/ProtectedRoute/Index'
import Login from './Components/Login'

import UserIndicators from './Components/UserIndicators/index.jsx'
import Activities from './Components/Activities'


const App = () => {

  const [theTheme, setTheme] = useState(getTheme)

  function handleTheme (){
    console.log(`handletheme: ${theTheme}`)
    setTheme ( !theTheme )
  }

  return <ThemeProvider theme={theTheme ? temaClaro : temaEscuro} >
    <GlobalStyle />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<LockedRoute child={<Dasboard theTheme={theTheme} setTheme={handleTheme} />} />} />

        <Route path="/userindicators" element={<LockedRoute child={<UserIndicators theTheme={theTheme} setTheme={handleTheme} />} />} />

        <Route path="/activities" element={<LockedRoute child={<Activities theTheme={theTheme} setTheme={handleTheme} />} />} />

        <Route path="*" element={<Login />} />
      </Routes>

  </ThemeProvider >

}

export default App
