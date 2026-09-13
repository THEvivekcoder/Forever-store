import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='border-t border-gray-100 mt-16 bg-white'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>

          {/* Brand */}
          <div className='lg:col-span-1'>
            <Link to='/'>
              <img src={assets.logo} className='h-8 w-auto mb-4' alt='Forever Store' />
            </Link>
            <p className='text-sm text-gray-500 leading-relaxed'>
              Your destination for modern fashion and everyday essentials. Quality products, delivered to your door.
            </p>
          </div>

          {/* Shop */}
          <div>
            <p className='text-xs font-semibold tracking-widest text-gray-900 uppercase mb-5'>Shop</p>
            <ul className='flex flex-col gap-3'>
              {[
                { to: '/collection', label: 'All Products' },
                { to: '/collection', label: 'Men' },
                { to: '/collection', label: 'Women' },
                { to: '/collection', label: 'Kids' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} onClick={() => scrollTo(0, 0)} className='text-sm text-gray-500 hover:text-black transition-colors'>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className='text-xs font-semibold tracking-widest text-gray-900 uppercase mb-5'>Company</p>
            <ul className='flex flex-col gap-3'>
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} onClick={() => scrollTo(0, 0)} className='text-sm text-gray-500 hover:text-black transition-colors'>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className='text-xs font-semibold tracking-widest text-gray-900 uppercase mb-5'>Support</p>
            <ul className='flex flex-col gap-3'>
              {[
                { to: '/terms', label: 'Terms & Conditions' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/shipping', label: 'Shipping Policy' },
                { to: '/refund', label: 'Returns & Refunds' },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} onClick={() => scrollTo(0, 0)} className='text-sm text-gray-500 hover:text-black transition-colors'>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className='mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-xs text-gray-400'>© 2026 Forever Store. All rights reserved.</p>
          <div className='flex gap-5 text-xs text-gray-400'>
            <span>support@foreverstore.in</span>
            <span>+91 8825156176</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
