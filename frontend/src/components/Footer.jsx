import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Footer = () => {

  const navigate = useNavigate()

  return (
    <div>

      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        {/* BRAND / ABOUT */}
        <div>
          <img
            src={assets.logo}
            className='mb-5 w-32'
            alt="Forever"
          />

          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Forever is your destination for modern fashion and everyday
            essentials. Discover quality products designed to bring style,
            comfort and confidence to your wardrobe.
          </p>
        </div>


        {/* COMPANY */}
        <div>
          <p className='text-xl font-medium mb-5'>
            COMPANY
          </p>

          <ul className='flex flex-col gap-3 text-gray-600'>

            <li
              onClick={() => navigate('/')}
              className='cursor-pointer hover:text-black transition'
            >
              Home
            </li>

            <li
              onClick={() => navigate('/about')}
              className='cursor-pointer hover:text-black transition'
            >
              About Us
            </li>

            <li
              onClick={() => navigate('/collection')}
              className='cursor-pointer hover:text-black transition'
            >
              Collection
            </li>

            <li
              onClick={() => navigate('/contact')}
              className='cursor-pointer hover:text-black transition'
            >
              Contact Us
            </li>

          </ul>
        </div>


        {/* POLICIES */}
        <div>
          <p className='text-xl font-medium mb-5'>
            POLICIES
          </p>

          <div className='flex flex-col gap-3 text-gray-600'>

            <p
              onClick={() => navigate('/terms')}
              className='cursor-pointer hover:text-black transition'
            >
              Terms & Conditions
            </p>

            <p
              onClick={() => navigate('/privacy')}
              className='cursor-pointer hover:text-black transition'
            >
              Privacy Policy
            </p>

            <p
              onClick={() => navigate('/shipping')}
              className='cursor-pointer hover:text-black transition'
            >
              Shipping Policy
            </p>

            <p
              onClick={() => navigate('/refund')}
              className='cursor-pointer hover:text-black transition'
            >
              Cancellation & Refund
            </p>

            <p
              onClick={() => navigate('/contact')}
              className='cursor-pointer hover:text-black transition'
            >
              Contact Us
            </p>

          </div>
        </div>

      </div>


      {/* CONTACT INFORMATION */}

      <div className='border-t pt-8 pb-8'>

        <div className='flex flex-col sm:flex-row justify-between gap-6 text-sm'>

          <div>
            <p className='font-medium mb-2'>
              GET IN TOUCH
            </p>

            <div className='flex flex-col gap-1 text-gray-600'>
              <p>+91 XXXXX XXXXX</p>
              <p>support@yourdomain.com</p>
            </div>
          </div>


          <div>
            <p className='font-medium mb-2'>
              CUSTOMER SUPPORT
            </p>

            <p className='text-gray-600'>
              Monday – Saturday, 10:00 AM – 6:00 PM IST
            </p>
          </div>

        </div>

      </div>


      {/* COPYRIGHT */}

      <div>
        <hr />

        <p className='py-5 text-sm text-center text-gray-500'>
          Copyright © 2026 Forever. All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer