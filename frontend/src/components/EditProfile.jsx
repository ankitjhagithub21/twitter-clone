import React from 'react'
import { IoIosClose } from 'react-icons/io'
import { useSelector } from 'react-redux'

const EditProfile = ({ setShowEditProfile }) => {
  const { currUser } = useSelector(state => state.user)
  return (
    <div className='w-full h-full edit-box text-white fixed top-0 left-0 z-50 flex items-center justify-center'>
      <div className='lg:w-1/2 w-full bg-black mx-auto flex flex-col gap-3 rounded-lg p-2'>
        <div className=' flex items-center justify-between'>
          <div className='flex items-center gap-5'>
            <IoIosClose size={40} onClick={() => setShowEditProfile(false)} className='hover:bg-gray-600 rounded-full  cursor-pointer' />
            <h2 className='text-xl'>Edit Profile</h2>
          </div>
          <button className='px-4 py-2 bg-white rounded-full text-black'>Save</button>

        </div>
        <div className='flex flex-col gap-2'>
          <div className='w-32 h-32 bg-gray-200 mx-auto rounded-full border-4 border-gray-800'>
          <img src={currUser.profileImg} className='w-full h-full object-contain object-center' alt="" />
          </div>
          <div className='border rounded-lg flex flex-col  px-4 py-2'>
            <label htmlFor="fullName" className='text-sm text-gray-500'>Name</label>
            <input type="text" name='fullName' id='fullName' className='bg-transparent' value={currUser.fullName} />
          </div>
          <div className='border rounded-lg flex flex-col  px-4 py-2'>
            <label htmlFor="bio" className='text-sm text-gray-500'>Bio</label>
            <input type="text" name='bio' id='bio' className='bg-transparent foucs:bg-transparent' autoComplete='off' value={currUser.bio}/>
          </div>

        </div>
        <h2 className='font-bold text-2xl mt-10'>Switch To Professional</h2>
      </div>
    </div>
  )
}

export default EditProfile
