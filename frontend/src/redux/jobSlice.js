import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        jobs: [],
        singleJob : null,
        adminJobs : [],
        searchJob : "",
        appliedJobs: [],
        searchQuery: ""
    },
    reducers: {
        setJobs : (state,action) => {
            state.jobs = action.payload
        },
        setAdminJobs : (state,action) => {
            state.adminJobs = action.payload
        },
        setSingleJob : (state,action) => {
            state.singleJob = action.payload
        },
        setSearchJob : (state,action) => {
            state.searchJob = action.payload
        },
        setAppliedJobs : (state,action) => {
            state.appliedJobs = action.payload
        },
        setSearchQuery : (state,action) => {
            state.searchQuery = action.payload
        },
    }
})

export const {setJobs,setSingleJob, setAdminJobs,setSearchJob,setAppliedJobs,setSearchQuery} = jobSlice.actions
export default jobSlice.reducer