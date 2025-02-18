import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

function Browse() {
  useGetAllJobs()
  const {jobs} = useSelector(store => store.job)
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""))
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">Search Results ({jobs?.length || 0})</h1>
        <div className="grid grid-cols-3 gap-4">
          {jobs?.map((job) => (
            <div key={job?._id}>
              <Job job={job}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Browse;
