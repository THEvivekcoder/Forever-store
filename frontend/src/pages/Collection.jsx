import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const CATEGORIES = ['Men', 'Women', 'Kids']
const SUB_CATEGORIES = ['Topwear', 'Bottomwear', 'Winterwear']

const CheckboxRow = ({ label, value, checked, onChange }) => (
  <label className='flex items-center gap-2.5 cursor-pointer group'>
    <input
      type='checkbox'
      value={value}
      checked={checked}
      onChange={onChange}
      className='w-4 h-4 rounded border-gray-300 accent-black cursor-pointer'
    />
    <span className='text-sm text-gray-600 group-hover:text-black transition-colors'>{label}</span>
  </label>
)

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggle = (setter, value) =>
    setter(prev => prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value])

  const applyFilter = () => {
    let copy = products.slice()
    if (showSearch && search)
      copy = copy.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    if (category.length > 0)
      copy = copy.filter(i => category.includes(i.category))
    if (subCategory.length > 0)
      copy = copy.filter(i => subCategory.includes(i.subCategory))
    setFilterProducts(copy)
  }

  const sortProduct = () => {
    let copy = filterProducts.slice()
    if (sortType === 'low-high') copy.sort((a, b) => a.price - b.price)
    else if (sortType === 'high-low') copy.sort((a, b) => b.price - a.price)
    else { applyFilter(); return }
    setFilterProducts(copy)
  }

  useEffect(() => { applyFilter() }, [category, subCategory, search, showSearch, products])
  useEffect(() => { sortProduct() }, [sortType])

  const activeFilterCount = category.length + subCategory.length

  return (
    <div className='pt-10 border-t border-gray-100'>
      <div className='flex flex-col sm:flex-row gap-8'>

        {/* ── Filter sidebar ── */}
        <aside className='w-full sm:w-56 flex-shrink-0'>

          {/* Mobile toggle */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className='sm:hidden flex items-center justify-between w-full py-3 px-4 border border-gray-200 rounded-lg text-sm font-medium mb-4'
          >
            <span className='flex items-center gap-2'>
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4h18M7 12h10M11 20h2' />
              </svg>
              Filters
              {activeFilterCount > 0 && (
                <span className='bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>{activeFilterCount}</span>
              )}
            </span>
            <img className={`w-4 transition-transform ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt='' />
          </button>

          <div className={`flex flex-col gap-6 ${showFilter ? 'block' : 'hidden'} sm:block`}>

            {/* Active filters clear */}
            {activeFilterCount > 0 && (
              <button
                onClick={() => { setCategory([]); setSubCategory([]) }}
                className='text-xs text-gray-400 hover:text-black transition-colors underline text-left'
              >
                Clear all filters ({activeFilterCount})
              </button>
            )}

            {/* Category */}
            <div>
              <p className='text-xs font-semibold tracking-widest text-gray-900 uppercase mb-3'>Category</p>
              <div className='flex flex-col gap-2.5'>
                {CATEGORIES.map(c => (
                  <CheckboxRow
                    key={c}
                    label={c}
                    value={c}
                    checked={category.includes(c)}
                    onChange={() => toggle(setCategory, c)}
                  />
                ))}
              </div>
            </div>

            {/* Type */}
            <div>
              <p className='text-xs font-semibold tracking-widest text-gray-900 uppercase mb-3'>Type</p>
              <div className='flex flex-col gap-2.5'>
                {SUB_CATEGORIES.map(s => (
                  <CheckboxRow
                    key={s}
                    label={s}
                    value={s}
                    checked={subCategory.includes(s)}
                    onChange={() => toggle(setSubCategory, s)}
                  />
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* ── Product grid ── */}
        <div className='flex-1 min-w-0'>

          {/* Header row */}
          <div className='flex items-center justify-between mb-6'>
            <div>
              <Title text1='ALL' text2='COLLECTIONS' />
              <p className='text-xs text-gray-400 mt-1'>{filterProducts.length} products</p>
            </div>
            <select
              value={sortType}
              onChange={e => setSortType(e.target.value)}
              className='border border-gray-200 rounded-lg text-sm px-3 py-2 bg-white focus:outline-none focus:border-gray-400 cursor-pointer'
            >
              <option value='relevant'>Relevance</option>
              <option value='low-high'>Price: Low → High</option>
              <option value='high-low'>Price: High → Low</option>
            </select>
          </div>

          {filterProducts.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-24 text-center'>
              <svg className='w-14 h-14 text-gray-200 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4' />
              </svg>
              <p className='text-gray-500 font-medium'>No products found</p>
              <p className='text-gray-400 text-sm mt-1'>Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8'>
              {filterProducts.map(item => (
                <ProductItem key={item._id} name={item.name} id={item._id} price={item.price} image={item.image} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Collection
