import React from 'react'
import ReactDOM from 'react-dom/client'
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import { createBrowserHistory } from "history"

import App from './App'

// Initialize React
const root = ReactDOM.createRoot(document.getElementById('root'))
const history = createBrowserHistory({ window })

root.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <App />
    </ HistoryRouter>
  </React.StrictMode>
)
