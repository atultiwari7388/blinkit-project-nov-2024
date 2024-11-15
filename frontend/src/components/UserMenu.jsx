import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "./Divider";
import toast from "react-hot-toast";
import Axios from "../utils/axios";
import SummaryApi from "../common/Api";
import { logout } from "../reduxStores/userSlice";

export default function UserMenu() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.data.success) {
        dispatch(logout());
        toast.success(response.data.message);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Error logging out");
    }
  };
  return (
    <div>
      <div className="font-semibold">My Account </div>
      <div className="text-sm">{user?.name || user?.mobile}</div>
      <Divider />
      <div className="text-sm grid gap-1 ">
        <Link to={""} className="px-2 hover:bg-gray-100 rounded-md p-2 ">
          {" "}
          My orders
        </Link>
        <Link to={""} className="px-2 hover:bg-gray-200 rounded-md">
          {" "}
          Save Address
        </Link>
        <button className="text-sm text-red-500" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
