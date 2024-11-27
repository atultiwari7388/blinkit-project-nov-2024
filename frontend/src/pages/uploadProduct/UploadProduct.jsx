import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import uploadImage from "../../utils/UploadImage";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import ViewImage from "../../components/ViewImage";
import AddFieldComponent from "../../components/AddFieldComponent";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/Api";
import AxiosToastError from "../../utils/AxiosToastError";
import successToast from "../../utils/SuccessToast";
import { HashLoader } from "react-spinners";

export default function UploadProduct() {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };
  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        successToast(responseData.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 bg-white shadow-lg rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-1 bg-primary-200 rounded-full"></div>
            <h2 className="text-2xl font-bold text-text-dark">
              Add New Product
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg">
          <form
            className="p-8 space-y-8 max-w-4xl mx-auto"
            onSubmit={handleSubmit}
          >
            {/* Product Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-lg font-semibold text-gray-700"
              >
                Product Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter product name"
                name="name"
                value={data.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:bg-bg-border focus:ring-2 focus:ring-bg-border outline-none transition duration-200"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-lg font-semibold text-gray-700"
              >
                Product Description
              </label>
              <textarea
                id="description"
                placeholder="Enter product description"
                name="description"
                value={data.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:bg-bg-border focus:ring-2 focus:ring-bg-border outline-none transition duration-200"
              />
            </div>

            {/* Images */}
            <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-700">
                Product Images
              </p>
              <label
                htmlFor="productImage"
                className="group relative block bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-primary-200 transition duration-200 cursor-pointer"
              >
                <div className="text-center">
                  {imageLoading ? (
                    <div className="flex items-center justify-center">
                      <HashLoader className="text-primary-200" />
                    </div>
                  ) : (
                    <>
                      <FaCloudUploadAlt className="mx-auto h-12 w-12 text-primary-200 group-hover:scale-110 transition duration-200" />
                      <p className="mt-4 font-medium text-gray-700">
                        Click to Upload Images
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        PNG, JPG up to 2MB
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="productImage"
                  className="hidden"
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.image.map((img, index) => (
                  <div
                    key={img + index}
                    className="aspect-square rounded-xl overflow-hidden shadow-md group relative"
                  >
                    <img
                      src={img}
                      alt={img}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                      onClick={() => setViewImageURL(img)}
                    />
                    <div
                      onClick={() => handleDeleteImage(index)}
                      className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200"
                    >
                      <MdDelete className="text-white text-3xl hover:text-secondary-100 transition" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Main Category */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-gray-700">
                  Category
                </label>
                <select
                  className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:bg-bg-border focus:ring-2 focus:ring-bg-border outline-none transition duration-200"
                  value={selectCategory}
                  onChange={(e) => {
                    const value = e.target.value;
                    const category = allCategory.find((el) => el._id === value);
                    setData((preve) => ({
                      ...preve,
                      category: [...preve.category, category],
                    }));
                    setSelectCategory("");
                  }}
                >
                  <option value="">Select Category</option>
                  {allCategory.map((c, index) => (
                    <option key={index} value={c?._id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-2">
                  {data.category.map((c, index) => (
                    <div
                      key={c._id + index + "productsection"}
                      className="px-4 py-2 bg-primary-100/20 text-secondary-200 rounded-full flex items-center gap-2 transition duration-200 hover:bg-secondary-100/30"
                    >
                      <p className="font-medium">{c.name}</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(index)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <IoClose size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub Category */}
              <div className="space-y-4">
                <label className="text-lg font-semibold text-gray-700">
                  Sub Category
                </label>
                <select
                  className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:bg-bg-border focus:ring-2 focus:ring-bg-border outline-none transition duration-200"
                  value={selectSubCategory}
                  onChange={(e) => {
                    const value = e.target.value;
                    const subCategory = allSubCategory.find(
                      (el) => el._id === value
                    );
                    setData((preve) => ({
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory],
                    }));
                    setSelectSubCategory("");
                  }}
                >
                  <option value="">Select Sub Category</option>
                  {allSubCategory.map((c, index) => (
                    <option key={index} value={c?._id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <div className="flex flex-wrap gap-2">
                  {data.subCategory.map((c, index) => (
                    <div
                      key={c._id + index + "productsection"}
                      className="px-4 py-2 bg-purple-100 text-purple-600 rounded-full flex items-center gap-2 transition duration-200 hover:bg-purple-200"
                    >
                      <p className="font-medium">{c.name}</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveSubCategory(index)}
                        className="hover:text-red-500 transition-colors"
                      >
                        <IoClose size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label
                  htmlFor="unit"
                  className="text-lg font-semibold text-gray-700"
                >
                  Unit
                </label>
                <input
                  id="unit"
                  type="text"
                  placeholder="Enter product unit"
                  name="unit"
                  value={data.unit}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:bg-bg-border focus:ring-2 focus:ring-bg-border outline-none transition duration-200"
                />
              </div>

              <div className="space-y-4">
                <label
                  htmlFor="stock"
                  className="text-lg font-semibold text-gray-700"
                >
                  Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  placeholder="Enter product stock"
                  name="stock"
                  value={data.stock}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:bg-bg-border focus:ring-2 focus:ring-bg-border outline-none transition duration-200"
                />
              </div>
            </div>

            {/* Price Details */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label
                  htmlFor="price"
                  className="text-lg font-semibold text-gray-700"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Enter product price"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:bg-bg-border focus:ring-2 focus:ring-bg-border outline-none transition duration-200"
                />
              </div>

              <div className="space-y-4">
                <label
                  htmlFor="discount"
                  className="text-lg font-semibold text-gray-700"
                >
                  Discount
                </label>
                <input
                  id="discount"
                  type="number"
                  placeholder="Enter product discount"
                  name="discount"
                  value={data.discount}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:bg-bg-border focus:ring-2 focus:ring-bg-border outline-none transition duration-200"
                />
              </div>
            </div>

            {/* Additional Fields */}
            <div className="space-y-6">
              {Object.keys(data?.more_details)?.map((k, index) => (
                <div className="space-y-2" key={index}>
                  <label
                    htmlFor={k}
                    className="text-lg font-semibold text-gray-700"
                  >
                    {k}
                  </label>
                  <input
                    id={k}
                    type="text"
                    value={data?.more_details[k]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setData((preve) => ({
                        ...preve,
                        more_details: {
                          ...preve.more_details,
                          [k]: value,
                        },
                      }));
                    }}
                    required
                    className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:bg-bg-border focus:ring-2 focus:ring-bg-border outline-none transition duration-200"
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => setOpenAddField(true)}
                className="px-6 py-3 text-secondary-200 border-2 border-bg-border rounded-xl font-semibold hover:bg-secondary-100 hover:text-white transition duration-200"
              >
                Add More Fields
              </button>

              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-primary-100 to-primary-100 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition duration-200"
              >
                Submit Product
              </button>
            </div>
          </form>
        </div>

        {ViewImageURL && (
          <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
        )}

        {openAddField && (
          <AddFieldComponent
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
            close={() => setOpenAddField(false)}
          />
        )}
      </div>
    </section>
  );
}
