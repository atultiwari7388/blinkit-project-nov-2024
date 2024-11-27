import { useEffect, useState } from "react";
import UploadSubCategoryModel from "../../components/UploadSubCategoryModel";
import AxiosToastError from "../../utils/AxiosToastError";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/Api";
import DisplayTable from "../../components/DisplayTable";
import { createColumnHelper } from "@tanstack/react-table";
import { MdDelete } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";
import ViewImage from "../../components/ViewImage";
import EditSubCategory from "../../components/EditSubCategory";
import { LoadingIndicator } from "../../utils/LoadinIndicator";
import toast from "react-hot-toast";
import CofirmBox from "../../components/ConfirmBox";

export default function SubCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [ImageURL, setImageURL] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
  });

  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: "",
  });
  const [openDeleteConfirmBox, setOpenDeleteConfirmBox] = useState(false);

  const columnHelper = createColumnHelper();

  const fetchSubCategory = async () => {
    try {
      setIsLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        console.log(responseData.data);
        setSubCategoryData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setOpenDeleteConfirmBox(false);
        setDeleteSubCategory({ _id: "" });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const column = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium text-gray-700">{row.original.name}</span>
      ),
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="flex justify-center items-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className="w-12 h-12 rounded-lg object-cover shadow-sm hover:scale-150 transition-transform duration-300 cursor-pointer"
              onClick={() => {
                setImageURL(row.original.image);
              }}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap gap-2">
            {row.original.category.map((c) => {
              return (
                <span
                  key={c._id + "table"}
                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium shadow-sm"
                >
                  {c.name}
                </span>
              );
            })}
          </div>
        );
      },
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setOpenEdit(true);
                setEditData(row.original);
              }}
              className="p-2.5 bg-green-50 rounded-full hover:bg-green-100 text-green-600 hover:text-green-700 transition-colors duration-200"
              title="Edit"
            >
              <HiPencil size={18} />
            </button>
            <button
              onClick={() => {
                setOpenDeleteConfirmBox(true);
                setDeleteSubCategory(row.original);
              }}
              className="p-2.5 bg-red-50 rounded-full hover:bg-red-100 text-red-500 hover:text-red-600 transition-colors duration-200"
              title="Delete"
            >
              <MdDelete size={18} />
            </button>
          </div>
        );
      },
    }),
  ];

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <section className="">
      <div className="mb-8 p-6 bg-white shadow-md rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-1 bg-primary-200 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Sub Categories</h2>
        </div>
        <button
          onClick={() => setOpenUploadSubCategory(true)}
          className="px-5 py-2.5 bg-primary-200 hover:bg-primary-200 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 hover:shadow-lg"
        >
          <FaPlus size={16} />
          Add Sub Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <DisplayTable data={subCategoryData} column={column} />
      </div>

      {openUploadSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenUploadSubCategory(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {ImageURL && <ViewImage url={ImageURL} close={() => setImageURL("")} />}

      {openEdit && (
        <EditSubCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchSubCategory}
        />
      )}

      {openDeleteConfirmBox && (
        <CofirmBox
          cancel={() => setOpenDeleteConfirmBox(false)}
          close={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
}
