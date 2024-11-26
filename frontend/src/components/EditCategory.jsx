import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/Api";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import PropTypes from "prop-types";

const EditCategory = ({ close, fetchData, data: CategoryData }) => {
  const [data, setData] = useState({
    _id: CategoryData._id,
    name: CategoryData.name,
    image: CategoryData.image,
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateCategory,
        data: data,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    setLoading(false);

    setData((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url,
      };
    });
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl transform transition-all">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Update Category
            </h1>
            <button
              onClick={close}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoClose size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="categoryName"
              className="text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={data.name}
              name="name"
              onChange={handleOnChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-200 focus:border-transparent transition-all duration-200 outline-none"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Category Image</p>
            <div className="flex gap-6 items-start">
              <div className="relative group">
                <div className="w-48 h-48 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                  {data.image ? (
                    <img
                      alt="category"
                      src={data.image}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center">
                      <MdCloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        No image uploaded
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-4">
                <label htmlFor="uploadCategoryImage">
                  <div
                    className={`
                      ${
                        !data.name
                          ? "bg-gray-100 cursor-not-allowed text-gray-400"
                          : "bg-primary-50 hover:bg-primary-200 cursor-pointer text-black hover:text-white"
                      }
                      px-6 py-3 rounded-lg border-2 border-current transition-colors duration-200 font-medium text-center
                    `}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Uploading...
                      </span>
                    ) : (
                      "Upload New Image"
                    )}
                  </div>
                  <input
                    disabled={!data.name}
                    onChange={handleUploadCategoryImage}
                    type="file"
                    id="uploadCategoryImage"
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              disabled={!data.name || !data.image || loading}
              className={`
                w-full py-3 px-6 rounded-lg font-semibold text-black transition-all duration-200
                ${
                  data.name && data.image && !loading
                    ? "bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl"
                    : "bg-gray-300 cursor-not-allowed"
                }
              `}
            >
              {loading ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;

EditCategory.propTypes = {
  close: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
