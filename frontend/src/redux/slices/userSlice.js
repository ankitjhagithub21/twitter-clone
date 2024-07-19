import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name:"user",
    initialState:{
        currUser:null,
        profileUser:null,
    },
    reducers:{
        setCurrUser:(state,action)=>{
            state.currUser = action.payload
        },
        setProfileUser:(state,action)=>{
            state.profileUser=action.payload
        }
    }
})

export const {setCurrUser,setProfileUser} = userSlice.actions

export default userSlice.reducer

