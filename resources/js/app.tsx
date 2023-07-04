import '../css/app.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { AuthProvider } from './Modules/Auth/AuthProvider'
import Home from './Modules/Home'

ReactDOM.createRoot(document.getElementById('app')).render(
  <AuthProvider>
    <Home />
  </AuthProvider>
)
