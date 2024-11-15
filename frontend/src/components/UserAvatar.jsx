import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/axios";
import SummaryApi from "../common/Api";
import { updatedAvatar } from "../reduxStores/userSlice";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { FaRegUserCircle, FaCamera } from "react-icons/fa";

const UserProfileAvatarEdit = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUploadAvatarImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.uploadAvatar,
        data: formData,
      });
      const { data: responseData } = response;

      dispatch(updatedAvatar(responseData.data.avatar));
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-70 p-4 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white max-w-sm w-full rounded-2xl p-6 shadow-2xl transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Update Profile Picture
          </h2>
          <button
            onClick={close}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary-100 shadow-lg transition-transform duration-300 hover:scale-105">
              {user.avatar ? (
                <img
                  alt={user.name}
                  src={user.avatar}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">
                  <FaRegUserCircle className="w-3/4 h-3/4 text-white" />
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="absolute bottom-0 right-0">
              <label
                htmlFor="uploadProfile"
                className="bg-primary-200 hover:bg-primary-100 text-white p-3 rounded-full cursor-pointer shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
              >
                <FaCamera size={20} />
                <input
                  onChange={handleUploadAvatarImage}
                  type="file"
                  id="uploadProfile"
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </form>
          </div>

          {loading && (
            <div className="mt-4 flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-200"></div>
              <span className="text-gray-600">Uploading...</span>
            </div>
          )}

          <p className="mt-4 text-sm text-gray-500 text-center">
            Click the camera icon to upload a new profile picture
          </p>
        </div>
      </div>
    </section>
  );
};

export default UserProfileAvatarEdit;
