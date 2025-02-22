import { setSingleJob } from '@/redux/jobSlice'
import { USER_API_ENDPOINT } from '@/utils/Api_End_point'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'

function useGetJobById(jobId) {
    const dispatch = useDispatch()

}

export default useGetJobById
