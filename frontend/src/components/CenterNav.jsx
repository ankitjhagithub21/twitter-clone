import React from 'react'

const CenterNav = () => {
  return (
    <div className='border-b border-b-gray-700 flex h-14 overflow-auto sticky top-0 z-10 backdrop-filter-lg bg-black'>
      <div className='w-1/2 flex items-center justify-center cursor-pointer hover:bg-[#181818]'>For you</div>
      <div className='w-1/2 flex items-center justify-center cursor-pointer hover:bg-[#181818]'>Following</div>
    </div>
  )
}

export default CenterNav
