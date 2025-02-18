import React from "react";
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
import { LeafyGreen, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/Api_End_point";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const status = ["Pending", "Accepted", "Rejected"];

function ApplicantsTable() {
  const { allApplicants } = useSelector((store) => store.application);
  const statusHandler = async ({ status }, id) => {
    try {
      const response = await axios.put(
        `${USER_API_ENDPOINT}/application/update/${id}`,
        { status },
        { withCredentials: true }
      );
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allApplicants?.length <= 0 ? (
            <span className="text-sm text-red-500 font-bold">
              There is no applicants for this job
            </span>
          ) : (
            allApplicants?.map((application) => (
              <tr>
                <TableCell>{application?.applicants?.fullName}</TableCell>
                <TableCell>{application?.applicants?.email}</TableCell>
                <TableCell>{application?.applicants?.phoneNumber}</TableCell>
                <TableCell>
                  {application?.applicants?.profile?.resume ? (
                    <Link
                      className="text-blue-500 hover:underline"
                      to={`${application?.applicants?.profile?.resume}`}
                      target="_blank"
                    >
                      {application?.applicants?.profile?.resume?.split("/")[7]
                      }
                    </Link>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>
                  {application?.applicants?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="cursor-pointer w-[150px] text-right">
                  <div className="flex justify-end">
                    <Select
                      onValueChange={(value) =>
                        statusHandler({ status: value }, application?._id)
                      }
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {status?.map((stat) => (
                            <SelectItem value={stat?.toLowerCase()}>
                              {stat}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </TableCell>
              </tr>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
