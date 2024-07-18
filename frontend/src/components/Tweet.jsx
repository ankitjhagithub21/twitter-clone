import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { CiHeart, CiRepeat, CiBookmark, CiTrash } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { likeUnlikeTweet, removeTweet } from '../redux/slices/tweetSlice';
import { useNavigate } from "react-router-dom";
import formatDate from '../helpers/formateDate';
import Loader from './Loader';

const Tweet = ({ tweet }) => {
    const dispatch = useDispatch();
    const { currUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const formattedDate = formatDate(tweet.createdAt);
    const [loading, setLoading] = useState(false)
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
                dispatch(removeTweet(tweet._id));
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Tweet not deleted.");
            console.error(error);
        }
    };

    const handleLikeUnlike = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/tweet/like/${tweet._id}`, {
                method: 'PUT',
                credentials: 'include',
            });
            const data = await res.json();

            if (data.success) {
                dispatch(likeUnlikeTweet({ tweetId: tweet._id, userId: currUser._id }));

            }
        } catch (error) {

            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className='flex gap-2 p-2 border-b border-gray-700'>
            <div className='min-w-8 h-8 cursor-pointer' onClick={() => navigate(`/${tweet.author.username}`)}>
                <img src={tweet.author.profileImg} alt="user" className='w-full h-full rounded-full' />
            </div>
            <div className='flex flex-col w-full'>
                <div className='flex items-center gap-1 flex-wrap'>
                    <span className='font-bold'>{tweet.author.fullName}</span>
                    <span className='text-sm text-gray-500'>@{tweet.author.username}</span>
                    <LuDot className='text-gray-500' />
                    <span className='text-xs text-gray-500'>{formattedDate}</span>
                </div>
                <p>{tweet.content}</p>
                {tweet.image && (
                    <div className='w-full'>
                        <img src={tweet.image.url} alt="thumbnail" className='rounded-lg object-contain h-56' />
                    </div>
                )}
                <div className='flex items-center justify-between text-lg mt-3'>
                    <div>
                        <FaRegComment size={22} />
                    </div>
                    <button className='flex items-center' onClick={handleLikeUnlike}>
                        {
                            loading ? <Loader /> : tweet.likes.length
                        }
                        <CiHeart size={25} />
                    </button>
                    <div>
                        <CiRepeat size={25} />
                    </div>
                    <div className='cursor-pointer'>
                        {currUser._id === tweet.author._id ? (
                            <CiTrash onClick={handleDelete} size={25} />
                        ) : (
                            <CiBookmark />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tweet;
