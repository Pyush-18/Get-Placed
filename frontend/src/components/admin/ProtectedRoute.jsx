import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({childern}) {
    const {authUser}= useSelector(store => store.auth)
    const navigate = useNavigate()
    useEffect(() => {
        if(authUser === null || authUser?.role !== "recruiter"){
            navigate("/")
        }
    },[])
  return (
    <div>
      {childern}
    </div>
  )
}

export default ProtectedRoute
