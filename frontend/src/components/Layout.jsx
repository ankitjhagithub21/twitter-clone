import React from 'react'
import Left from './Left'
import Right from './Right'
import { Outlet } from 'react-router-dom'
const Layout = () => {
    return (
        <div className='lg:w-[90%] w-full mx-auto flex h-[100vh] relative'>

            <Left />
            <div className='lg:w-[50%] w-full lg:border-r overflow-y-auto border-gray-700 '>
            <Outlet />
            </div>
            <Right />

        </div>
    )
}

export default Layout
