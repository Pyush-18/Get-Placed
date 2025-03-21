import React, { useState } from "react";
import {
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
  Table,
  TableCell,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

function ApplicationTable() {
  const { appliedJobs } = useSelector((store) => store.job)
 
  return (
    <div className="dark:bg-slate-900 dark:text-white">
      <Table>
        <TableCaption>A list of your Applied Jobs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs?.length <= 0 ? (
            <span className="dark:text-gray-100">You haven't applied in any job</span>
          ) : (
            appliedJobs?.map((job) => (
              <TableRow key={job?._id}>
                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{job?.job?.title}</TableCell>
                <TableCell>{job?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`w-[70px] ${job?.status === "rejected" ? "bg-red-500 hover:bg-red-600" : job?.status === "pending" ? "bg-gray-700 hover:bg-gray-800" : "bg-green-500 hover:bg-green-600"}`}>{job?.status}</Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicationTable;
