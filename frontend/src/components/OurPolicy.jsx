import React from 'react'
import { assets } from '../assets/assets'

const policies = [
  {
    icon: assets.exchange_icon,
    title: 'Easy Exchange',
    desc: 'Hassle-free exchange on all eligible orders within 7 days.',
  },
  {
    icon: assets.quality_icon,
    title: '7-Day Returns',
    desc: 'Not satisfied? Return it within 7 days for a full refund.',
  },
  {
    icon: assets.support_img,
    title: '24/7 Support',
    desc: 'Our team is available around the clock to help you.',
  },
]

const OurPolicy = () => {
  return (
    <section className='py-16 border-t border-gray-100'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
        {policies.map(({ icon, title, desc }) => (
          <div
            key={title}
            className='flex flex-col items-center text-center gap-4 p-8 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors'
          >
            <div className='w-12 h-12 flex items-center justify-center'>
              <img src={icon} className='w-10 h-10 object-contain' alt={title} />
            </div>
            <div>
              <p className='font-semibold text-gray-900 text-sm'>{title}</p>
              <p className='text-gray-500 text-sm mt-1 leading-relaxed'>{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy
