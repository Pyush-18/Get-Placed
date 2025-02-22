import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/Api_End_point";
import { toast } from "sonner";
import { setSingleJob } from "@/redux/jobSlice";

function JobDescription() {
  const { id } = useParams();
  const { singleJob } = useSelector((store) => store.job);
  const { authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch()
  const date = new Date(singleJob?.createdAt);
  const isInitiallyApplied = singleJob?.length !== 0 && singleJob?.application?.some((application) => application.applicants === authUser?._id) || false
  const [isApplied, setIsApplied] = useState(isInitiallyApplied)


  const applyHandler = async() => {
    try {
      const response = await axios.get(`${USER_API_ENDPOINT}/application/apply/${singleJob?._id}`, {withCredentials: true})
      if(response?.data?.success){
        setIsApplied(true)
        const updatedSingleJob = {...singleJob, application: [...singleJob.application, {applicants: authUser?._id}  ]}
        dispatch(setSingleJob(updatedSingleJob))
        toast.success(response?.data?.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message) 
    }
  }

  useEffect(() => {
    const fetchJob = async() => {
        try {
            const response = await axios.get(`${USER_API_ENDPOINT}/job/get/${id}`,{withCredentials: true})
            
            if(response?.data?.success){
                dispatch(setSingleJob(response?.data?.data))
                setIsApplied(response?.data?.data?.application?.some((application) => application?.applicants === authUser?._id))
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    fetchJob()
 },[dispatch, authUser?._id, id])

  return (
    <div className="max-w-7xl mx-auto my-10 border border-gray-100 shadow-lg p-5 rounded-md">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.company?.name}</h1>
          <div className="flex gap-3 items-center mt-4">
            <Badge className={`text-blue-700 font-bold `} variant="ghost">
              {singleJob?.noOfOpening} Position
            </Badge>
            <Badge className={`text-[#F83002] font-bold `} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={`text-[#7209b7] font-bold `} variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
        onClick={isApplied ? null : applyHandler}
          disabled={isApplied}
          className={`${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-purple-700 hover:bg-purple-600"
          } rounded-lg`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b py-4 border-b-gray-300 font-medium">
        {singleJob?.company?.description}
      </h1>
      <div className="mt-3">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800 ">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800 ">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800 ">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Requirements:{" "}
          {singleJob?.requirements?.map((value) => (
            <span className="pl-4 font-normal text-gray-800 ">{value.trim()}</span>
          ))}
        </h1>
        <h1 className="font-bold my-1">
          Exprience:{" "}
          <span className="pl-4 font-normal text-gray-800 ">
            {singleJob?.exprience} year
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800 ">
            {singleJob?.salary}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800 ">
            {singleJob?.application?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800 ">
            {date?.toLocaleDateString()}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default JobDescription;
