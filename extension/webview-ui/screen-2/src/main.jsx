import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { VscodeApiContextProvider } from './context/VscodeApiContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VscodeApiContextProvider>
      <App />
    </VscodeApiContextProvider>
  </React.StrictMode>,
)
