import { useState } from "react";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../common/Api";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

export default function ProductCardAdmin({ data, fetchProductData }) {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleDeleteCancel = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: {
          _id: data._id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchProductData) {
          fetchProductData();
        }
        setOpenDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="w-36 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative group">
        <img
          src={data?.image[0]}
          alt={data?.name}
          className="w-full h-32 object-contain rounded-md"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-md"></div>
      </div>
      <div className="mt-3">
        <p className="text-ellipsis line-clamp-2 font-semibold text-gray-800 hover:text-primary-600 transition-colors duration-200">
          {data?.name}
        </p>
        <p className="text-slate-500 text-sm mt-1">{data?.unit}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 py-3 mt-2">
        <button
          onClick={() => setEditOpen(true)}
          className="border-2 px-2 py-1.5 text-sm border-green-500 bg-green-50 text-green-700 hover:bg-green-500 hover:text-white rounded-md transition-all duration-300 font-medium"
        >
          Edit
        </button>
        <button
          onClick={() => setOpenDelete(true)}
          className="border-2 px-2 py-1.5 text-sm border-red-500 bg-red-50 text-red-700 hover:bg-red-500 hover:text-white rounded-md transition-all duration-300 font-medium"
        >
          Delete
        </button>
      </div>

      {/* {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data={data}
          close={() => setEditOpen(false)}
        />
      )} */}

      {openDelete && (
        <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-800 z-50 bg-opacity-80 p-4 flex justify-center items-center backdrop-blur-sm">
          <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-2xl transform transition-all duration-300">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-bold text-xl text-gray-800">
                Confirm Deletion
              </h3>
              <button
                onClick={() => setOpenDelete(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <IoClose size={24} className="text-gray-600" />
              </button>
            </div>
            <p className="my-4 text-gray-600">
              Are you sure you want to permanently delete this item? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

ProductCardAdmin.propTypes = {
  data: PropTypes.object.isRequired,
  fetchProductData: PropTypes.func.isRequired,
};
