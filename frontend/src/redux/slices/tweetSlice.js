import {createSlice} from "@reduxjs/toolkit"

export const tweetSlice = createSlice({
    name:"tweet",
    initialState:{
        tweets:[],
    },
    reducers:{
        setTweets:(state,action)=>{
            state.tweets = action.payload
        },
        addTweet:(state,action)=>{
            state.tweets = [action.payload,...state.tweets]
        },
        removeTweet:(state,action)=>{
            state.tweets = state.tweets.filter(tweet=>tweet._id != action.payload)
        }
    }
})

export const {setTweets,addTweet,removeTweet} = tweetSlice.actions

export default tweetSlice.reducer

