import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const STATUS_OPTIONS = ['Order Placed', 'Packing', 'Shipped', 'Out for delivery', 'Delivered']

const statusColors = {
  'Order Placed':     'bg-blue-50 text-blue-700 border-blue-200',
  'Packing':          'bg-yellow-50 text-yellow-700 border-yellow-200',
  'Shipped':          'bg-purple-50 text-purple-700 border-purple-200',
  'Out for delivery': 'bg-orange-50 text-orange-700 border-orange-200',
  'Delivered':        'bg-green-50 text-green-700 border-green-200',
}

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${statusColors[status] || 'bg-gray-50 text-gray-600 border-gray-200'}`}>
    <span className='w-1.5 h-1.5 rounded-full bg-current' />
    {status}
  </span>
)

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    if (!token) return
    try {
      setLoading(true)
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.orders.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/status',
        { orderId, status: event.target.value },
        { headers: { token } }
      )
      if (response.data.success) {
        toast.success('Status updated')
        await fetchAllOrders()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => { fetchAllOrders() }, [token])

  return (
    <div className='max-w-5xl'>

      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-xl font-semibold text-gray-900'>Orders</h1>
          <p className='text-sm text-gray-500 mt-1'>{orders.length} order{orders.length !== 1 ? 's' : ''} total</p>
        </div>
        <button
          onClick={fetchAllOrders}
          className='text-sm text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:border-gray-400 hover:text-black transition-colors flex items-center gap-2'
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
          </svg>
          Refresh
        </button>
      </div>

      {loading ? (
        <div className='flex flex-col gap-4'>
          {[1,2,3].map(i => (
            <div key={i} className='bg-white rounded-2xl border border-gray-100 p-5 animate-pulse flex gap-4'>
              <div className='w-10 h-10 rounded-xl bg-gray-100 flex-shrink-0' />
              <div className='flex-1 flex flex-col gap-2'>
                <div className='h-4 bg-gray-100 rounded w-1/2' />
                <div className='h-3 bg-gray-100 rounded w-1/3' />
                <div className='h-3 bg-gray-100 rounded w-1/4' />
              </div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className='bg-white rounded-2xl border border-gray-100 py-20 text-center'>
          <img src={assets.parcel_icon} className='w-12 h-12 mx-auto mb-3 opacity-30' alt='' />
          <p className='text-gray-500 text-sm'>No orders yet</p>
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          {orders.map((order, index) => (
            <div key={index} className='bg-white rounded-2xl border border-gray-100 p-5 hover:border-gray-200 transition-colors'>

              <div className='flex flex-col lg:flex-row lg:items-start gap-5'>

                {/* Parcel icon */}
                <div className='w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0'>
                  <img src={assets.parcel_icon} className='w-6 h-6' alt='' />
                </div>

                {/* Items + address */}
                <div className='flex-1 min-w-0'>
                  {/* Items */}
                  <div className='flex flex-wrap gap-1 mb-3'>
                    {order.items.map((item, i) => (
                      <span key={i} className='text-sm text-gray-700'>
                        {item.name} × {item.quantity}
                        {item.size && <span className='text-gray-400 text-xs ml-1'>({item.size})</span>}
                        {i < order.items.length - 1 && <span className='text-gray-300 ml-1'>,</span>}
                      </span>
                    ))}
                  </div>

                  {/* Customer */}
                  <p className='text-sm font-medium text-gray-900'>
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className='text-xs text-gray-400 mt-0.5'>
                    {order.address.street}, {order.address.city}, {order.address.state} {order.address.zipcode}, {order.address.country}
                  </p>
                  <p className='text-xs text-gray-400 mt-0.5'>{order.address.phone}</p>
                </div>

                {/* Meta */}
                <div className='flex flex-col gap-1.5 text-xs text-gray-500 flex-shrink-0 lg:text-right'>
                  <div className='flex lg:justify-end items-center gap-1.5'>
                    <span className='font-semibold text-gray-900 text-sm'>{currency}{order.amount.toLocaleString('en-IN')}</span>
                    <span className='text-gray-300'>·</span>
                    <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                  </div>
                  <span>{order.paymentMethod}</span>
                  <span className={order.payment ? 'text-green-600' : 'text-orange-500'}>
                    {order.payment ? 'Paid' : 'Pending payment'}
                  </span>
                  <span>{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>

              {/* Status row */}
              <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-gray-50'>
                <StatusBadge status={order.status} />
                <select
                  value={order.status}
                  onChange={e => statusHandler(e, order._id)}
                  className='border border-gray-200 rounded-xl text-sm px-3 py-2 bg-white text-gray-700 cursor-pointer focus:border-gray-400 sm:w-52'
                >
                  {STATUS_OPTIONS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
