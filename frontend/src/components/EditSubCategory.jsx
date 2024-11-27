import { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/Api";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import PropTypes from "prop-types";

export default function EditSubCategory({ close, data, fetchData }) {
  const [subCategoryData, setSubCategoryData] = useState({
    _id: data._id,
    name: data.name,
    image: data.image,
    category: data.category || [],
  });
  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubCategoryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const response = await uploadImage(file);
    const { data: ImageResponse } = response;

    setSubCategoryData((prev) => ({
      ...prev,
      image: ImageResponse.data.url,
    }));
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const filteredCategories = subCategoryData.category.filter(
      (cat) => cat._id !== categoryId
    );
    setSubCategoryData((prev) => ({
      ...prev,
      category: filteredCategories,
    }));
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.updateSubCategory,
        data: subCategoryData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        close?.();
        fetchData?.();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const isFormValid =
    subCategoryData?.name &&
    subCategoryData?.image &&
    subCategoryData?.category[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl transform transition-all">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">
              Edit Sub Category
            </h1>
            <button
              onClick={close}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoClose size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleSubmitSubCategory}>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={subCategoryData.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter sub category name"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Image</p>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg h-48 w-full lg:w-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                {subCategoryData.image ? (
                  <img
                    alt="subCategory"
                    src={subCategoryData.image}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <p className="text-sm text-gray-400">No Image Selected</p>
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage" className="flex-shrink-0">
                <div className="px-6 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer font-medium">
                  Upload Image
                </div>
                <input
                  type="file"
                  id="uploadSubCategoryImage"
                  className="hidden"
                  onChange={handleUploadSubCategoryImage}
                  accept="image/*"
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Select Categories
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="p-2 flex flex-wrap gap-2 min-h-[60px] bg-gray-50">
                {subCategoryData.category.map((cat) => (
                  <span
                    key={cat._id + "selectedValue"}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {cat.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategorySelected(cat._id)}
                      className="ml-2 hover:text-blue-600"
                    >
                      <IoClose size={18} />
                    </button>
                  </span>
                ))}
              </div>

              <select
                className="w-full p-3 bg-white border-t border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  const value = e.target.value;
                  if (!value) return;

                  const categoryDetails = allCategory.find(
                    (el) => el._id === value
                  );
                  if (
                    categoryDetails &&
                    !subCategoryData.category.find((cat) => cat._id === value)
                  ) {
                    setSubCategoryData((prev) => ({
                      ...prev,
                      category: [...prev.category, categoryDetails],
                    }));
                  }
                }}
              >
                <option value="">Select Category</option>
                {allCategory.map((category) => (
                  <option
                    value={category?._id}
                    key={category._id + "subcategory"}
                  >
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all
                ${
                  isFormValid
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

EditSubCategory.propTypes = {
  close: PropTypes.func,
  data: PropTypes.object,
  fetchData: PropTypes.func,
};
