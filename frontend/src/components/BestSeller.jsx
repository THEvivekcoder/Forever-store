import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller)
    setBestSeller(bestProduct.slice(0, 5))
  }, [products])

  if (bestSeller.length === 0) return null

  return (
    <section className='py-16 border-t border-gray-100'>
      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10'>
        <div>
          <Title text1='BEST' text2='SELLERS' />
          <p className='text-sm text-gray-500 mt-2 max-w-md'>
            Our most-loved pieces — trusted by thousands of happy customers.
          </p>
        </div>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8'>
        {bestSeller.map((item) => (
          <ProductItem key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} />
        ))}
      </div>
    </section>
  )
}

export default BestSeller
