import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Link } from "react-router-dom";
import AppliedJobTable from "../components/AppliedJobTable"
import UpdateProfileDialogBox from "./UpdateProfileDialogBox";
import { useSelector } from "react-redux";
import useGetAppliesJob from "@/hooks/useGetAppliesJob";


function Profile() {
  const [open, setOpen] = useState(false)
  const {authUser} = useSelector(store => store.auth)
  useGetAppliesJob()
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={authUser?.profile?.avatar}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{authUser?.fullName}</h1>
              <p className="text-sm text-gray-600">
               {authUser?.profile?.bio}
              </p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{authUser?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact />
            <span>{authUser?.phoneNumber}</span>
          </div>
        </div>
        <div className="mt-3">
          <h1>Skills</h1>
          <div className="flex items-center gap-2 my-3">
            {authUser?.profile?.skills.length <= 0 ? (
              <span className="text-red-500 text-md font-bold">No Skills</span>
            ) : (
              authUser?.profile?.skills.map((skill, index) => <Badge key={index}>{skill}</Badge>)
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label className="text-md font-bold">Resume</Label>
            {
                resume ? <Link to={authUser?.profile?.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 w-full hover:underline cursor-pointer">{authUser?.profile?.resumeOriginalName}</Link>: <span>NA</span>
            }
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-xl">
            <h1 className="font-bold text-lg my-5">Applied Job</h1>
            {/* Applied jobs table */}
            <AppliedJobTable/>

        </div>
      </div>
      <UpdateProfileDialogBox open={open} setOpen={setOpen}/>
    </div>
  );
}

export default Profile;

const resume = true
