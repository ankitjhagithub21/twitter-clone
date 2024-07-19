import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrUser, setProfileUser } from '../redux/slices/userSlice';

const useGetProfileUser = (username) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const {currUser} = useSelector((state) => state.user); 

    useEffect(() => {
        const getUserFromServer = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/profile/${username}`);
                const data = await res.json();

                if (data.success) {
                    dispatch(setProfileUser(data.user));
                }

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            if (currUser?.username === username) {
                dispatch(setProfileUser(currUser));
                setLoading(false);
            } else {
                getUserFromServer();
            }
        }
    }, [username, currUser]);

    return loading;
};

export default useGetProfileUser;
