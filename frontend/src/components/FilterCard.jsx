import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "location",
    array: ["Delhi NCR", "Mumbai", "Banglore", "Pune"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Data Science", "AI/ML"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k to 1lakh", "1lakh to 5lakh"],
  },
];

function FilterCard() {
  const itemId = nanoid()
  const [filterValue, setFilterValue] = useState("")
  const filterHandler = (value) => {
    setFilterValue(value)
  }
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchQuery(filterValue))
  },[filterValue])
  return (
    <div className="w-full dark:bg-black dark:text-white dark:border dark:border-gray-700 sticky bg-white p-3 rounded-md shadow-lg">
      <h1 className="font-bold text-lg ">Filter Job</h1>
      <hr className="mt-3" />
      <RadioGroup value={filterValue} onValueChange={filterHandler}>
        {filterData?.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data?.array?.map((value, index) => (
              <div key={index} className="flex items-center space-x-2 my-2">
                <RadioGroupItem id={itemId}  value={value} />
                <Label htmlFor={itemId}>{value}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
