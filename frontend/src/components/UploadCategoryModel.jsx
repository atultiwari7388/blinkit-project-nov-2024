import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import uploadImage from "../utils/UploadImage";
import Axios from "../utils/Axios";
import SummaryApi from "../common/Api";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import PropTypes from "prop-types";
import { LoadingIndicator } from "../utils/LoadinIndicator";

const UploadCategoryModel = ({ close, refetch }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setCategoryData((preve) => {
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
        ...SummaryApi.addCategory,
        data: categoryData,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        refetch();
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

    setSelectedImage(URL.createObjectURL(file));

    try {
      const response = await uploadImage(file);
      const ImageResponse = response?.data;

      if (!ImageResponse?.data?.url) {
        throw new Error("Image upload failed or URL missing");
      }

      setCategoryData((prev) => ({
        ...prev,
        image: ImageResponse.data.url,
      }));
    } catch (error) {
      console.error("Image upload error:", error.message);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <section className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full transform transition-all">
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-xl font-semibold text-gray-800">
            Add New Category
          </h1>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose size={24} className="text-gray-500" />
          </button>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="categoryName"
            >
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              placeholder="Enter category name"
              value={categoryData.name}
              name="name"
              onChange={handleOnChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category Image
            </label>
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="w-full lg:w-48 h-48 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                {categoryData.image || selectedImage ? (
                  <img
                    alt="category preview"
                    src={categoryData.image || selectedImage}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-4">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      No image selected
                    </p>
                  </div>
                )}
              </div>

              <label
                htmlFor="uploadCategoryImage"
                className={`
                  ${
                    !categoryData.name
                      ? "bg-gray-100 cursor-not-allowed text-gray-400"
                      : "bg-blue-50 hover:bg-blue-100 cursor-pointer text-blue-600"
                  }
                  flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors duration-200
                `}
              >
                <FiUpload className="w-5 h-5" />
                <span className="font-medium">Upload Image</span>
                <input
                  disabled={!categoryData.name}
                  onChange={handleUploadCategoryImage}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button
              disabled={!categoryData.name || !categoryData.image}
              className={`
                w-full py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${
                  categoryData.name && categoryData.image
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryModel;

UploadCategoryModel.propTypes = {
  close: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};
