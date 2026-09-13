import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      let copy = products.filter(i => i.category === category && i.subCategory === subCategory)
      setRelated(copy.slice(0, 5))
    }
  }, [products, category, subCategory])

  if (related.length === 0) return null

  return (
    <section className='my-20 border-t border-gray-100 pt-14'>
      <div className='mb-8'>
        <Title text1='RELATED' text2='PRODUCTS' />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8'>
        {related.map(item => (
          <ProductItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts
