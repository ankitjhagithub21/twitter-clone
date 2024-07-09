import React from 'react'

const User = (props) => {
    const {name,username,profileImg} = props
  return (
    <div className='flex justify-between items-center my-3'>
        <div className='flex items-center gap-2'>
            <img src={profileImg} alt="user" className='w-10 rounded-full' />
            <div className='flex flex-col items-start text-sm'>
                <span className='font-bold'>{name}</span>
                <span className='text-gray-600'>@{username}</span>
            </div>
        </div>
        <button className='px-4 bg-white text-gray-800 py-1 rounded-full text-sm font-semibold hover:bg-gray-200'>Follow</button>
      
    </div>
  )
}

export default User
