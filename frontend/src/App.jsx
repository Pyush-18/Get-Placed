import React from 'react'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import AdminJobs from './components/admin/AdminJobs'
import CreateCompany from './components/admin/CreateCompany'
import EditCompany from './components/admin/EditCompany'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedForStudentRoute from './components/shared/ProtectedForStudentRoute'
import ProtectedForCompanyRoute from './components/shared/ProtectedForCompanyRoute'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ProtectedForStudentRoute element={<Home/>}/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Signup/>}/>
      <Route path="/job" element={<ProtectedForStudentRoute element={<Jobs/>} />}/>
      <Route path="/description/:id" element={<ProtectedForStudentRoute element={<JobDescription/>}/>}/>
      <Route path="/browse" element={<ProtectedForStudentRoute element={<Browse/>}/>}/>
      <Route path="/profile" element={<ProtectedForStudentRoute element={<Profile/>}/>}/>

      //Admin
      <Route path="/admin/companies" element={<ProtectedForCompanyRoute element={<Companies />}/>}/>
      <Route path="/admin/companies/create" element={<ProtectedForCompanyRoute element={<CreateCompany />}/>}/>
      <Route path="/admin/company/:companyId" element={<ProtectedForCompanyRoute element={<EditCompany/>}/>}/>
      <Route path="/admin/jobs" element={<ProtectedForCompanyRoute element={<AdminJobs />}/>}/>
      <Route path="/admin/job/create" element={<ProtectedForCompanyRoute element={<PostJob />}/>}/>
      <Route path="/admin/jobs/:jobId/applicants" element={<ProtectedForCompanyRoute element={<Applicants/>}/>}/>

    </>
  )
)

function App() {
  return (
    <RouterProvider router={router}>
      <Navbar/>
    </RouterProvider>
  )
}

export default App
