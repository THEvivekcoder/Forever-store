import React, { useState } from 'react'

const NewsletterBox = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmitHandler = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className='py-16 border-t border-gray-100'>
      <div className='max-w-xl mx-auto text-center'>
        <p className='text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mb-3'>
          Newsletter
        </p>
        <h2 className='text-2xl sm:text-3xl font-medium text-gray-900 mb-3'>
          Get 20% off your first order
        </h2>
        <p className='text-gray-500 text-sm mb-8'>
          Subscribe to our newsletter for exclusive deals, style updates and new arrivals.
        </p>

        {submitted ? (
          <div className='bg-gray-50 border border-gray-200 rounded-xl py-5 px-6'>
            <p className='text-sm font-medium text-gray-800'>You're subscribed — check your inbox!</p>
          </div>
        ) : (
          <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row gap-3'>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='flex-1 border border-gray-200 rounded-full px-5 py-3 text-sm outline-none focus:border-gray-400 transition-colors'
              type='email'
              placeholder='Enter your email address'
              required
            />
            <button
              type='submit'
              className='bg-black text-white text-sm font-medium px-7 py-3 rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap'
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default NewsletterBox
