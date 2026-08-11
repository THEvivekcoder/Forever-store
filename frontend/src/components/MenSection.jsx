import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { filterProductsBySection } from '../utils/sectionUtils'
import Title from './Title'
import ProductItem from './ProductItem'

const MenSection = () => {
  const { products } = useContext(ShopContext)
  const [menProducts, setMenProducts] = useState([])

  useEffect(() => {
    setMenProducts(filterProductsBySection(products, 'men'))
  }, [products])

  if (menProducts.length === 0) return null

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={"MEN'S"} text2={'COLLECTION'} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {menProducts.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))}
      </div>
    </div>
  )
}

export default MenSection
