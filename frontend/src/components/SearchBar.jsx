import React from 'react'
import { CiSearch } from 'react-icons/ci'

const SearchBar = () => {
  return (
   <div className='sticky top-2 z-10 w-full'>
     <div className='flex items-center gap-3 bg-[#202327] text-white px-4 text-sm py-2 rounded-full'>
        <CiSearch size={20}/>
      <input type="text" placeholder='Search' className='bg-transparent' />
    </div>
   </div>
  )
}

export default SearchBar
