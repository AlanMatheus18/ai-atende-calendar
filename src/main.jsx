import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/ai-atende-calendar/:hash', '/ai-atende-calendar'} element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
