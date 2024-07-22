import { BrowserRouter } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from "./Redux/store.js"
import App from './App.jsx'
import React from 'react'
// import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
