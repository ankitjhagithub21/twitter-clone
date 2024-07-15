import React from 'react';
import { Link, useParams } from "react-router-dom";
import useGetProfileUser from '../hooks/useGetProfileUser';
import Loader from './Loader';
import { IoIosArrowRoundBack } from "react-icons/io";
import UserNotFound from './UserNotFound';
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import formatDate from '../helpers/formateDate';

const Profile = () => {
    const { username } = useParams();
    const { user, loading } = useGetProfileUser(username);


    if (loading) {
        return <div className='p-5'>
            <Loader />
        </div>;
    }

    if (!user) {
        return <UserNotFound />
    }

    return (
        <div className='h-full overflow-auto'>
            <div className='p-2'>
                <Link to={"/"} className='flex gap-5 items-center '>
                    <IoIosArrowRoundBack size={25} />
                    <span className='text-xl font-semibold'>Profile</span>
                </Link>
            </div>
            <div className='bg-[#333639] h-48'></div>
            <div className='-mt-16 ml-5'>
                <div className='rounded-full w-32 h-32 bg-[#333639] border '>
                    <img src={user.profileImg} alt="" />
                </div>
                <div className='ml-2 flex flex-col gap-2'>
                    <h2 className='mt-2 font-bold text-xl'>{user.fullName}</h2>
                    <p className='text-gray-400'>@{user.username}</p>
                  {
                    user.bio &&  <p>{user.bio}</p>
                  }
                   
                      
                        <div className='flex items-center gap-1 text-gray-400 text-sm'>
                            <SlCalender />
                            <span>Joined</span>
                            {formatDate(user.joined)}
                        </div>
                        <div className='text-gray-400 text-sm flex items-center gap-1'>
                            <div className="flex items-center gap-1">
                                <span>{user.following.length}</span>
                                Following
                            </div>
                            <div className='flex items-center gap-1'>
                                <span>{user.followers.length}</span>
                                Followers
                            </div>
                        </div>
                   
                </div>

            </div>



        </div>
    );
};

export default Profile;
