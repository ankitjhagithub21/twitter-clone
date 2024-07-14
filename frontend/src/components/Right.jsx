import React from 'react'
import WhoToFollow from './WhoToFollow'
import Premium from './Premium'
import SearchBar from './SearchBar'

const Right = () => {
  return (
    <div className='lg:w-[30%]  w-full hidden   overflow-auto md:flex flex-col gap-5 p-3'>
      <SearchBar/>
      <Premium/>
      <WhoToFollow/>
    </div>
  )
}

export default Right
