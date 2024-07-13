import React from 'react';
import { Link, useParams } from "react-router-dom";
import useGetProfileUser from '../hooks/useGetProfileUser';
import Loader from './Loader';
import { IoIosArrowRoundBack } from "react-icons/io";
import UserNotFound from './UserNotFound';

const Profile = () => {
    const { username } = useParams();
    const { user, loading } = useGetProfileUser(username);
   

    if (loading) {
        return <div className='p-5'>
            <Loader />
        </div>;
    }

    if (!user) {
        return <UserNotFound/>
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
                <div className='rounded-full w-32 h-32 bg-[#333639] border '></div>
                <h2 className='ml-2 mt-2 font-bold text-xl'>@{user.username}</h2>
            </div>
            <h1 className='text-3xl font-bold'>{user.name}</h1>
            
            <p>{user.bio}</p>
        </div>
    );
};

export default Profile;
