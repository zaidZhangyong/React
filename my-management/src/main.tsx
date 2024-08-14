import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "@/assets/styles/global.scss"
import "reset-css"
import { BrowserRouter, HashRouter } from "react-router-dom" //路由模式
import { Suspense } from "react"  //路由使用lazy 懒加载, 必须配置Suspense
import { Provider } from 'react-redux';
import store from "./store";
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<div>Loading...</div>}>
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>,
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>
  ,
)
