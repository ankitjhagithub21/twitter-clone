import React from 'react'
import { Link } from 'react-router-dom'
import {CiHome,CiSearch,CiMail,CiUser,CiCirclePlus} from "react-icons/ci"

import { IoIosNotificationsOutline } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { PiDotsThreeCircle } from "react-icons/pi";
import { TbGraph } from "react-icons/tb";

const Left = () => {
  const links = [
    {
        path:"/",
        name:"Home",
        icon:<CiHome/>     
    },
    {
        path:"/",
        name:"Explore",
        icon:<CiSearch/>     
    },
    {
        path:"/",
        name:"Notifications",
        icon:<IoIosNotificationsOutline/>     
    },
    {
        path:"/",
        name:"Messages",
        icon:<CiMail/>     
    },
    {
        path:"/",
        name:"Grok",
        icon:<TbGraph/>     
    },
    {
        path:"/",
        name:"Communities",
        icon:<GoPeople size={25}/>     
    },
    {
        path:"/profile",
        name:"profile",
        icon:<CiUser/>     
    },
    {
        path:"/",
        name:"More",
        icon:<PiDotsThreeCircle/>     
    },
]

  return (
    <div className='lg:w-[20%] w-fit flex flex-col gap-2 lg:items-start items-center justify-between px-1 py-5'>
       <div>
        <img src="/logo.avif" alt="logo" className='rounded-full w-10 ml-1' />
       </div>
     <div className='flex flex-col'>
     {
      links.map((link,idx)=>{
        return   <Link key={idx} to={link.path} className='flex items-center gap-3 transition hover:bg-[#181818] lg:py-2 p-2 lg:pl-2 lg:pr-4  rounded-full '>

           <div className='text-3xl'>
           {link.icon}
           </div>
            <span className='text-xl lg:block hidden'>{link.name}</span>
        </Link>
      })
     }

     <button className='bg-[#1D9BF0] text-white p-2 lg:w-full w-fit mx-auto  lg:rounded-full rounded-xl mt-2 text-center'>
     <CiCirclePlus className='lg:hidden block mx-auto'/>
        <span className='lg:block hidden'>Post</span>
     </button>
     </div>
    
    <div className='flex items-center justify-between'>
     <div className='flex items-center  gap-2'>
     <img src="https://ankitjha.vercel.app/profile.png" alt="user" className='w-10 rounded-full'/>
     <div className='text-xs lg:flex flex-col hidden '>
        <span className='font-bold'>Ankit Jha</span>
        <span className='text-gray-500'>@itsankitjha22</span>
     </div>
     </div>
    </div>


    </div>
  )
}

export default Left
