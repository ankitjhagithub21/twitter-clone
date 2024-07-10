import React from 'react'
import CenterNav from '../components/CenterNav'
import Tweet from '../components/Tweet'
import CreateTweet from '../components/CreateTweet'
import useGetUser from '../hooks/useGetUser'


const Home = () => {
  
  const tweet = {
    profileImg:"https://ankitjha.vercel.app/profile.png",
      name:"Gautam Gambhi",
      username:"@gautam gambhir",
      content:"India is my identity and serving my country has been the greatest privilege of my life. I’m honoured to be back, albeit wearing a different hat. But my goal is the same as it has always been, to make every Indian proud. The men in blue shoulder the dreams of 1.4 billion Indians",
      image:"https://pbs.twimg.com/media/GSDasGHaYAAKRe7?format=jpg&name=small",

  }
  return (
    <>

      <CenterNav/>
      <CreateTweet/>
      <Tweet tweet={tweet}/>
      <Tweet tweet={tweet}/>
    </>
  )
}

export default Home
