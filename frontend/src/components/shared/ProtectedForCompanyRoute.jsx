import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedForCompanyRoute({element}) {
    const {authUser} = useSelector(store => store.auth)
    if(authUser.role === "student"){
        return <h2 className='text-red-500 font-bold text-8xl text-center mt-10'>Access Denied : This page is only for recruiter</h2>
    }
  return authUser && authUser?.role === "recruiter" ? element : <Navigate to="/login" />
 }

export default ProtectedForCompanyRoute
