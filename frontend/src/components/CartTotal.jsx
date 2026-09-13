import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)
  const subtotal = getCartAmount()
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee

  return (
    <div className='bg-gray-50 rounded-xl p-6'>
      <h3 className='text-sm font-semibold tracking-widest text-gray-900 uppercase mb-5'>Order Summary</h3>
      <div className='flex flex-col gap-3 text-sm'>
        <div className='flex justify-between text-gray-600'>
          <span>Subtotal</span>
          <span>{currency}{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div className='flex justify-between text-gray-600'>
          <span>Shipping</span>
          <span className='text-green-600'>{subtotal === 0 ? '—' : `${currency}${delivery_fee}`}</span>
        </div>
        <div className='border-t border-gray-200 mt-1 pt-3 flex justify-between font-semibold text-gray-900 text-base'>
          <span>Total</span>
          <span>{currency}{total.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
