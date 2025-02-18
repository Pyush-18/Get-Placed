import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/Api_End_point";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import useGetCompanyById from "@/hooks/useGetCompanyById";
import { useSelector } from "react-redux";

function EditCompany() {
  const { companyId } = useParams();
  useGetCompanyById({companyId})
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    website: "",
    logo: "",
  });
  const navigate = useNavigate();
  const {singleCompany} = useSelector(store => store.company)

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, logo: file });
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("location", input.location);
    formData.append("website", input.website);
    if (input.logo) {
      formData.append("logo", input.logo);
    }
    try {
      setLoading(true);
      const response = await axios.put(
        `${USER_API_ENDPOINT}/company/update/${companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      location: singleCompany?.location || "",
      website: singleCompany?.website || "",
      logo: singleCompany?.logo || "",
    })
  },[singleCompany])

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={(e) => updateHandler(e)}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/companies/create")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Edit Company</h1>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name" className="font-semibold ">
                Name
              </Label>
              <Input
                type="text"
                value={input.name}
                name="name"
                onChange={changeHandler}
              />
            </div>
            <div>
              <Label htmlFor="description" className="font-semibold ">
                Description
              </Label>
              <Input
                type="text"
                value={input.description}
                name="description"
                onChange={changeHandler}
              />
            </div>
            <div>
              <Label htmlFor="location" className="font-semibold ">
                Location
              </Label>
              <Input
                type="text"
                value={input.location}
                name="location"
                onChange={changeHandler}
              />
            </div>
            <div>
              <Label htmlFor="website" className="font-semibold ">
                Website
              </Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeHandler}
              />
            </div>
            <div>
              <Label htmlFor="Logo" className="font-semibold ">
                Logo
              </Label>
              <Input
                type="file"
                name="logo"
                onChange={fileHandler}
                accept="image/*"
              />
            </div>
          </div>
          {}
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
        </form>
      </div>
    </div>
  );
}

export default EditCompany;
