import React from 'react'
import AppRoutes from './routes.jsx'
import {BrowserRouter} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <AppRoutes/>
      </BrowserRouter>
    </div>
  )
}

export default App