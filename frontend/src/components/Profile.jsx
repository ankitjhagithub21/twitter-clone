import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import useGetProfileUser from '../hooks/useGetProfileUser';
import Loader from './Loader';
import { IoIosArrowRoundBack } from "react-icons/io";
import UserNotFound from './UserNotFound';
import { SlCalender } from "react-icons/sl";
import formatDate from '../helpers/formateDate';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import Tweet from './Tweet';

const Profile = () => {
    const { username } = useParams();
    const loading = useGetProfileUser(username);
    const { currUser, profileUser } = useSelector(state => state.user);
    const { tweets } = useSelector(state => state.tweets);
    const userTweets = tweets?.filter((tweet) => tweet.author._id === profileUser?._id);
    const [showEditProfile, setShowEditProfile] = useState(false);

    if (loading) {
        return (
            <div className='p-5'>
                <Loader />
            </div>
        );
    }

    if (!profileUser) {
        return <UserNotFound />;
    }

    return (
        <>
            {showEditProfile && <EditProfile setShowEditProfile={setShowEditProfile} />}
            <div className='h-full overflow-auto'>
                <div className='p-2'>
                    <Link to={"/"} className='flex gap-5 items-center '>
                        <button className='p-2 hover:bg-gray-800 rounded-full'>
                            <IoIosArrowRoundBack size={25} />
                        </button>
                        <span className='text-xl font-semibold'>Profile</span>
                    </Link>
                </div>
                <div className='bg-[#333639] h-48 relative'>
                    {currUser._id === profileUser?._id && (
                        <button 
                            className='absolute bottom-2 right-3 z-10 border rounded-full px-4 py-2 hover:bg-gray-800' 
                            onClick={() => setShowEditProfile(true)}
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
                <div className='-mt-16 ml-5 relative'>
                    <div className='rounded-full w-32 h-32 bg-[#333639] border'>
                        <img 
                            src={profileUser.profileImg} 
                            alt="profile_img" 
                            className='w-full h-full rounded-full' 
                        />
                    </div>
                    <div className='ml-2 flex flex-col gap-2'>
                        <h2 className='mt-2 font-bold text-xl'>{profileUser.fullName}</h2>
                        <p className='text-gray-400'>@{profileUser.username}</p>
                        {profileUser.bio && <p>{profileUser.bio}</p>}
                        <div className='flex items-center gap-1 text-gray-400 text-sm'>
                            <SlCalender />
                            <span>Joined</span>
                            {formatDate(profileUser.joined)}
                        </div>
                        <div className='text-gray-400 text-sm flex items-center gap-1'>
                            <Link 
                                className="flex items-center gap-1 hover:underline" 
                                to={`/${profileUser.username}/following`}
                            >
                                <span>{profileUser.following.length}</span>
                                Following
                            </Link>
                            <Link className='flex items-center gap-1 hover:underline'   to={`/${profileUser.username}/followers`}>
                                <span>{profileUser.followers.length}</span>
                                Followers
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='mt-5 border-t border-gray-600'>
                    {userTweets?.map((tweet) => (
                        <Tweet key={tweet._id} tweet={tweet} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Profile;
