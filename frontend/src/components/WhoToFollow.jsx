import React, { useEffect, useState } from 'react'
import User from './User'
import Loader from './Loader'

const WhoToFollow = () => {
    const [users, setUsers] = useState([])
    const profileImg = "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    const fetchUsers = async () => {
        try {
           const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/whotofollow`,{
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
                    users.length === 0 ? <div className='my-5'>
                        <Loader/>
                    </div> : users.map((user) => {
                        return <User key={user.id} name={user.name} username={user.username} profileImg={profileImg} />
                    })
                }
            </div>

        </div>
    )
}

export default WhoToFollow
