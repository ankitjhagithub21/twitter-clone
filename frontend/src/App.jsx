import React from 'react'
import "./App.css"
import Router from './components/Router'
import { useSelector } from 'react-redux'
import Register from './pages/Register'
import {Toaster} from "react-hot-toast"
import useGetUser from './hooks/useGetUser'
import PageLoading from './components/PageLoading'
const App = () => {
  const loading = useGetUser()
  const {currUser} = useSelector(state=>state.user)
  if(loading){
    return <PageLoading/>
  }
  return (
    <>
    <Toaster/>
    {
      currUser ? <Router/> : <Register/>
    }
    </>
  )
}

export default App
