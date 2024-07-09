import React, { useEffect, useState } from 'react'
import User from './User'
import Loader from './Loader'

const WhoToFollow = () => {
    const [users, setUsers] = useState([])
    const profileImg = "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    const fetchUsers = async () => {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
            const data = await res.json()
            console.log(data)
            setUsers(data)

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchUsers()
    }, [])
    return (
        <div className='border rounded-xl p-3'>
            <h2 className='text-2xl font-bold'>Who to follow</h2>
            <div>
                {
                    users.length === 0 ? <Loader/> : users.map((user) => {
                        return <User key={user.id} name={user.name} username={user.username} profileImg={profileImg} />
                    })
                }
            </div>

        </div>
    )
}

export default WhoToFollow
