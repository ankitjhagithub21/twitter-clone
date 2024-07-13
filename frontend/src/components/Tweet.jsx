import React from 'react'
import toast from 'react-hot-toast';
import { CiHeart, CiRepeat, CiBookmark, CiTrash } from "react-icons/ci"
import { FaRegComment } from "react-icons/fa6";
import { LuDot } from "react-icons/lu"
import { useDispatch, useSelector } from 'react-redux';
import { removeTweet } from '../redux/slices/tweetSlice';


const Tweet = ({ tweet }) => {
    const dispatch = useDispatch()
    const { currUser } = useSelector(state => state.user)

    const handleDelete = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/tweet/${tweet._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',

                },
                credentials: 'include'
            });
            const data = await res.json();

            if (data.success) {
                dispatch(removeTweet(tweet._id))
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error("Tweet not deleted.")
            console.log(error)
        }
    };

    return (
        <div className='flex gap-2 p-2 border-b border-gray-700'>
            <div className='min-w-8 h-8'>
                <img src={tweet.author.profileImg} alt="user" className='w-full h-full rounded-full' />
            </div>
            <div className='flex flex-col  w-full'>
                <div className='flex items-center gap-1 flex-wrap'>
                    <span className=' font-bold'>{tweet.author.fullName}</span>
                    <span className='text-sm text-gray-500'>@{tweet.author.username}</span>
                    <LuDot className='text-gray-500' />
                    <span className='text-xs text-gray-500'>{tweet.createdAt.slice(0, 10)}</span>
                </div>
                <p>{tweet.content}</p>
                {
                    tweet.image && <div className='w-full'>
                        <img src={tweet.image.url} alt="thumbnail" className='rounded-lg object-contain h-56' />
                    </div>
                }
                <div className='flex items-center justify-between text-lg mt-2'>
                    <div>
                        <FaRegComment />
                    </div>
                    <div>
                        <CiHeart />
                    </div>
                    <div>
                        <CiRepeat />
                    </div>

                    <div className='cursor-pointer'>
                        {
                            currUser._id == tweet.author._id ? <CiTrash onClick={handleDelete} /> : <CiBookmark />
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Tweet
