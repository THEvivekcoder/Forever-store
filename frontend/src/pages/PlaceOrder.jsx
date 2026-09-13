import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const InputField = ({ label, ...props }) => (
  <div className='flex flex-col gap-1.5'>
    <label className='text-xs font-medium text-gray-600'>{label}</label>
    <input
      {...props}
      className='border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors'
    />
  </div>
)

const PlaceOrder = () => {
  const [method] = useState('cod')
  const [loading, setLoading] = useState(false)

  const {
    navigate, backendUrl, token,
    cartItems, setCartItems,
    getCartAmount, delivery_fee, products
  } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '',
    zipcode: '', country: '', phone: ''
  })

  const onChange = (e) =>
    setFormData(d => ({ ...d, [e.target.name]: e.target.value }))

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let orderItems = []
      for (const id in cartItems) {
        for (const size in cartItems[id]) {
          if (cartItems[id][size] > 0) {
            const info = structuredClone(products.find(p => p._id === id))
            if (info) {
              info.size = size
              info.quantity = cartItems[id][size]
              orderItems.push(info)
            }
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error('Your cart is empty')
        setLoading(false)
        return
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })

      if (response.data.success) {
        toast.success('Order placed successfully!')
        setCartItems({})
        navigate('/orders')
      } else {
        toast.error(response.data.message || 'Unable to place order')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='pt-10 border-t border-gray-100 pb-20'>

      <div className='flex flex-col lg:flex-row gap-12'>

        {/* ── Delivery info ── */}
        <div className='flex-1'>
          <div className='mb-8'>
            <Title text1='DELIVERY' text2='INFORMATION' />
          </div>

          <div className='flex flex-col gap-4'>
            <div className='grid grid-cols-2 gap-4'>
              <InputField label='First Name' name='firstName' value={formData.firstName} onChange={onChange} placeholder='John' required />
              <InputField label='Last Name' name='lastName' value={formData.lastName} onChange={onChange} placeholder='Doe' required />
            </div>
            <InputField label='Email Address' name='email' value={formData.email} onChange={onChange} type='email' placeholder='john@example.com' required />
            <InputField label='Street Address' name='street' value={formData.street} onChange={onChange} placeholder='123 Main Street' required />
            <div className='grid grid-cols-2 gap-4'>
              <InputField label='City' name='city' value={formData.city} onChange={onChange} placeholder='Mumbai' required />
              <InputField label='State' name='state' value={formData.state} onChange={onChange} placeholder='Maharashtra' />
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <InputField label='Pincode' name='zipcode' value={formData.zipcode} onChange={onChange} inputMode='numeric' placeholder='400001' required />
              <InputField label='Country' name='country' value={formData.country} onChange={onChange} placeholder='India' required />
            </div>
            <InputField label='Phone Number' name='phone' value={formData.phone} onChange={onChange} type='tel' inputMode='numeric' placeholder='+91 98765 43210' required />
          </div>
        </div>

        {/* ── Order summary + payment ── */}
        <div className='w-full lg:w-96 flex-shrink-0 flex flex-col gap-6'>

          <CartTotal />

          {/* Payment method */}
          <div>
            <p className='text-xs font-semibold tracking-widest text-gray-900 uppercase mb-4'>Payment Method</p>

            <div className='border border-yellow-200 bg-yellow-50 rounded-xl p-4 mb-4'>
              <p className='text-sm font-medium text-yellow-800'>Online payments temporarily unavailable</p>
              <p className='text-xs text-yellow-700 mt-1'>We're currently accepting Cash on Delivery only.</p>
            </div>

            <div className='flex items-center gap-3 border border-gray-200 rounded-xl p-4'>
              <div className='w-3.5 h-3.5 rounded-full bg-black flex-shrink-0' />
              <p className='text-sm font-medium text-gray-800'>Cash on Delivery</p>
              <span className='ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium'>Selected</span>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-black text-white text-sm font-medium py-4 rounded-full hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'
          >
            {loading && (
              <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
              </svg>
            )}
            {loading ? 'Placing Order…' : 'Place Order'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
