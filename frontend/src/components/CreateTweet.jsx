import React, { useState } from 'react'
import { CiImageOn, CiFaceSmile, CiLocationOn } from "react-icons/ci";
import toast from "react-hot-toast"

const CreateTweet = () => {
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handlePostTweet = async () => {
    if (loading) return;

    const formData = new FormData()
    formData.append('content', content)
    if (image) {
      formData.append('image', image)
    }

    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/tweet/create`, {
        method: "POST",
        credentials: 'include',
        body: formData
      })
      const data = await res.json()
      if (data.success) {
        setContent('')
        setImage(null)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Something went wrong.")
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex w-full items-start gap-2 p-2 border-b border-b-gray-700'>
      <img src="https://ankitjha.vercel.app/profile.png" alt="" className='w-10 rounded-full' />
      <div className='flex flex-col w-full'>
        <textarea placeholder='What is happening?!' value={content} className='h-20 py-2 w-full bg-transparent resize-none' onChange={(e) => setContent(e.target.value)}></textarea>
        <input type="file" id='image' name='image' onChange={handleImageChange} className='hidden' />
        {
          image && <div className='w-full h-56 mb-4 relative'>
            <button className='absolute bg-black text-white rounded-full px-3 py-1 right-1 top-1' onClick={() => setImage(null)}>X</button>
            <img src={URL.createObjectURL(image)} alt="thumbnail" className='h-full w-full object-cover rounded-lg mb-3' />
          </div>
        }
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2 text-xl text-[#1A8CD8]'>
            <label htmlFor="image" className='cursor-pointer rounded-full  p-1 '>
              <CiImageOn />
            </label>
            <CiFaceSmile className='cursor-pointer' />
            <CiLocationOn />
          </div>
          <button className='rounded-full px-2 py-1 text-white bg-[#1A8CD8] text-sm' onClick={handlePostTweet}>
            {
              loading ? 'Posting...' : 'Post'
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateTweet
