import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function ProtectedForStudentRoute({ element }) {
  const { authUser } = useSelector((store) => store.auth);

  if(authUser.role === "recruiter"){
    return <h2 className='text-red-500 font-bold text-center mt-5'>Access Denied : This page is only for student</h2>
}
  return authUser && authUser?.role === "student"  ? element : <Navigate to="/login" replace />
}
export default ProtectedForStudentRoute;
