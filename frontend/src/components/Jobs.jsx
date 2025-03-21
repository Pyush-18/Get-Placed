import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";


function Jobs() {
  const {jobs,searchQuery} = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(jobs)

  useEffect(() => {
    if(searchQuery){
      const filteredJobs = jobs?.filter((job) => {
        return job?.title?.toLowerCase().includes(searchQuery?.toLowerCase()) || job?.description?.toLowerCase().includes(searchQuery?.toLowerCase()) || job?.location?.toLowerCase().includes(searchQuery?.toLowerCase())
    })
    setFilterJobs(filteredJobs)
    }else{
      setFilterJobs(jobs)
    }
  },[searchQuery,jobs])
   return (
    <div>
      <Navbar />
      {/* filterPage */}
      <div className="max-w-7xl mx-auto mt-5 px-2">
        <div className="flex gap-5">
          <div className="lg:w-[20%] w-[40%]">
            <FilterCard />
          </div>
          {/* job post card */}
          {filterJobs?.length <= 0 ? (
            <span>No Job Available</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid lg:grid-cols-3 gap-4">
                {filterJobs?.map((job) => (
                  <motion.div
                  initial={{opacity: 0, x: 100}}
                  animate={{opacity:1, x: 0}}
                  exit={{opacity: 0, x: -100}}
                  transition={{duration: 0.5}}
                  key={job?._id}>
                    <Job job={job}/>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
