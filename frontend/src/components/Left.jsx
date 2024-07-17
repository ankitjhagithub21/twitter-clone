import React from 'react'
import { Link } from 'react-router-dom'
import { CiHome, CiSearch, CiMail, CiUser, CiCirclePlus, CiLogout } from "react-icons/ci"
import { IoIosNotificationsOutline } from "react-icons/io";
import { GoPeople } from "react-icons/go";
import { TbGraph } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { setCurrUser } from "../redux/slices/userSlice"
import TwitterIcon from './TwitterIcon';
const Left = () => {
  const { currUser } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const links = [
    {
      path: "/",
      name: "Home",
      icon: <CiHome />
    },
    {
      path: "/",
      name: "Explore",
      icon: <CiSearch />
    },
    {
      path: "/",
      name: "Notifications",
      icon: <IoIosNotificationsOutline />
    },
    {
      path: "/",
      name: "Messages",
      icon: <CiMail />
    },
    {
      path: "/",
      name: "Grok",
      icon: <TbGraph />
    },
    {
      path: "/",
      name: "Communities",
      icon: <GoPeople size={25} />
    },
    {
      path: `/${currUser.username}`,
      name: "profile",
      icon: <CiUser />
    },

  ]
  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
        credentials: 'include'
      })
      const data = await res.json()
      if (data.success) {

        toast.success(data.message)
        dispatch(setCurrUser(null))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='lg:w-[20%] w-fit flex flex-col gap-2 lg:items-start items-center  border-r border-gray-700 justify-between px-1 py-5'>
       <TwitterIcon w={30} h={30}/>
      <div className='flex flex-col'>
        {
          links.map((link, idx) => {
            return <Link key={idx} to={link.path} className='flex items-center gap-3 transition hover:bg-[#181818] lg:py-2 p-2 lg:pl-2 lg:pr-4  rounded-full '>

              <div className='text-3xl'>
                {link.icon}
              </div>
              <span className='text-xl lg:block hidden'>{link.name}</span>
            </Link>
          })

        }
        <button className='flex items-center gap-3 transition hover:bg-[#181818] lg:py-2 p-2 lg:pl-2 lg:pr-4  rounded-full ' onClick={handleLogout}>

          <CiLogout size={25} />
          <span className='text-xl lg:block hidden'>Logout</span>
        </button>

        <button className='bg-[#1D9BF0] text-white p-2 lg:w-full w-fit mx-auto  lg:rounded-full rounded-xl mt-2 text-center'>
          <CiCirclePlus className='lg:hidden block mx-auto' />
          <span className='lg:block hidden'>Post</span>
        </button>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex items-center  gap-2'>
          <img src={currUser.profileImg} alt="user" className='w-10 rounded-full' />
          <div className='text-xs lg:flex flex-col hidden '>
            <span className='font-bold'>{currUser.fullName}</span>
            <span className='text-gray-500'>@{currUser.username}</span>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Left
