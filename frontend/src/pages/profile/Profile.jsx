import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../utils/axios";
import SummaryApi from "../../common/Api";
import toast from "react-hot-toast";
import fetchUserDetails from "../../utils/fetchUserDetails";
import { setUserDetails } from "../../reduxStores/userSlice";
import AxiosToastError from "../../utils/AxiosToastError";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../../components/UserAvatar";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
        <div className="flex flex-col items-center">
          {/* Profile Image Section */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {user.avatar ? (
              <img
                alt={user.name}
                src={user.avatar}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaRegUserCircle className="w-3/4 h-3/4 text-white" />
            )}
          </div>

          <button
            onClick={() => setProfileAvatarEdit(true)}
            className="mt-4 px-6 py-2 bg-primary-100 text-white rounded-full hover:bg-primary-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-offset-2"
          >
            Edit Profile Picture
          </button>

          {openProfileAvatarEdit && (
            <UserProfileAvatarEdit close={() => setProfileAvatarEdit(false)} />
          )}
        </div>

        {/* Profile Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-200 focus:border-primary-200 sm:text-sm transition-colors duration-200"
                value={userData.name}
                name="name"
                onChange={handleOnChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-200 focus:border-primary-200 sm:text-sm transition-colors duration-200"
                value={userData.email}
                name="email"
                onChange={handleOnChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700"
              >
                Mobile
              </label>
              <input
                type="text"
                id="mobile"
                placeholder="Enter your mobile"
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-200 focus:border-primary-200 sm:text-sm transition-colors duration-200"
                value={userData.mobile}
                name="mobile"
                onChange={handleOnChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-200 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-200 transition-colors duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
