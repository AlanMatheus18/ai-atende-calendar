import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/site/calendar/:query' element={<App />} />
        <Route path='/site/calendar/' element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
