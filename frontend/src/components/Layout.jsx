import React from 'react'
import Left from './Left'
import Right from './Right'
import { Outlet } from 'react-router-dom'
const Layout = () => {
    return (
        <div className='lg:w-[90%] w-full mx-auto flex h-[100vh] relative'>

            <Left />
            <div className='lg:w-[50%] w-full border-r lg:border-l '>
            <Outlet />
            </div>
            <Right />

        </div>
    )
}

export default Layout
