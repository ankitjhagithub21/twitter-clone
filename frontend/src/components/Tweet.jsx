import React from 'react'
import { CiHeart, CiRepeat, CiBookmark } from "react-icons/ci"
import { FaRegComment } from "react-icons/fa6";
import { LuDot } from "react-icons/lu"
const Tweet = ({ tweet }) => {
    const { name, username, profileImg, content, date, image } = tweet
    return (
        <div className='flex gap-1 p-2 border-b border-gray-700'>
            <div className='min-w-10 h-10'>
                <img src={profileImg} alt="user" className='w-full h-full rounded-full' />
            </div>
            <div className='flex flex-col'>
                <div className='flex items-center gap-1'>
                    <span className='text-sm font-bold'>{name}</span>
                    <span className='text-sm text-gray-500'>{username}</span>
                    <LuDot className='text-gray-500'/>
                    <span className='text-xs text-gray-500'>2h</span>
                </div>
                <p className='text-xs'>{content}</p>
                <div className='my-2'>
                    <img src={image} alt="thumbnail" className='rounded-lg' />
                </div>
                <div className='flex items-center justify-between'>
                    <div>
                        <FaRegComment/>
                    </div>
                    <div>
                        <CiHeart />
                    </div>
                    <div>
                        <CiRepeat />
                    </div>
                   
                    <div>
                        <CiBookmark />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Tweet
