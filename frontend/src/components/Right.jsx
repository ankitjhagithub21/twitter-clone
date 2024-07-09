import React from 'react'
import WhoToFollow from './WhoToFollow'
import Premium from './Premium'

const Right = () => {
  return (
    <div className='lg:w-[30%] w-full md:block hidden p-3 overflow-auto lg:flex flex-col gap-5'>
      <Premium/>
      <WhoToFollow/>
    </div>
  )
}

export default Right
