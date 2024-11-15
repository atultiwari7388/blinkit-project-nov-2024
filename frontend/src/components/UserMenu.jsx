import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "./Divider";
import toast from "react-hot-toast";
import Axios from "../utils/axios";
import SummaryApi from "../common/Api";
import { logout } from "../reduxStores/userSlice";
import { HiExternalLink } from "react-icons/hi";

export default function UserMenu({ close }) {
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
        if (close) {
          close();
        }
        dispatch(logout());

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
        toast.success("Logout Successfully");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Error logging out");
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };
  return (
    <div>
      <div className="font-semibold">My Account </div>
      <div className="text-sm flex items-center gap-2">
        <span className="max-w-52 text-ellipsis line-clamp-1">
          {user?.name || user?.mobile}{" "}
        </span>
        <Link
          onClick={handleClose}
          to={`/dashboard/profile`}
          className="hover:text-primary-200"
        >
          <HiExternalLink size={15} />
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-1 ">
        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="px-2 hover:bg-gray-100 rounded-md p-2 "
        >
          My orders
        </Link>
        <Link
          onClick={handleClose}
          to={"/dashboard/addressess"}
          className="px-2 hover:bg-gray-200 rounded-md"
        >
          Save Address
        </Link>
        <button className="text-sm text-red-500" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
