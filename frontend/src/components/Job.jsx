import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function Job({ job }) {
  const navigate = useNavigate()

  const daysAgoMethod = (jobDay) => {
    const pastTime = new Date(jobDay).getTime()
    const currentTime = new Date().getTime()
    const differenceInMs = currentTime - pastTime
    const differenceInDays = Math.floor(differenceInMs/(1000*60*60*24))
    return differenceInDays
  }


  

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoMethod(job?.createdAt) === 0 ? "Today" : daysAgoMethod(job?.createdAt) + "days ago"} </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" className="p-6" size="icon">
          <Avatar>
            <AvatarImage src="https://imgs.search.brave.com/vTLhO_pzN0kiabVcKVcP48PrjPGviLQ4mBX6A0nV34c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzEx/L05ldy1Hb29nbGUt/TG9nby00OTd4NTAw/LmpwZw" />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>
      <div className="flex gap-3 items-center mt-4">
        <Badge className={`text-blue-700 font-bold `} variant="ghost">
        {job?.noOfOpening} Position
        </Badge>
        <Badge className={`text-[#F83002] font-bold `} variant="ghost">
        {job?.jobType}
        </Badge>
        <Badge className={`text-[#7209b7] font-bold `} variant="ghost">
        {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <Button onClick={() => navigate(`/description/${job?._id}`)} varant="outline">Details</Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>
      </div>
    </div>
  );
}

export default Job;
