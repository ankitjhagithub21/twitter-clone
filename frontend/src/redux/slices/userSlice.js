import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name:"user",
    initialState:{
        currUser:null,
    },
    reducers:{
        setCurrUser:(state,action)=>{
            state.currUser = action.payload
        }
    }
})

export const {setCurrUser} = userSlice.actions

export default userSlice.reducer

