import { createSlice } from "@reduxjs/toolkit";

export const tweetSlice = createSlice({
    name: "tweet",
    initialState: {
        tweets: null,
    },
    reducers: {setTweets: (state, action) => {
            state.tweets = action.payload;
        },
        addTweet: (state, action) => {
            state.tweets = [action.payload, ...state.tweets];
        },
        removeTweet: (state, action) => {
            state.tweets = state.tweets.filter(tweet => tweet._id !== action.payload);
        },
        likeUnlikeTweet: (state, action) => {
            const { tweetId, userId } = action.payload;
            const tweet = state.tweets.find(tweet => tweet._id === tweetId);
            if (tweet) {
                const userIndex = tweet.likes.indexOf(userId);
                if (userIndex > -1) {
                   
                    tweet.likes.splice(userIndex, 1);
                } else {
                    
                    tweet.likes.push(userId);
                }
            }
        }
    }
});

export const { setTweets, addTweet, removeTweet, likeUnlikeTweet } = tweetSlice.actions;

export default tweetSlice.reducer;
