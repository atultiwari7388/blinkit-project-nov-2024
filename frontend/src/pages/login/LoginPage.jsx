import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../../utils/axios";
import SummaryApi from "../../common/Api";
import AxiosToastError from "../../utils/AxiosToastError";
import { HashLoader } from "react-spinners";

export default function LoginPage() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => ({
      ...preve,
      [name]: value,
    }));
  };

  const valideValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        //set login details to local storage
        localStorage.setItem("accessToken", response.data.data.accessToken),
          localStorage.setItem("refreshToken", response.data.data.refreshToken),
          setData({
            email: "",
            password: "",
          });
        navigate("/");
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
      AxiosToastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center mt-10 bg-gray-100 px-1">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to access your account
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-600"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 w-full p-3 border border-gray-300 rounded  focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-600"
            >
              Password
            </label>
            <div className="mt-1 w-full p-3 border border-gray-300 rounded flex items-center focus-within:ring-indigo-500 focus-within:border-indigo-500">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full outline-none"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer ml-2 text-gray-500"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="hover:text-primary-100 text-sm"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={!valideValue || isLoading}
            className={`w-full py-3 rounded-md text-white font-semibold tracking-wide ${
              valideValue ? "bg-primary-200" : "bg-gray-400 cursor-not-allowed"
            } transition-all flex justify-center items-center`}
          >
            {isLoading ? <HashLoader color="#fff" size={24} /> : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-primary-200 font-semibold">
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
}
