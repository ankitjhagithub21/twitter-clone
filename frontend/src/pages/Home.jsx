import React from 'react';
import CenterNav from '../components/CenterNav';
import Tweet from '../components/Tweet';
import CreateTweet from '../components/CreateTweet';
import useGetAllTweets from '../hooks/useGetAllTweets';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';

const Home = () => {
    const { loading } = useGetAllTweets();
    const {tweets} = useSelector(state=>state.tweets)
    return (
        <>
            <CenterNav />
            <CreateTweet />
            <div>
                {loading ? (
                    <Loader/>
                ) : (
                  tweets.map((tweet)=>{
                    return <Tweet key={tweet._id} tweet={tweet}/>
                  })
                )}
            </div>
        </>
    );
};

export default Home;
