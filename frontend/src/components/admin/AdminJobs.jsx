import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAdminJobs from "@/hooks/useGetAdminJobs";
import { setSearchJob } from "@/redux/jobSlice";

function AdminJobs() {
  useGetAdminJobs()
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSearchJob(search))
  },[search])
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-6xl my-10 ">
        <div className="flex items-center justify-between my-5">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-fit"
            placeholder="Filter by name"
          />
          <Button onClick={() => navigate("/admin/job/create")}>
            Post Jobs
          </Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
}

export default AdminJobs;
