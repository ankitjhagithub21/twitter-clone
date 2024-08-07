import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import { setTweets } from '../redux/slices/tweetSlice';
const useGetAllTweets = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const {tweets} = useSelector(state=>state.tweets)

    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/tweet/all`);
                const data = await res.json();

                if (data.success) {
                   
                    dispatch(setTweets(data.tweets))
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching tweets:', error);
            } finally {
                setLoading(false);
            }
        };

       if(!tweets){
        fetchTweets();
        
       }else{
        setLoading(false)
       }
    }, []);

    return { loading };
};

export default useGetAllTweets;
