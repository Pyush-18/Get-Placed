import { setSearchQuery } from "@/redux/jobSlice";
import axios from "axios";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const [query, setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchHandler = async() => {
    dispatch(setSearchQuery(query))
    navigate("/browse")
  }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 py-10">
        <span className="px-4 py-2 rounded-full dark:bg-black dark:border dark:border-gray-700 bg-gray-300 text-red-500 font-medium mx-auto">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-4xl lg:text-5xl font-bold">
          Search, Apply & <br />
          Get your <span className="text-[#6a3ac2]">Dream Job</span>
        </h1>
        <p>
        With hard work (like Arjuna) and divine wisdom (like Krishna), success and prosperity will always be with you.
        </p>
      </div>
      <div className="flex w-[40%] shadow-lg border dark:border-gray-700 border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
        <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Find your dream jobs"
          className="outline-none dark:bg-black dark:text-white  border-none w-full"
        />
        <button onClick={searchHandler} className="rounded-r-full p-3 bg-[#6A28C2] ">
          <Search
           className="h-5 w-5 text-white"/>
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
