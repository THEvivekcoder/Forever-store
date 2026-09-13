import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='flex flex-col sm:flex-row min-h-[480px] sm:min-h-[520px] overflow-hidden rounded-xl bg-[#f8f6f3]'>

      {/* Left — text */}
      <div className='w-full sm:w-1/2 flex items-center justify-center px-10 py-16 sm:py-0'>
        <div className='max-w-sm'>
          <p className='text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mb-4'>
            New Season Arrivals
          </p>
          <h1 className='prata-regular text-4xl sm:text-5xl leading-tight text-gray-900 mb-5'>
            Dress for the <br />life you want.
          </h1>
          <p className='text-gray-500 text-sm leading-relaxed mb-8'>
            Curated fashion for men, women &amp; kids. Quality pieces
            built to last — delivered to your door.
          </p>
          <Link
            to='/collection'
            onClick={() => scrollTo(0, 0)}
            className='inline-flex items-center gap-3 bg-black text-white text-sm font-medium px-7 py-3.5 rounded-full hover:bg-gray-800 transition-colors duration-200'
          >
            Shop Now
            <span className='text-base leading-none'>→</span>
          </Link>
        </div>
      </div>

      {/* Right — image */}
      <div className='w-full sm:w-1/2 overflow-hidden'>
        <img
          src={assets.hero_img}
          alt='Latest collection'
          className='w-full h-full object-cover object-top'
        />
      </div>

    </section>
  )
}

export default Hero
