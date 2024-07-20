import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "@/assets/styles/global.scss"
import "reset-css"
import { BrowserRouter } from "react-router-dom" //路由模式
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> <App /></BrowserRouter>
  </React.StrictMode>
  ,
)
