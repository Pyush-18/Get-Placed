import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/Api_End_point";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

function CreateCompany() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const registerCompany = async() => {
        try {
            const response = await axios.post(`${USER_API_ENDPOINT}/company/register`, {name}, 
                {
                    headers:{
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            )
            if(response?.data?.success){
                dispatch(setSingleCompany(response?.data?.data))
                const companyId = response?.data?.data?._id
                navigate(`/admin/company/${companyId}`)
                toast.success(response?.data?.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            
        }
        setName("")
    }
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, ad.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} type="text" className="my-2 " placeholder="Microsoft" />
        <div className="flex items-center gap-2 my-10">
          <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
          <Button onClick={registerCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default CreateCompany;
