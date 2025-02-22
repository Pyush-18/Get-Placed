import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/Api_End_point";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post(`${USER_API_ENDPOINT}/user/login`, input, {
        withCredentials: true,
      });
      if (response?.data?.success) {
        dispatch(setAuthUser(response?.data?.data))
        toast.success(response?.data?.message);
        const navigator = input.role === "student" ? "/" : "/admin/companies"
        navigate(navigator);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    
  })
  return (
    <div>
      <div>
        <Navbar />

        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <form
            onSubmit={(e) => loginHandler(e)}
            className="w-1/2 border border-gray-200 rounded-e-md p-4 my-10"
          >
            <h1 className="font-bold text-xl mb-5">Login</h1>

            <div>
              <Label>Email</Label>
              <Input
                name="email"
                value={input.email}
                onChange={(e) => inputHandler(e)}
                type="email"
                placeholder="shreeRam@gmail.com"
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                name="password"
                value={input.password}
                onChange={(e) => inputHandler(e)}
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
                    onChange={(e) => inputHandler(e)}
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
                    onChange={(e) => inputHandler(e)}
                    value="student"
                    className="cursor-pointer"
                    id="r2"
                  />
                  <Label htmlFor="r2">Student</Label>
                </div>
              </RadioGroup>
            </div>
            {loading ? (
              <Button className="w-full my-4" >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4">
                Login
              </Button>
            )}

            <span>
              Don't have a account?{" "}
              <Link to="/register" className="text-blue-600">
                Signup
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
