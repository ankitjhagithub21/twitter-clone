import React from 'react'
import {Link, useParams} from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io";
const UserNotFound = () => {
    const {username} = useParams()
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
                <h2 className='ml-2 mt-2 font-bold text-xl'>@{username}</h2>
            </div>
           <div className='m-5'>
           <h1 className='text-2xl font-bold'>This account doesn’t exist</h1>
           <p>Try searching for another.</p>
           </div>
        </div>
    )
}

export default UserNotFound
