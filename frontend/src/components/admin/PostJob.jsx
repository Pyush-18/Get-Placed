import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/Api_End_point";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";

function PostJob() {
  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: 0,
    jobType: "",
    location: "",
    noOfOpening: 0,
    exprience: 0,
    companyId : ""
  });
  
  const [loading, setLoading] = useState(false);
  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeSelectHandler = (value) => {
    const selectedCompany = companies?.find(
      (company) => company?.name?.toLowerCase() === value?.toLowerCase()
    );
    setInput({ ...input, companyId: selectedCompany?._id });
  };
  const dispatch = useDispatch();
  const postJob = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `${USER_API_ENDPOINT}/job/post`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
    setInput({
      title: "",
      description: "",
      requirements: "",
      salary: 0,
      jobType: "",
      location: "",
      noOfOpening: 0,
      exprience: 0,
      companyId: "",
    });
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={postJob}
          className="bg-white shadow-lg p-8 rounded-md max-w-4xl border border-gray-200"
        >
          <h1 className="font-bold text-3xl mb-8 uppercase">Create Job</h1>
          <div className="grid grid-cols-2 gap-2 ">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="number"
                min={1}
                name="salary"
                value={input.salary}
                onChange={changeHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input?.location}
                onChange={changeHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No of opening</Label>
              <Input
                type="number"
                min={1}
                name="noOfOpening"
                value={input.noOfOpening}
                onChange={changeHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Exprience</Label>
              <Input
                type="number"
                min={1}
                name="exprience"
                value={input.exprience}
                onChange={changeHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies?.length > 0 && (
              <Select onValueChange={changeSelectHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Companies</SelectLabel>
                    {companies?.map((company) => (
                      <SelectItem key={company?._id} value={company?.name}>
                        {company?.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Update
            </Button>
          )}
          {companies?.length <= 0 && (
            <span className="text-sm text-red-500 font-bold text-center">
              Please register the company first before posting the jobs
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostJob;
