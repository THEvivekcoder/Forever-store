import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '₹'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  if (token === '') {
    return (
      <>
        <ToastContainer position='top-right' autoClose={3000} />
        <Login setToken={setToken} />
      </>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <ToastContainer position='top-right' autoClose={3000} />
      <Navbar setToken={setToken} />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex-1 p-6 sm:p-8 overflow-auto'>
          <Routes>
            <Route path='/' element={<Navigate to='/add' replace />} />
            <Route path='/add' element={<Add token={token} />} />
            <Route path='/list' element={<List token={token} />} />
            <Route path='/orders' element={<Orders token={token} />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
