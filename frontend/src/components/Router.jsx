import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from '../pages/Home'
import Profile from './Profile'
import Layout from './Layout'
import FollowingUsers from './FollowingUsers'
import Followers from './Followers'


const Router = () => {
    
    const router = createBrowserRouter([
        {
            path:"/",
            element:<Layout/>,
            children:[
                {
                    path:"/",
                    element:<Home/>
                },
                {
                    path:"/:username",
                    element:<Profile/>
                },
                {
                    path:"/:username/following",
                    element:<FollowingUsers/>
                },
                {
                    path:"/:username/followers",
                    element:<Followers/>
                }
            ]
        }
       
    ])
  return (
   <RouterProvider router={router}/>
  )
}

export default Router
