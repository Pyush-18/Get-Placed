import { setSingleCompany } from "@/redux/companySlice";
import { USER_API_ENDPOINT } from "@/utils/Api_End_point";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetCompanyById({companyId}) {
    const dispatch = useDispatch()
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${USER_API_ENDPOINT}/company/get/${companyId}`,{withCredentials: true})
        if(response?.data?.success){
            dispatch(setSingleCompany(response?.data?.data))
        }
      } catch (error) {
        console.log(error?.response?.data?.message)
      }
    };
    fetchCompany();
  }, [companyId, dispatch]);
}

export default useGetCompanyById;
