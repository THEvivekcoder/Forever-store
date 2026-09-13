import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const statusColors = {
  'Order Placed':     'bg-blue-50 text-blue-700',
  'Packing':          'bg-yellow-50 text-yellow-700',
  'Shipped':          'bg-purple-50 text-purple-700',
  'Out for delivery': 'bg-orange-50 text-orange-700',
  'Delivered':        'bg-green-50 text-green-700',
}

const StatusBadge = ({ status }) => (
  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>
    <span className='w-1.5 h-1.5 rounded-full bg-current' />
    {status}
  </span>
)

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(true)

  const loadOrderData = async () => {
    try {
      if (!token) return
      setLoading(true)
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token } })
      if (response.data.success) {
        const allItems = []
        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            allItems.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            })
          })
        })
        setOrderData(allItems.reverse())
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadOrderData() }, [token])

  return (
    <div className='border-t border-gray-100 pt-12 pb-20'>
      <div className='mb-8'>
        <Title text1='MY' text2='ORDERS' />
      </div>

      {loading ? (
        <div className='flex flex-col gap-4'>
          {[1,2,3].map(i => (
            <div key={i} className='animate-pulse flex gap-5 p-5 border border-gray-100 rounded-xl'>
              <div className='w-20 h-24 bg-gray-100 rounded-lg flex-shrink-0' />
              <div className='flex-1 flex flex-col gap-3 pt-1'>
                <div className='h-4 bg-gray-100 rounded w-1/2' />
                <div className='h-4 bg-gray-100 rounded w-1/4' />
                <div className='h-4 bg-gray-100 rounded w-1/3' />
              </div>
            </div>
          ))}
        </div>
      ) : orderData.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-24 text-center'>
          <svg className='w-14 h-14 text-gray-200 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
          </svg>
          <p className='text-gray-500 font-medium'>No orders yet</p>
          <p className='text-gray-400 text-sm mt-1'>Your order history will appear here.</p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {orderData.map((item, index) => (
            <div key={index} className='flex flex-col sm:flex-row sm:items-center gap-5 p-5 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors'>

              {/* Image */}
              <div className='w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-50'>
                <img src={item.image[0]} alt={item.name} className='w-full h-full object-cover' />
              </div>

              {/* Info */}
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-gray-900 truncate'>{item.name}</p>
                <div className='flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500'>
                  <span>{currency}{item.price.toLocaleString('en-IN')}</span>
                  <span className='w-1 h-1 rounded-full bg-gray-300' />
                  <span>Qty: {item.quantity}</span>
                  <span className='w-1 h-1 rounded-full bg-gray-300' />
                  <span>Size: {item.size}</span>
                </div>
                <div className='flex flex-wrap gap-3 mt-2 text-xs text-gray-400'>
                  <span>{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span>·</span>
                  <span>{item.paymentMethod}</span>
                  <span>·</span>
                  <span className={item.payment ? 'text-green-600' : 'text-orange-500'}>
                    {item.payment ? 'Paid' : 'Payment Pending'}
                  </span>
                </div>
              </div>

              {/* Status + track */}
              <div className='flex sm:flex-col items-center sm:items-end gap-3 flex-shrink-0'>
                <StatusBadge status={item.status} />
                <button
                  onClick={loadOrderData}
                  className='text-xs text-gray-500 border border-gray-200 rounded-full px-4 py-1.5 hover:border-gray-400 hover:text-black transition-colors'
                >
                  Track Order
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
