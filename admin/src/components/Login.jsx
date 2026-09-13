import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
      if (response.data.success) {
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <div className='w-full max-w-md'>

        {/* Card */}
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10'>

          {/* Logo + heading */}
          <div className='text-center mb-8'>
            <img src={assets.logo} className='h-8 w-auto mx-auto mb-5' alt='Forever Store' />
            <h1 className='text-xl font-semibold text-gray-900'>Admin Panel</h1>
            <p className='text-sm text-gray-500 mt-1'>Sign in to manage your store</p>
          </div>

          <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>

            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-gray-600'>Email Address</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400'
                type='email'
                placeholder='admin@example.com'
                required
              />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-gray-600'>Password</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400'
                type='password'
                placeholder='••••••••'
                required
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              className='mt-2 w-full bg-gray-900 text-white text-sm font-medium py-3.5 rounded-xl hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {loading && (
                <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                  <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
                </svg>
              )}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>

          </form>
        </div>

      </div>
    </div>
  )
}

export default Login
