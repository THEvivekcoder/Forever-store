import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link
      to={`/product/${id}`}
      onClick={() => scrollTo(0, 0)}
      className='group block text-gray-800'
    >
      {/* Image wrapper — fixed aspect ratio */}
      <div className='relative overflow-hidden bg-gray-50 aspect-[3/4] rounded-lg'>
        <img
          src={image[0]}
          alt={name}
          className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out'
        />
        {/* second image on hover if available */}
        {image[1] && (
          <img
            src={image[1]}
            alt={name}
            className='absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out'
          />
        )}
      </div>

      {/* Info */}
      <div className='mt-3 px-0.5'>
        <p className='text-sm text-gray-800 font-medium line-clamp-2 leading-snug group-hover:text-black transition-colors'>
          {name}
        </p>
        <p className='mt-1 text-sm font-semibold text-gray-900'>
          {currency}{price.toLocaleString('en-IN')}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem
