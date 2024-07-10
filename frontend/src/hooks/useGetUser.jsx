import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrUser } from '../redux/slices/userSlice'

const useGetUser = () => {
    const [loading,setLoading] =useState(true)
    const dispatch = useDispatch()
    useEffect(()=>{
        const getUserFromServer = async() =>{
            try{
                const res = await fetch("/api/auth/user",{
                    credentials:'include'
                })
                const data = await res.json()
                if(data.success){
                    dispatch(setCurrUser(data.user))
                }else{
                    dispatch(setCurrUser(null))
                }

            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        getUserFromServer()
    },[])
    return loading
}

export default useGetUser
