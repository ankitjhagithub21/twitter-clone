import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom"
import useGetProfileUser from '../hooks/useGetProfileUser'
import Loader from './Loader'
import { IoIosArrowRoundBack } from "react-icons/io";
const Profile = () => {
  const { username } = useParams()
  const { user, loading } = useGetProfileUser(username)
  
  if (loading) {
    return <Loader />
  }

  return (
    <div className='h-full overflow-auto'>
      <div className='p-2'>

        <Link to={"/"} className='flex gap-5 items-center '>
          <IoIosArrowRoundBack size={25}/>
          <span className='text-xl font-semibold'>Profile</span>
        </Link>

      </div>
      <div className='bg-[#333639] h-48' ></div>
      <div className='-mt-16 ml-5'>
      <div className='rounded-full w-32 h-32 bg-[#333639] border '></div>
      <h2 className='ml-2 mt-2 font-bold text-xl'> @{username}</h2>
      </div>
    
        <h1 className='text-3xl font-bold'>This account doesn’t exist</h1>
        <p>Try searching for another.</p>
      
    </div>
  )
}

export default Profile
