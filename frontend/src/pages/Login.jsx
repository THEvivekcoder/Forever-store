import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const [loading, setLoading] = useState(false)
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (currentState === 'Sign Up') {
        const res = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (res.data.success) {
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
        } else {
          toast.error(res.data.message)
        }
      } else {
        const res = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (res.data.success) {
          setToken(res.data.token)
          localStorage.setItem('token', res.data.token)
        } else {
          toast.error(res.data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (token) navigate('/') }, [token])

  return (
    <div className='min-h-[80vh] flex items-center justify-center px-4 py-16'>
      <div className='w-full max-w-md'>

        {/* Header */}
        <div className='text-center mb-8'>
          <img src={assets.logo} className='h-8 w-auto mx-auto mb-6' alt='Forever Store' />
          <h1 className='text-2xl font-medium text-gray-900'>
            {currentState === 'Login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            {currentState === 'Login'
              ? 'Sign in to your Forever Store account'
              : 'Join Forever Store and start shopping'}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className='flex flex-col gap-4'>

          {currentState === 'Sign Up' && (
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-gray-600'>Full Name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className='border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors'
                type='text'
                placeholder='John Doe'
                required
              />
            </div>
          )}

          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-gray-600'>Email Address</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors'
              type='email'
              placeholder='john@example.com'
              required
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-gray-600'>Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors'
              type='password'
              placeholder='••••••••'
              required
            />
          </div>

          {currentState === 'Login' && (
            <div className='text-right'>
              <button type='button' className='text-xs text-gray-400 hover:text-black transition-colors'>
                Forgot password?
              </button>
            </div>
          )}

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-black text-white text-sm font-medium py-3.5 rounded-full mt-2 hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {loading && (
              <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
              </svg>
            )}
            {loading ? 'Please wait…' : currentState === 'Login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className='text-center text-sm text-gray-500 mt-6'>
          {currentState === 'Login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type='button'
            onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
            className='font-medium text-gray-900 hover:underline transition-colors'
          >
            {currentState === 'Login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>

      </div>
    </div>
  )
}

export default Login
