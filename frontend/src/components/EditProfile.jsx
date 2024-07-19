import React, { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import toast from "react-hot-toast"
import { setCurrUser } from '../redux/slices/userSlice'

const EditProfile = ({ setShowEditProfile }) => {
  const { currUser } = useSelector(state => state.user)
  const [fullName, setFullName] = useState(currUser.fullName)
  const [bio, setBio] = useState(currUser.bio)
  const [image, setImage] = useState(currUser.profileImg)
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)

  const handleUpdateProfile = async () => {
    if(loading){
      return
    }
    const formData = new FormData()

    formData.append('fullName',fullName)
    formData.append('bio',bio)
    formData.append('image',image)
    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/update`, {
        method: "PUT",
        credentials: 'include',
        body: formData
      })
      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        dispatch(setCurrUser(data.updatedUser))
        
        setShowEditProfile(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("An error occurred while updating the profile")
      console.error(error)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='w-full h-full p-5 edit-box text-white fixed top-0 left-0 z-50 flex items-center justify-center'>
      <div className='lg:w-1/2 w-full bg-black mx-auto flex flex-col gap-3 rounded-lg p-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-5'>
            <IoIosClose size={40} onClick={() => setShowEditProfile(false)} className='hover:bg-gray-600 rounded-full cursor-pointer' />
            <h2 className='text-xl'>Edit Profile</h2>
          </div>
          <button className='px-4 py-2 bg-white rounded-full text-black' onClick={handleUpdateProfile}>
            {
              loading ? 'Saving..' :'Save'
            }
          </button>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='w-32 h-32 bg-gray-200 mx-auto rounded-full border-4 border-gray-800'>
            <label htmlFor="image">
              <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} className='w-full h-full object-cover rounded-full object-center cursor-pointer' alt="" />
            </label>
            <input type="file" id='image' accept="image/png, image/jpeg" className='hidden' name='image' onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className='border rounded-lg flex flex-col px-4 py-2'>
            <label htmlFor="fullName" className='text-sm text-gray-500'>Name</label>
            <input type="text" name='fullName' id='fullName' className='bg-transparent' value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className='border rounded-lg flex flex-col px-4 py-2'>
            <label htmlFor="bio" className='text-sm text-gray-500'>Bio</label>
            <input type="text" name='bio' id='bio' className='bg-transparent' autoComplete='off' value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
        </div>
        <h2 className='font-bold text-2xl mt-10'>Switch To Professional</h2>
      </div>
    </div>
  )
}

export default EditProfile
