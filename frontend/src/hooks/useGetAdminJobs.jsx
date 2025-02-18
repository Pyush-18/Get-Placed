import { setAdminJobs } from '@/redux/jobSlice'
import { USER_API_ENDPOINT } from '@/utils/Api_End_point'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

function useGetAdminJobs() {
    const dispatch = useDispatch()
  useEffect(() => {
    const fetchAdminJobs = async() => {
        try {
            const response = await axios.get(`${USER_API_ENDPOINT}/job/admin`, {withCredentials: true})

            if(response?.data?.success){
                dispatch(setAdminJobs(response?.data?.data))
                toast.success(response?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }   
    fetchAdminJobs()
  },[])
}

export default useGetAdminJobs
