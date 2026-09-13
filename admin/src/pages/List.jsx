import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)

  const fetchList = async () => {
    try {
      setLoading(true)
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setList(response.data.products.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setDeleteId(null)
        await fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => { fetchList() }, [])

  return (
    <div className='max-w-5xl'>

      <div className='flex items-center justify-between mb-6'>
        <div>
          <h1 className='text-xl font-semibold text-gray-900'>Products</h1>
          <p className='text-sm text-gray-500 mt-1'>{list.length} product{list.length !== 1 ? 's' : ''} in store</p>
        </div>
        <button
          onClick={fetchList}
          className='text-sm text-gray-500 border border-gray-200 rounded-lg px-4 py-2 hover:border-gray-400 hover:text-black transition-colors flex items-center gap-2'
        >
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' />
          </svg>
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className='bg-white rounded-2xl border border-gray-100 overflow-hidden'>

        {/* Header */}
        <div className='hidden md:grid grid-cols-[80px_1fr_120px_100px_80px] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100'>
          <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Image</span>
          <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Product</span>
          <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Category</span>
          <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Price</span>
          <span className='text-xs font-semibold text-gray-500 uppercase tracking-wider text-center'>Action</span>
        </div>

        {loading ? (
          <div className='flex flex-col divide-y divide-gray-50'>
            {[1,2,3,4].map(i => (
              <div key={i} className='flex items-center gap-4 px-5 py-4 animate-pulse'>
                <div className='w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0' />
                <div className='flex-1 flex flex-col gap-2'>
                  <div className='h-4 bg-gray-100 rounded w-1/2' />
                  <div className='h-3 bg-gray-100 rounded w-1/4' />
                </div>
              </div>
            ))}
          </div>
        ) : list.length === 0 ? (
          <div className='py-16 text-center'>
            <svg className='w-12 h-12 text-gray-200 mx-auto mb-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
            </svg>
            <p className='text-gray-500 text-sm'>No products yet</p>
          </div>
        ) : (
          <div className='flex flex-col divide-y divide-gray-50'>
            {list.map((item) => (
              <div key={item._id} className='grid grid-cols-[64px_1fr_auto] md:grid-cols-[80px_1fr_120px_100px_80px] items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors'>

                {/* Image */}
                <div className='w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0'>
                  <img src={item.image[0]} alt={item.name} className='w-full h-full object-cover' />
                </div>

                {/* Name + sub */}
                <div className='min-w-0'>
                  <p className='text-sm font-medium text-gray-900 truncate'>{item.name}</p>
                  <p className='text-xs text-gray-400 mt-0.5 md:hidden'>{item.category} · {currency}{item.price}</p>
                  <p className='text-xs text-gray-400 mt-0.5 hidden md:block'>{item.subCategory}</p>
                </div>

                {/* Category */}
                <p className='hidden md:block text-sm text-gray-600'>{item.category}</p>

                {/* Price */}
                <p className='hidden md:block text-sm font-medium text-gray-900'>{currency}{item.price.toLocaleString('en-IN')}</p>

                {/* Delete */}
                <div className='flex justify-center'>
                  {deleteId === item._id ? (
                    <div className='flex items-center gap-2'>
                      <button
                        onClick={() => removeProduct(item._id)}
                        className='text-xs text-white bg-red-500 hover:bg-red-600 px-2.5 py-1 rounded-lg transition-colors'
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeleteId(null)}
                        className='text-xs text-gray-500 hover:text-black px-2 py-1 transition-colors'
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteId(item._id)}
                      className='text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50'
                      aria-label='Delete product'
                    >
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                      </svg>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default List
