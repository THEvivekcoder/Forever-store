import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const logout = () => {
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/collection', label: 'Collection' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
        <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>

            {/* Logo */}
            <Link to='/' className='flex-shrink-0'>
              <img src={assets.logo} className='h-8 w-auto' alt='Forever Store' />
            </Link>

            {/* Desktop nav */}
            <nav className='hidden md:flex items-center gap-8'>
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `text-sm font-medium tracking-wide transition-colors duration-200 relative pb-0.5
                    ${isActive
                      ? 'text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-black'
                      : 'text-gray-500 hover:text-black'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Right icons */}
            <div className='flex items-center gap-5'>
              {/* Search */}
              <button
                onClick={() => { setShowSearch(true); navigate('/collection') }}
                className='text-gray-500 hover:text-black transition-colors'
                aria-label='Search'
              >
                <img src={assets.search_icon} className='w-5 h-5' alt='Search' />
              </button>

              {/* Account */}
              <div className='relative group'>
                <button
                  onClick={() => !token && navigate('/login')}
                  className='text-gray-500 hover:text-black transition-colors'
                  aria-label='Account'
                >
                  <img src={assets.profile_icon} className='w-5 h-5' alt='Account' />
                </button>
                {token && (
                  <div className='absolute right-0 top-full mt-2 w-44 bg-white border border-gray-100 rounded-lg shadow-lg py-1 hidden group-hover:block animate-fadeIn'>
                    <button
                      onClick={() => navigate('/orders')}
                      className='w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors'
                    >
                      My Orders
                    </button>
                    <button
                      onClick={logout}
                      className='w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link to='/cart' className='relative text-gray-500 hover:text-black transition-colors' aria-label='Cart'>
                <img src={assets.cart_icon} className='w-5 h-5' alt='Cart' />
                {getCartCount() > 0 && (
                  <span className='absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-black text-white text-[10px] font-medium rounded-full'>
                    {getCartCount()}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className='md:hidden text-gray-500 hover:text-black transition-colors'
                aria-label='Open menu'
              >
                <img src={assets.menu_icon} className='w-5 h-5' alt='Menu' />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div className='absolute inset-0 bg-black/40' onClick={() => setMobileOpen(false)} />

        {/* Drawer */}
        <div className={`absolute top-0 right-0 h-full w-72 bg-white shadow-xl flex flex-col transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='flex items-center justify-between px-5 py-4 border-b'>
            <img src={assets.logo} className='h-7 w-auto' alt='Forever Store' />
            <button onClick={() => setMobileOpen(false)} className='text-gray-400 hover:text-black transition-colors' aria-label='Close menu'>
              <img src={assets.cross_icon} className='w-4 h-4' alt='Close' />
            </button>
          </div>
          <nav className='flex flex-col px-5 py-4 gap-1'>
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-black'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          {token && (
            <div className='px-5 mt-auto pb-8 flex flex-col gap-2 border-t pt-4'>
              <button onClick={() => { navigate('/orders'); setMobileOpen(false) }} className='w-full text-left py-3 px-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors'>
                My Orders
              </button>
              <button onClick={() => { logout(); setMobileOpen(false) }} className='w-full text-left py-3 px-3 rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors'>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
