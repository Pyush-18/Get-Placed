import { setJobs } from "@/redux/jobSlice";
import { USER_API_ENDPOINT } from "@/utils/Api_End_point";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get(
          `${USER_API_ENDPOINT}/job/get-all?keyword=${searchQuery}`,
          { withCredentials: true }
        );
        if (response?.data?.success) {
          dispatch(setJobs(response?.data?.data));
        }
      } catch (error) {
        console.log(error?.response?.data?.message);
      }
    };
    fetchAllJobs();
  }, []);
}

export default useGetAllJobs;
