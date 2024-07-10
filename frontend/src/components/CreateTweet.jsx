import React, { useState } from 'react'
import { CiImageOn,CiFaceSmile,CiLocationOn } from "react-icons/ci";


const CreateTweet = () => {
    const [content,setContent] = useState('')

  return (
    <div className='flex w-full items-start gap-2 p-2'>
      <img src="https://ankitjha.vercel.app/profile.png" alt="" className='w-10 rounded-full' />
      <div className='flex flex-col w-full'>
        <textarea  placeholder='What is happening?!' value={content} className='h-20 py-2 w-full bg-transparent resize-none' onChange={(e)=>setContent(e.target.value)}></textarea>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2 text-xl text-[#1A8CD8]'>
          <CiImageOn/>
            <CiFaceSmile/>
            <CiLocationOn/>
          </div>
            <button className='rounded-full px-2 py-1 text-white bg-[#1A8CD8] text-sm'>Post</button>
        </div>
        
      </div>
    </div>
  )
}

export default CreateTweet
