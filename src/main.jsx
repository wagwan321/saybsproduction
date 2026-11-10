import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/noto-serif-display/wght.css'
import '@fontsource-variable/noto-serif-display/wght-italic.css'
import '@fontsource-variable/jost'
import './styles.css'
import './motion.css'
import './museum.css'
import App from './App.jsx'

document.documentElement.classList.add('js')

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
