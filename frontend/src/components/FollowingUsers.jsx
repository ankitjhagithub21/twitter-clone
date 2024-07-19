import React from 'react'
import useGetUserFollowing from '../hooks/useGetUserFollowing'
import User from './User'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";

const FollowingUsers = () => {
    const {profileUser} = useSelector(state=>state.user)
    const users = useGetUserFollowing(profileUser?.username)
    if(!profileUser){
        return <Navigate to={"/"}/>
    }
  return (
   <div>
    <div className='flex items-center justify-start gap-5 p-2'>
      <Link className='rounded-full hover:bg-gray-600 cursor-pointer' to={"/"}>
        <IoIosArrowRoundBack size={25}/>
      </Link>
      <div className='flex flex-col'>
        <span className='font-bold'>{profileUser.fullName}</span>
        <span className='text-xs text-gray-400'>@{profileUser.username}</span>
      </div>
    </div>
      <div className='p-5'>
      
      {
        users.length === 0 ? <div>

          <h2 className='text-3xl font-bold mb-3'>Be in the know</h2>
          <p>Following accounts  is an easy way to curate your timeline and know what’s happening with the topics and people you’re interested in.</p>
          <button className='py-2 px-4 bg-[#1A8CD8] rounded-full mt-3'>Find People to follow</button>
        </div> : <>
         {
        users.map((user)=>{
            return <User key={user._id} user={user}/>
        })
      }
        </>
      }
    </div>
   </div>
  )
}

export default FollowingUsers
