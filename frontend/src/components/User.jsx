import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast"
import { useSelector } from 'react-redux';

const User = ({user}) => {
    const { _id, fullName, username, profileImg } = user;  
    const {currUser} = useSelector(state=>state.user)
    const navigate = useNavigate();
    const [isFollowing, setIsFollowing] = useState(currUser.following.includes(user._id));  
      console.log(isFollowing)
    const handleFollowUnfollow = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/follow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials:'include',
                body: JSON.stringify({ userIdToFollowUnfollow: _id })
            });

            const data = await response.json();
            if (data.success) {
                setIsFollowing(!isFollowing);  
                toast.success(data.message)
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='flex justify-between items-center my-3'>
            <div className='flex items-center gap-2'>
                <img 
                    src={profileImg ? profileImg :'https://cdn-icons-png.flaticon.com/512/149/149071.png'} 
                    alt="user" 
                    className='w-10 rounded-full cursor-pointer' 
                    onClick={() => navigate(`/${username}`)}
                />
                <div className='flex flex-col items-start text-sm'>
                    <span className='font-bold'>{fullName}</span>
                    <span className='text-gray-400'>@{username}</span>
                </div>
            </div>
          {
            currUser._id !== _id &&   <button 
            className={`px-4 py-1 rounded-full text-sm font-semibold ${isFollowing ? 'border hover:bg-white hover:text-black  text-white ' : 'bg-white text-gray-800 hover:bg-gray-200'}`} 
            onClick={handleFollowUnfollow}
        >
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
          }
        </div>
    );
};

export default User;
