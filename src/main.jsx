import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleBook from './components/SingleBook.jsx'
import Login from './components/Login.jsx'
import Account from './components/Account.jsx'
import Register from './components/Register.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store ={store}>
  <React.StrictMode>
  <Router>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/books/:id" element={<SingleBook />}></Route>
          <Route path="/users/login" element={<Login />}></Route>
          <Route path="/users/me" element={<Account />}></Route>
          <Route path="/users/register" element={<Register />}></Route>
        </Routes>
      </Router>
  </React.StrictMode>
  </Provider>
)
