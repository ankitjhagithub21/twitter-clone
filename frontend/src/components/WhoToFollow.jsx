import React, { useEffect, useState } from 'react'
import User from './User'
import Loader from './Loader'

const WhoToFollow = () => {
    const [users, setUsers] = useState([])
    const [loading,setLoading] = useState(false)
   
    const fetchUsers = async () => {
        try {
            setLoading(true)
           const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/suggested`,{
            credentials:'include'
           })
           const data = await res.json()
         
           if(data.success){
            setUsers(data.users)
           }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchUsers()
    }, [])
    
    return (
        <div className='border border-gray-700 rounded-xl p-3'>
            <h2 className='text-2xl font-bold'>Who to follow</h2>
            <div>
                {
                    loading ? <div className='my-5'>
                        <Loader/>
                    </div> : users.map((user) => {
                        return <User key={user._id} user={user}/>
                    })
                }
            </div>

        </div>
    )
}

export default WhoToFollow
