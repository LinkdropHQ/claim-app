import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/application'
import reportWebVitals from './reportWebVitals'

const {
  REACT_APP_DATADOG_CLIENT_TOKEN,
  REACT_APP_DATADOG_APPLICATION_ID,
  REACT_APP_DATADOG_SERVICE,
  REACT_APP_DATADOG_SITE
} = process.env

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const AppInit = () => {
  return <React.StrictMode>
    <App />
  </React.StrictMode>
}

root.render(AppInit())


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
