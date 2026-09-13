import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setVisible(location.pathname.includes('collection'))
  }, [location])

  if (!showSearch || !visible) return null

  return (
    <div className='bg-white border-b border-gray-100 py-3 px-4'>
      <div className='max-w-lg mx-auto flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5'>
        <img src={assets.search_icon} className='w-4 h-4 text-gray-400 flex-shrink-0' alt='' />
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400'
          type='text'
          placeholder='Search products…'
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className='text-gray-400 hover:text-gray-700 transition-colors text-lg leading-none'
          >
            ×
          </button>
        )}
        <button
          onClick={() => setShowSearch(false)}
          className='text-gray-400 hover:text-gray-700 transition-colors ml-1'
          aria-label='Close search'
        >
          <img src={assets.cross_icon} className='w-3 h-3' alt='Close' />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
