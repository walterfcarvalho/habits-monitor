import React from 'react'
import ReactDOM from 'react-dom/client'
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import { createBrowserHistory } from "history"

import App from './App'




// Initialize Firebase
// const appFire = initializeApp(firebaseConfig)

// Initialize React
const root = ReactDOM.createRoot(document.getElementById('root'))
const history = createBrowserHistory({ window })

// const theTheme = { type: getTheme() }

// function setTheme() {
//   console.log(theTheme)
//   localStorage.setItem('theme', !theTheme.type)
//   theTheme.type = !theTheme.type
// }

root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <App />
    </ HistoryRouter>
  </React.StrictMode>
)
