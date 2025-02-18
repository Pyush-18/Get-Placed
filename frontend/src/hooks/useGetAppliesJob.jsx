import { setAppliedJobs } from '@/redux/jobSlice'
import { USER_API_ENDPOINT } from '@/utils/Api_End_point'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

function useGetAppliesJob() {
    const dispatch = useDispatch()
 useEffect(() => {
    const fetchAppliedJobs = async() => {
        try {
            const response = await axios.get(`${USER_API_ENDPOINT}/application/get`,{withCredentials: true})
            if(response?.data?.success){
                dispatch(setAppliedJobs(response?.data?.data))
                toast.success(response?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    fetchAppliedJobs()
 },[])
}

export default useGetAppliesJob
