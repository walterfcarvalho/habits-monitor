import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, Redirect, unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import { createBrowserHistory } from "history"
import { initializeApp } from "firebase/app"
import { firebaseConfig } from './Firebase/config'
import { getAnalytics } from "firebase/analytics"

import LockedRoute from './Components/ProtectedRoute/Index'
import Login from './Components/Login'
import { GlobalStyle } from './Components/globalStyle'
import Dasboard from './Components/Dasboard'
import UserIndicators from './Components/UserIndicators/index.jsx'
import Activities from './Components/Activities'

// Initialize Firebase
const appFire = initializeApp(firebaseConfig)
const analytics = getAnalytics(appFire)

// Initialize React
const root = ReactDOM.createRoot(document.getElementById('root'))
const history = createBrowserHistory({ window })


root.render(
  <React.StrictMode>
    <GlobalStyle />
    <HistoryRouter history={history}>

    <Routes>
    
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={ <LockedRoute child={<Dasboard />}/> }/>

      <Route path="/userindicators" element={ <LockedRoute child={<UserIndicators />}/> }/>
     
      <Route path="/activities" element={ <LockedRoute child={<Activities />}/> }/>

      <Route path="*" element={<Login />} />

    </Routes>
    </ HistoryRouter>
  </React.StrictMode>
)
