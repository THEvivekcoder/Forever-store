import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const toggleSection = (arr, key) =>
  arr.includes(key) ? arr.filter(s => s !== key) : [...arr, key]

const SizeBtn = ({ label, selected, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
      selected
        ? 'bg-gray-900 text-white border-gray-900'
        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
    }`}
  >
    {label}
  </button>
)

const ImageUpload = ({ id, image, onChange }) => (
  <label htmlFor={id} className='cursor-pointer'>
    <div className={`w-24 h-24 rounded-xl overflow-hidden flex items-center justify-center border-2 border-dashed transition-colors ${image ? 'border-transparent' : 'border-gray-200 hover:border-gray-400 bg-gray-50'}`}>
      {image ? (
        <img src={URL.createObjectURL(image)} alt='Preview' className='w-full h-full object-cover' />
      ) : (
        <div className='flex flex-col items-center gap-1 text-gray-400'>
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M12 4v16m8-8H4' />
          </svg>
          <span className='text-xs'>Photo</span>
        </div>
      )}
    </div>
    <input onChange={e => onChange(e.target.files[0])} type='file' id={id} accept='image/*' hidden />
  </label>
)

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [image4, setImage4] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [homeSection, setHomeSection] = useState([])
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('subCategory', subCategory)
      formData.append('bestseller', bestseller)
      formData.append('sizes', JSON.stringify(sizes))
      formData.append('homeSection', JSON.stringify(homeSection))
      if (image1) formData.append('image1', image1)
      if (image2) formData.append('image2', image2)
      if (image3) formData.append('image3', image3)
      if (image4) formData.append('image4', image4)

      const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setName(''); setDescription(''); setPrice('')
        setImage1(null); setImage2(null); setImage3(null); setImage4(null)
        setSizes([]); setHomeSection([])
        setBestseller(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-3xl'>
      <div className='mb-6'>
        <h1 className='text-xl font-semibold text-gray-900'>Add Product</h1>
        <p className='text-sm text-gray-500 mt-1'>Fill in the details to add a new product to the store.</p>
      </div>

      <form onSubmit={onSubmitHandler} className='flex flex-col gap-6'>

        {/* Images */}
        <div className='bg-white rounded-2xl border border-gray-100 p-6'>
          <h2 className='text-sm font-semibold text-gray-900 mb-1'>Product Images</h2>
          <p className='text-xs text-gray-400 mb-4'>Upload up to 4 product images. First image will be the cover.</p>
          <div className='flex flex-wrap gap-3'>
            <ImageUpload id='image1' image={image1} onChange={setImage1} />
            <ImageUpload id='image2' image={image2} onChange={setImage2} />
            <ImageUpload id='image3' image={image3} onChange={setImage3} />
            <ImageUpload id='image4' image={image4} onChange={setImage4} />
          </div>
        </div>

        {/* Basic info */}
        <div className='bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4'>
          <h2 className='text-sm font-semibold text-gray-900'>Product Information</h2>

          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-gray-600'>Product Name <span className='text-red-400'>*</span></label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder-gray-400'
              placeholder='e.g. Classic Cotton T-Shirt'
              required
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-gray-600'>Description <span className='text-red-400'>*</span></label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder-gray-400 resize-none'
              placeholder='Describe the product — material, fit, features…'
              required
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-gray-600'>Price (₹) <span className='text-red-400'>*</span></label>
            <input
              value={price}
              onChange={e => setPrice(e.target.value)}
              className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm placeholder-gray-400 w-40'
              type='number'
              min='0'
              placeholder='499'
              required
            />
          </div>
        </div>

        {/* Category */}
        <div className='bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4'>
          <h2 className='text-sm font-semibold text-gray-900'>Category</h2>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-gray-600'>Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white'
              >
                <option value='Men'>Men</option>
                <option value='Women'>Women</option>
                <option value='Kids'>Kids</option>
              </select>
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-xs font-medium text-gray-600'>Sub-Category</label>
              <select
                value={subCategory}
                onChange={e => setSubCategory(e.target.value)}
                className='border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white'
              >
                <option value='Topwear'>Topwear</option>
                <option value='Bottomwear'>Bottomwear</option>
                <option value='Winterwear'>Winterwear</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className='bg-white rounded-2xl border border-gray-100 p-6'>
          <h2 className='text-sm font-semibold text-gray-900 mb-1'>Available Sizes</h2>
          <p className='text-xs text-gray-400 mb-4'>Select all sizes this product is available in.</p>
          <div className='flex flex-wrap gap-2'>
            {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
              <SizeBtn
                key={s}
                label={s}
                selected={sizes.includes(s)}
                onClick={() => setSizes(prev => prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s])}
              />
            ))}
          </div>
        </div>

        {/* Options */}
        <div className='bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4'>
          <h2 className='text-sm font-semibold text-gray-900'>Options</h2>

          <label className='flex items-center gap-3 cursor-pointer'>
            <input
              type='checkbox'
              checked={bestseller}
              onChange={() => setBestseller(p => !p)}
              className='w-4 h-4 rounded accent-black'
            />
            <div>
              <p className='text-sm font-medium text-gray-800'>Mark as Bestseller</p>
              <p className='text-xs text-gray-400'>Show in the bestsellers section on homepage.</p>
            </div>
          </label>

          <div>
            <p className='text-xs font-medium text-gray-600 mb-3'>Homepage Sections</p>
            <div className='flex flex-col gap-2'>
              {['men', 'women', 'essentials'].map(section => (
                <label key={section} className='flex items-center gap-3 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={homeSection.includes(section)}
                    onChange={() => setHomeSection(prev => toggleSection(prev, section))}
                    className='w-4 h-4 rounded accent-black'
                  />
                  <span className='text-sm text-gray-700 capitalize'>{section}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={loading}
          className='self-start bg-gray-900 text-white text-sm font-medium px-10 py-3 rounded-xl hover:bg-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2'
        >
          {loading && (
            <svg className='w-4 h-4 animate-spin' fill='none' viewBox='0 0 24 24'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8z' />
            </svg>
          )}
          {loading ? 'Adding Product…' : 'Add Product'}
        </button>

      </form>
    </div>
  )
}

export default Add
