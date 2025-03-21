import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";

function LatestJobs() {
  const {jobs} = useSelector(store => store.job)
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl lg:text-5xl font-bold uppercase">
        Job{" "}
        <span className="bg-gradient-to-r from-purple-500 to-yellow-500 text-transparent bg-clip-text">
          Openings
        </span>
      </h1>
      {/* multiple job card display here */}
      <div className="grid lg:grid-cols-3 gap-4 my-5">
        {jobs?.length <= 0 ? <span>No job available</span> :  jobs?.slice(0,6).map((job) => (
          <LatestJobCard key={job?._id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default LatestJobs;
