import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/Api_End_point.js";
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";


function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    avatar: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setInput({ ...input, [name]: value });
  };
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0] 
    setInput({ ...input, avatar: file});
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const formData = new FormData();
      formData.append("fullName", input.fullName);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("role", input.role);
      if (input.avatar) {
        formData.append("avatar", input.avatar);
      }
      const response = await axios.post(
        `${USER_API_ENDPOINT}/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        {
          withCredentials: true,
        }
      );
      if(response?.data?.success){
        toast.success(response?.data?.message)
        navigate("/login")
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }finally{
      dispatch(setLoading(false))
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={(e) => registerHandler(e)}
          className="w-1/2 border border-gray-200 rounded-e-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div>
            <Label>Full Name</Label>
            <Input
              value={input.fullName}
              name="fullName"
              onChange={changeHandler}
              type="text"
              placeholder="shree ram"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              value={input.email}
              name="email"
              onChange={changeHandler}
              type="email"
              placeholder="shreeRam@gmail.com"
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              value={input.phoneNumber}
              onChange={changeHandler}
              name="phoneNumber"
              type="text"
              placeholder="45616816"
            />
          </div>
          <div>
            <Label>Password</Label>
            <Input
              value={input.password}
              onChange={changeHandler}
              name="password"
              type="password"
              placeholder="nasckna"
            />
          </div>
          <div>
            <RadioGroup
              className="flex items-center gap-3 my-5"
              defaultValue="comfortable"
            >
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "recruiter"}
                  onChange={changeHandler}
                  value="recruiter"
                  className="cursor-pointer"
                  id="r1"
                />
                <Label htmlFor="r1">Recruiter</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  checked={input.role === "student"}
                  onChange={changeHandler}
                  value="student"
                  className="cursor-pointer"
                  id="r2"
                />
                <Label htmlFor="r2">Student</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                onChange={changeFileHandler}
                accept="image/*"
                type="file"
                className="cursor-pointer"
              />
            </div>
          </div>
          {loading ? (
              <Button className="w-full my-4" >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Signup
              </Button>
            )}
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
