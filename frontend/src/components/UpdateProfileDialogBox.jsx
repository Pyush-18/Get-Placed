import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { CloudDownload, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/Api_End_point.js";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";

function UpdateProfileDialogBox({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const { authUser } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullName: authUser?.fullName,
    email: authUser?.email,
    phoneNumber: authUser?.phoneNumber,
    skills: authUser?.profile?.skills?.map((skill) => skill),
    bio: authUser?.profile?.bio,
    resume: authUser?.profile?.resume,
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, resume: file });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.resume) {
      formData.append("resume", input.resume);
    }
    try {
      setLoading(true)
      const response = await axios.put(
        `${USER_API_ENDPOINT}/user/profile/update`,
        formData,
        {
          headers:{
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true 
        },
      );
      if(response?.data?.success){
        dispatch(setAuthUser(response?.data?.data))
        toast.success(response?.data?.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }finally{
      setLoading(false)
    }
    setOpen(false)
  };
  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-[425px] dark:bg-slate-900 dark:text-white"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={updateProfileHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fullName" className="text-right">
                Name
              </Label>
              <Input
                value={input?.fullName}
                onChange={changeHandler}
                id="fullName"
                type="text"
                className="col-span-3"
                name="fullName"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                value={input?.email}
                onChange={changeHandler}
                id="email"
                type="email"
                className="col-span-3"
                name="email"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phoneNumber" className="text-right">
                Number
              </Label>
              <Input
                value={input?.phoneNumber}
                onChange={changeHandler}
                id="phoneNumber"
                type="tel"
                className="col-span-3"
                name="phoneNumber"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                value={input?.bio}
                onChange={changeHandler}
                id="bio"
                type="text"
                className="col-span-3"
                name="bio"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">
                skills
              </Label>
              <Input
                value={input?.skills}
                onChange={changeHandler}
                id="skills"
                type="text"
                className="col-span-3"
                name="skills"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                type="file"
                onChange={fileHandler}
                accept="application/pdf"
                className="col-span-3"
                name="file"
              />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full dark:bg-blue-600 dark:text-white my-4">
                <Loader2 className="mr-2  h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 dark:bg-blue-600 dark:text-white">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProfileDialogBox;
