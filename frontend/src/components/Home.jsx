import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home() {
  useGetAllJobs()
  const {authUser} = useSelector(store => store.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if(authUser?.role === "recruiter"){
      navigate("/admin/companies")
    }
  },[])
  return (
    <div className='p-2 dark:bg-slate-900 dark:text-white overflow-hidden'>
      <Navbar/>
      <HeroSection/>
      <CategoryCarousel/>
      <LatestJobs/>
      <Footer/>  
    </div>
  )
}

export default Home
