import React from 'react'

/**
 * Section title used across the site.
 * text1 — lighter grey word
 * text2 — bold dark word
 * center — centres the block (default false)
 */
const Title = ({ text1, text2, center = false }) => {
  return (
    <div className={`flex flex-col gap-2 mb-2 ${center ? 'items-center text-center' : 'items-start'}`}>
      <h2 className='text-2xl sm:text-3xl font-medium tracking-tight text-gray-900'>
        <span className='text-gray-400 font-normal'>{text1} </span>
        {text2}
      </h2>
      <span className={`h-[2px] bg-gray-900 rounded-full ${center ? 'w-12' : 'w-10'}`} />
    </div>
  )
}

export default Title
