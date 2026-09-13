import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const found = products.find(item => item._id === productId)
    if (found) {
      setProductData(found)
      setImage(found.image[0])
      setSize('')
    }
  }, [productId, products])

  if (!productData) {
    return (
      <div className='pt-10 border-t border-gray-100 animate-pulse'>
        <div className='flex gap-10 flex-col sm:flex-row'>
          <div className='flex-1 bg-gray-100 rounded-xl aspect-square' />
          <div className='flex-1 flex flex-col gap-4 pt-4'>
            <div className='h-7 bg-gray-100 rounded w-2/3' />
            <div className='h-5 bg-gray-100 rounded w-1/4' />
            <div className='h-24 bg-gray-100 rounded' />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='pt-10 border-t border-gray-100'>

      {/* Main layout */}
      <div className='flex flex-col sm:flex-row gap-8 lg:gap-14'>

        {/* ── Image gallery ── */}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
          {/* Thumbnails */}
          <div className='flex sm:flex-col gap-2 overflow-x-auto sm:overflow-y-auto sm:max-h-[520px]'>
            {productData.image.map((img, i) => (
              <button
                key={i}
                onClick={() => setImage(img)}
                className={`flex-shrink-0 w-16 sm:w-full rounded-lg overflow-hidden border-2 transition-colors ${
                  image === img ? 'border-black' : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img src={img} alt={`View ${i + 1}`} className='w-full aspect-square object-cover' />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className='flex-1 rounded-xl overflow-hidden bg-gray-50'>
            <img
              key={image}
              src={image}
              alt={productData.name}
              className='w-full h-full object-cover object-top animate-fadeIn'
            />
          </div>
        </div>

        {/* ── Product info ── */}
        <div className='flex-1 flex flex-col gap-5'>

          <div>
            <p className='text-xs font-semibold tracking-widest text-gray-400 uppercase mb-2'>
              {productData.category} · {productData.subCategory}
            </p>
            <h1 className='text-2xl sm:text-3xl font-medium text-gray-900 leading-snug'>
              {productData.name}
            </h1>
          </div>

          {/* Stars */}
          <div className='flex items-center gap-1'>
            {[1,2,3,4].map(i => (
              <img key={i} src={assets.star_icon} className='w-4 h-4' alt='' />
            ))}
            <img src={assets.star_dull_icon} className='w-4 h-4' alt='' />
            <span className='text-sm text-gray-400 ml-1'>(122 reviews)</span>
          </div>

          {/* Price */}
          <p className='text-3xl font-semibold text-gray-900'>
            {currency}{productData.price.toLocaleString('en-IN')}
          </p>

          {/* Description */}
          <p className='text-sm text-gray-500 leading-relaxed border-t border-gray-100 pt-4'>
            {productData.description}
          </p>

          {/* Size selector */}
          {productData.sizes?.length > 0 && (
            <div>
              <div className='flex items-center justify-between mb-3'>
                <p className='text-sm font-medium text-gray-900'>Select Size</p>
                {!size && <p className='text-xs text-gray-400'>Please choose a size</p>}
              </div>
              <div className='flex flex-wrap gap-2'>
                {productData.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 text-sm border rounded-lg font-medium transition-colors ${
                      size === s
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className={`w-full sm:w-auto px-10 py-3.5 text-sm font-medium rounded-full transition-colors ${
              size
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {size ? 'Add to Cart' : 'Select a Size'}
          </button>

          {/* Assurance */}
          <div className='border-t border-gray-100 pt-4 flex flex-col gap-2'>
            {['100% Original product', 'Cash on delivery available', 'Easy return within 7 days'].map(text => (
              <div key={text} className='flex items-center gap-2 text-xs text-gray-500'>
                <span className='w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0' />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Description / Reviews tabs ── */}
      <div className='mt-16'>
        <div className='flex border-b border-gray-200'>
          {['description', 'reviews'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-[2px] ${
                activeTab === tab
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}
            >
              {tab === 'reviews' ? 'Reviews (122)' : 'Description'}
            </button>
          ))}
        </div>
        <div className='py-6 px-1 text-sm text-gray-600 leading-relaxed max-w-2xl'>
          {activeTab === 'description' ? (
            <p>{productData.description || 'No description available for this product.'}</p>
          ) : (
            <p className='text-gray-400 italic'>Customer reviews coming soon.</p>
          )}
        </div>
      </div>

      {/* Related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  )
}

export default Product
