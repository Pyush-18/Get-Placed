import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        authUser: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        },
    }
})

export const {setAuthUser, setLoading} = authSlice.actions

export default authSlice.reducer