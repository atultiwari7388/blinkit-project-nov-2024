import PropTypes from "prop-types";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export default function UploadCategoryModel({ close }) {
  const [data, setData] = useState({
    name: "",
    image: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="fixed inset-0 p-4 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white max-w-4xl w-full p-6 rounded-xl shadow-2xl transform transition-all">
        <div className="flex items-center justify-between border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800">Add New Category</h1>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose size={24} className="text-gray-600" />
          </button>
        </div>

        <form className="my-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              id="categoryName"
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
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-200 focus:border-transparent outline-none transition-all duration-200 bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Category Image</p>
            <div className="flex gap-6 flex-col lg:flex-row items-center">
              <div className="border-2 border-dashed border-gray-300 bg-gray-50 h-48 w-full lg:w-48 rounded-xl overflow-hidden flex items-center justify-center transition-all hover:border-primary-200">
                {data.image ? (
                  <img
                    alt="category"
                    src={data.image}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <p className="text-sm text-gray-500">No image uploaded</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Recommended size: 400x400px
                    </p>
                  </div>
                )}
              </div>

              <label htmlFor="uploadCategoryImage" className="w-full lg:w-auto">
                <div
                  className={`
                    ${
                      !data.name
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-primary-200 hover:bg-primary-50 cursor-pointer"
                    }
                    px-6 py-3 rounded-lg border-2 border-current font-medium transition-all duration-200 text-center
                  `}
                >
                  {data.image ? "Change Image" : "Upload Image"}
                </div>

                <input
                  disabled={!data.name}
                  type="file"
                  id="uploadCategoryImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={`
              w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200
              ${
                data.name && data.image
                  ? "bg-primary-200 hover:bg-primary-100 transform hover:-translate-y-0.5"
                  : "bg-gray-200 cursor-not-allowed"
              }
            `}
          >
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
}

UploadCategoryModel.propTypes = {
  close: PropTypes.func,
};
