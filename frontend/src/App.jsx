import React from 'react'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    < BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path="*" element={<p>Route not found</p>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App