import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminJobsTable() {
  const { adminJobs, searchJob } = useSelector((store) => store.job);
  const navigate = useNavigate();

  const [filterJobs, setFilterJobs] = useState(adminJobs);
  useEffect(() => {
    const filteredJob =
      adminJobs?.length >= 0 &&
      adminJobs?.filter((job) => {
        if (!searchJob) { 
          return true;
        }
        return job?.title
          ?.toLowerCase()
          .includes(searchJob?.toLowerCase()) || job?.company?.name
          ?.toLowerCase()
          .includes(searchJob?.toLowerCase())
      });
    setFilterJobs(filteredJob);
  }, [adminJobs, searchJob]);
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.length <= 0 ? (
            <span>You haven't posted any jobs yet</span>
          ) : (
            <>
              {filterJobs?.map((job) => (
                <tr>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>

                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        <div onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)} className="flex items-center gap-2 w-fit cursor-pointer mt-2">
                          <Eye/>
                          <span>Applicants</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
