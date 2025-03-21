import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState:{
        themeMode: "dark",
        toggleTheme: false
    },
    reducers: {
        setThemeMode: (state, action) => {
            if(action.payload){
                state.themeMode = "dark"
            }else{
                state.themeMode = "light"
            }
        },
        setToggleTheme: (state,action) => {
            state.toggleTheme = action.payload
        }
    }
})

export const {setThemeMode, setToggleTheme} = themeSlice.actions

export default themeSlice.reducer