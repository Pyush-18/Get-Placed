import { setCompanies } from "@/redux/companySlice";
import { USER_API_ENDPOINT } from "@/utils/Api_End_point";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetAllCompanies() {
    const dispatch = useDispatch()
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${USER_API_ENDPOINT}/company/get`,{withCredentials: true})
   
        if(response?.data?.success){
            dispatch(setCompanies(response?.data?.data))
        }
      } catch (error) {
        
      }
    };
    fetchCompanies();
  }, []);
}

export default useGetAllCompanies;
