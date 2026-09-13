import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
  return (
    <header className='sticky top-0 z-40 bg-white border-b border-gray-100'>
      <div className='flex items-center justify-between h-14 px-5 sm:px-8'>

        {/* Logo */}
        <div className='flex items-center gap-3'>
          <img src={assets.logo} className='h-7 w-auto' alt='Forever Store' />
          <span className='hidden sm:inline text-xs font-medium text-gray-400 border border-gray-200 rounded-full px-2.5 py-0.5'>
            Admin
          </span>
        </div>

        {/* Right */}
        <button
          onClick={() => setToken('')}
          className='flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors border border-gray-200 rounded-full px-4 py-1.5 hover:border-gray-400'
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
          </svg>
          <span className='hidden sm:inline'>Logout</span>
        </button>

      </div>
    </header>
  )
}

export default Navbar
