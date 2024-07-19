import { useEffect, useState } from 'react';


const useGetUserFollowing = (username) => {
  const [users,setUsers] = useState([])
  

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/${username}/following`);
                const data = await res.json();

                if (data.success) {
                  
                  setUsers(data.users)
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching tweets:', error);
            } 
        };

       fetchUsers()
    }, []);

   return users
};

export default useGetUserFollowing;
