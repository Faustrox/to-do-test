import '../css/app.css'
import React from 'react'
import ReactDOM from 'react-dom/client'

import Home from './Modules/Home'
import Side from './Modules/Side'

ReactDOM.createRoot(document.getElementById('app')).render(
  <div className='flex flex-row justify-center items-center h-screen bg-slate-800 p-2'>
    <Home />
    <Side />
  </div>
)
