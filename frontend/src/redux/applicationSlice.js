import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        allApplicants : []
    },
    reducers: {
        setAllApplicants : (state,action) => {
            state.allApplicants = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase("RESET_APPLICATION_SLICE", () => initialState)
    }

})

export const {setAllApplicants} = applicationSlice.actions
export default applicationSlice.reducer