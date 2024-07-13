import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./slices/userSlice"
import tweetSlice from "./slices/tweetSlice"

export const store = configureStore({
    reducer:{
        user:userSlice,
        tweets:tweetSlice
    }
})

