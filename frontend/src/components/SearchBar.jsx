import React from 'react'
import { CiSearch } from 'react-icons/ci'

const SearchBar = () => {
  return (
   
     <div className='flex items-center gap-3 bg-[#202327] text-white px-4 text-md py-2 rounded-full'>
        <CiSearch size={20}/>
      <input type="text" placeholder='Search' className='bg-transparent' />
    </div>
  
  )
}

export default SearchBar
