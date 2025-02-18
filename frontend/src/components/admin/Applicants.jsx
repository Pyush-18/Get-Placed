import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/Api_End_point";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

function Applicants() {
  const { jobId } = useParams();
  const dispatch = useDispatch()
   const { allApplicants } = useSelector((store) => store.application);
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(
          `${USER_API_ENDPOINT}/application/applicants/${jobId}`,
          { withCredentials: true }
        );
        console.log(response)
        dispatch(setAllApplicants(response?.data?.data?.application))
        if (response?.data?.success) {

          toast.success(response?.data?.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    fetchApplicants();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-bold my-5">Applicants ({allApplicants?.length})</h1>
        <ApplicantsTable />
      </div>
    </div>
  );
}

export default Applicants;
