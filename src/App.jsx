import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from 'styled-components'

import { temaClaro, temaEscuro } from './Components/UI/temas'
import { getTheme } from './Components/UI/getTheme'
import { GlobalStyle } from './Components/globalStyle'

import Dasboard from './Components/Dasboard'
import LockedRoute from './Components/ProtectedRoute/Index'
import Login from './Components/Login'
import UserIndicators from './Components/UserIndicators/index.jsx'
import Activities from './Components/Activities'
import NewUser from  './Components/NewUser'
import ResetPassword from './Components/ResetPassword'

const App = () => {

  const [theTheme, setTheme] = useState(getTheme)

  function handleTheme (){
    localStorage.setItem('theme', !theTheme )
    setTheme ( !theTheme )
  }

  return <ThemeProvider theme={theTheme ? temaClaro : temaEscuro} >
    <GlobalStyle />

      <Routes>
        <Route path="/activities" element={<LockedRoute child={<Activities theTheme={theTheme} setTheme={handleTheme} />} />} />

        <Route path="/dashboard" element={<LockedRoute child={<Dasboard theTheme={theTheme} setTheme={handleTheme} />} />} />

        <Route path="/login" element={<Login />} />

        <Route path="/newuser" element={<NewUser />} />

        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route path="/userindicators" element={<LockedRoute child={<UserIndicators theTheme={theTheme} setTheme={handleTheme} />} />} />

        <Route path="*" element={<Login />} />
      </Routes>

  </ThemeProvider>
}

export default App
