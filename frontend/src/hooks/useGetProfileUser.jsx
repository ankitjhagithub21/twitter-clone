import { useEffect, useState } from 'react'



const useGetProfileUser = ({username}) => {
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)
 
    useEffect(()=>{
        const getUserFromServer = async() =>{
            try{
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/${username}`)
                const data = await res.json()
                console.log(data)
                if(data.success){
                   setUser(data.user)
                }

            }catch(error){
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        getUserFromServer()
    },[])
    return {user,loading}
}

export default useGetProfileUser
