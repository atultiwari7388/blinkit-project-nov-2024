import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/Api";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import PropTypes from "prop-types";

export default function UploadSubCategoryModel({ close, fetchData }) {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    image: "",
    category: [],
  });
  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSubCategoryData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const response = await uploadImage(file);
    const { data: ImageResponse } = response;

    setSubCategoryData((preve) => {
      return {
        ...preve,
        image: ImageResponse.data.url,
      };
    });
  };

  const handleRemoveCategorySelected = (categoryId) => {
    const index = subCategoryData.category.findIndex(
      (el) => el._id === categoryId
    );
    subCategoryData.category.splice(index, 1);
    setSubCategoryData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleSubmitSubCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.createSubCategory,
        data: subCategoryData,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (close) {
          close();
        }
        if (fetchData) {
          fetchData();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl transform transition-all">
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Add Sub Category</h1>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose size={24} className="text-gray-600" />
          </button>
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
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-transparent transition-all"
              placeholder="Enter sub category name"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Image</p>
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="border-2 border-dashed border-gray-300 h-48 w-full lg:w-48 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                {!subCategoryData.image ? (
                  <div className="text-center text-gray-400">
                    <IoMdCloudUpload size={40} className="mx-auto mb-2" />
                    <p className="text-sm">No Image Selected</p>
                  </div>
                ) : (
                  <img
                    alt="subCategory"
                    src={subCategoryData.image}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
              <label htmlFor="uploadSubCategoryImage" className="flex-shrink-0">
                <div className="px-6 py-3 bg-primary-200 text-white rounded-lg hover:bg-primary-300 transition-colors cursor-pointer flex items-center gap-2">
                  <IoMdCloudUpload size={20} />
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
              Select Category
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary-200">
              <div className="p-2 flex flex-wrap gap-2 min-h-[50px]">
                {subCategoryData.category.map((cat) => (
                  <span
                    key={cat._id + "selectedValue"}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                  >
                    {cat.name}
                    <button
                      type="button"
                      onClick={() => handleRemoveCategorySelected(cat._id)}
                      className="ml-2 hover:text-red-600"
                    >
                      <IoClose size={18} />
                    </button>
                  </span>
                ))}
              </div>

              <select
                className="w-full p-3 bg-transparent outline-none border-t border-gray-300"
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id == value
                  );

                  setSubCategoryData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, categoryDetails],
                    };
                  });
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

          <button
            type="submit"
            disabled={
              !subCategoryData?.name ||
              !subCategoryData?.image ||
              !subCategoryData?.category[0]
            }
            className={`w-full py-3 rounded-lg font-semibold transition-all
              ${
                subCategoryData?.name &&
                subCategoryData?.image &&
                subCategoryData?.category[0]
                  ? "bg-primary-200 text-white hover:bg-primary-300"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }    
            `}
          >
            Create Sub Category
          </button>
        </form>
      </div>
    </section>
  );
}

UploadSubCategoryModel.propTypes = {
  close: PropTypes.func,
  fetchData: PropTypes.func,
};
