import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useGetProfileUser = (username) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const {currUser} = useSelector((state) => state.user); 

    useEffect(() => {
        const getUserFromServer = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/profile/${username}`);
                const data = await res.json();

                if (data.success) {
                    setUser(data.user);
                }

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            if (currUser?.username === username) {
                setUser(currUser);
                setLoading(false);
            } else {
                getUserFromServer();
            }
        }
    }, [username, currUser]);

    return { user, loading };
};

export default useGetProfileUser;
