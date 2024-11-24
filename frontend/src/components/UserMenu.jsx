import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiShoppingBag, FiMapPin, FiLogOut } from "react-icons/fi";
import { MdOutlineCategory, MdOutlineSubtitles } from "react-icons/md";
import { BiUpload } from "react-icons/bi";
import { BsBox } from "react-icons/bs";
import SummaryApi from "../common/Api";
import isAdmin from "../utils/isAdmin";
import PropTypes from "prop-types";
import { logout } from "../reduxStores/userSlice";

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      console.log("logout", response);
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  };

  const handleClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 min-w-[200px] max-h-[calc(100vh-100px)] overflow-hidden">
      <div className="font-bold text-xl text-gray-800 mb-2">My Account</div>
      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg mb-3">
        <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            {user.name?.charAt(0).toUpperCase() || user.mobile?.charAt(0)}
          </span>
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-800 flex items-center gap-2">
            <span className="max-w-52 text-ellipsis line-clamp-1">
              {user.name || user.mobile}
            </span>
            {user.role === "ADMIN" && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                Admin
              </span>
            )}
          </div>
          <Link
            onClick={handleClose}
            to={"/dashboard/profile"}
            className="text-sm text-gray-500 hover:text-primary-200 flex items-center gap-1"
          >
            View Profile <HiOutlineExternalLink size={14} />
          </Link>
        </div>
      </div>

      <Divider />

      <div className="grid gap-1 pt-2">
        {isAdmin(user.role) && (
          <>
            <Link
              onClick={handleClose}
              to={"/dashboard/category"}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <MdOutlineCategory size={18} />
              <span>Category</span>
            </Link>

            <Link
              onClick={handleClose}
              to={"/dashboard/subcategory"}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <MdOutlineSubtitles size={18} />
              <span>Sub Category</span>
            </Link>

            <Link
              onClick={handleClose}
              to={"/dashboard/upload-product"}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <BiUpload size={18} />
              <span>Upload Product</span>
            </Link>

            <Link
              onClick={handleClose}
              to={"/dashboard/product"}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
            >
              <BsBox size={18} />
              <span>Product</span>
            </Link>
          </>
        )}

        <Link
          onClick={handleClose}
          to={"/dashboard/myorders"}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
        >
          <FiShoppingBag size={18} />
          <span>My Orders</span>
        </Link>

        <Link
          onClick={handleClose}
          to={"/dashboard/address"}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
        >
          <FiMapPin size={18} />
          <span>Save Address</span>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors w-full text-left mt-2"
        >
          <FiLogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default UserMenu;

UserMenu.propTypes = {
  close: PropTypes.func,
};
