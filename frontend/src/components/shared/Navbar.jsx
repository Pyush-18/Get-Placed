import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/Api_End_point";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";
import { setJobs, setSingleJob } from "@/redux/jobSlice";

function Navbar() {
  const { authUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${USER_API_ENDPOINT}/user/logout`, {
        withCredentials: true,
      });
      if (response?.data?.success) {
        dispatch(setAuthUser(null));
        toast.success(response?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="bg-white ">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 ">
        <div className="">
          <h1 className="text-2xl font-bold">
            Get<span className="text-rose-700">Placed</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex items-center font-medium gap-5">
            {authUser && authUser?.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/job">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>
          {!authUser ? (
            <div className="flex items-center ">
              <Button variant="link">
                <Link to="/register">Sign Up</Link>
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
                <Link to="/login">Login</Link>
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={authUser?.profile?.avatar}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60 md:w-56">
                <div className="flex items-center gap-3">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={authUser?.profile?.avatar}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{authUser?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {authUser?.role?.toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {authUser && authUser?.role === "student" ? (
                    <>
                      <div className="flex items-center mt-2">
                        <User2 />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <LogOut />
                        <Button onClick={logoutHandler} variant="link">
                          Logout
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
