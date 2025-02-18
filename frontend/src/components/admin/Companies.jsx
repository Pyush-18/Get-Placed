import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "@/redux/companySlice";

function Companies() {
  useGetAllCompanies();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSearchCompany(search))
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
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
}

export default Companies;
