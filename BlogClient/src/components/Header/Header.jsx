import React from 'react'

const Header = () => {
  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='px-4 mx-auto max-w-3xl text-center'>
      <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-500'>Welcome to 
        <span className='text-primary'>The Daily Scribble</span></h1>
        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>Space where ideas, stories, and creativity come together. Whether you're here to explore insightful articles, dive into how-tos, or simply enjoy fresh perspectives, you'll find content curated with care and curiosity.</p>
        </div>
    </div>
  )
}

export default Header
