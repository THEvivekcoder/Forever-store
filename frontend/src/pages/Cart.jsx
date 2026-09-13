import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const temp = []
      for (const id in cartItems) {
        for (const size in cartItems[id]) {
          if (cartItems[id][size] > 0) {
            temp.push({ _id: id, size, quantity: cartItems[id][size] })
          }
        }
      }
      setCartData(temp)
    }
  }, [cartItems, products])

  if (cartData.length === 0) {
    return (
      <div className='border-t border-gray-100 pt-20 pb-32 flex flex-col items-center text-center'>
        <svg className='w-16 h-16 text-gray-200 mb-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9' />
        </svg>
        <h2 className='text-xl font-medium text-gray-900 mb-2'>Your cart is empty</h2>
        <p className='text-gray-400 text-sm mb-8'>Looks like you haven't added anything yet.</p>
        <button
          onClick={() => navigate('/collection')}
          className='bg-black text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors'
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className='border-t border-gray-100 pt-12 pb-20'>
      <div className='mb-8'>
        <Title text1='YOUR' text2='CART' />
        <p className='text-sm text-gray-400 mt-1'>{cartData.length} item{cartData.length !== 1 ? 's' : ''}</p>
      </div>

      <div className='flex flex-col lg:flex-row gap-10'>

        {/* Items */}
        <div className='flex-1'>
          <div className='flex flex-col divide-y divide-gray-100'>
            {cartData.map((item, index) => {
              const product = products.find(p => p._id === item._id)
              if (!product) return null
              return (
                <div key={index} className='flex items-start gap-5 py-5'>
                  {/* Image */}
                  <div className='w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50'>
                    <img src={product.image[0]} alt={product.name} className='w-full h-full object-cover' />
                  </div>

                  {/* Info */}
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-900 truncate'>{product.name}</p>
                    <div className='flex items-center gap-3 mt-1'>
                      <span className='text-sm font-semibold text-gray-900'>
                        {currency}{product.price.toLocaleString('en-IN')}
                      </span>
                      <span className='text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded'>
                        {item.size}
                      </span>
                    </div>

                    {/* Quantity + remove */}
                    <div className='flex items-center gap-4 mt-3'>
                      <div className='flex items-center border border-gray-200 rounded-lg overflow-hidden'>
                        <button
                          onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                          className='w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40'
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className='w-8 text-center text-sm font-medium text-gray-900'>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className='w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors'
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className='text-gray-400 hover:text-red-500 transition-colors'
                        aria-label='Remove item'
                      >
                        <img src={assets.bin_icon} className='w-4 h-4' alt='Remove' />
                      </button>
                    </div>
                  </div>

                  {/* Line total */}
                  <p className='text-sm font-semibold text-gray-900 flex-shrink-0'>
                    {currency}{(product.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary */}
        <div className='w-full lg:w-80 flex-shrink-0'>
          <CartTotal />
          <button
            onClick={() => navigate('/place-order')}
            className='w-full mt-4 bg-black text-white text-sm font-medium py-4 rounded-full hover:bg-gray-800 transition-colors'
          >
            Proceed to Checkout
          </button>
          <button
            onClick={() => navigate('/collection')}
            className='w-full mt-3 text-sm text-gray-500 hover:text-black transition-colors py-2'
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
