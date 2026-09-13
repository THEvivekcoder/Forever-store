import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 10))
  }, [products])

  return (
    <section className='py-16'>
      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10'>
        <div>
          <Title text1='LATEST' text2='COLLECTIONS' />
          <p className='text-sm text-gray-500 mt-2 max-w-md'>
            Fresh styles added every week. Be the first to explore our newest arrivals.
          </p>
        </div>
      </div>

      {latestProducts.length === 0 ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8'>
          {[...Array(10)].map((_, i) => (
            <div key={i} className='animate-pulse'>
              <div className='bg-gray-100 rounded-lg aspect-[3/4]' />
              <div className='mt-3 h-4 bg-gray-100 rounded w-3/4' />
              <div className='mt-2 h-4 bg-gray-100 rounded w-1/3' />
            </div>
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8'>
          {latestProducts.map((item) => (
            <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))}
        </div>
      )}
    </section>
  )
}

export default LatestCollection
