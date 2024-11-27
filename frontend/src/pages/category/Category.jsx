import { useEffect, useState } from "react";
import UploadCategoryModel from "../../components/UploadCategoryModel";
import AxiosToastError from "../../utils/AxiosToastError";
import NoDataFound from "../../utils/NoDataFound";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/Api";
import { LoadingIndicator } from "../../utils/LoadinIndicator";
import toast from "react-hot-toast";
import EditCategory from "../../components/EditCategory";
import CofirmBox from "../../components/ConfirmBox";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";

export default function Category() {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: "",
  });
  const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  });

  const allCategory = useSelector((state) => state.product.allCategory);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setCategoryData(responseData.data);
      }
    } catch (error) {
      return AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCategoryData(allCategory);
  }, [allCategory]);

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        // fetchCategory();
        setCategoryData(allCategory);
        setOpenConfirmBoxDelete(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="">
      <div className="mb-8 p-6 bg-white shadow-md rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-1 bg-primary-200 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
        </div>
        <button
          onClick={() => setOpenUploadCategory(true)}
          className="px-5 py-2.5 bg-primary-200 hover:bg-primary-200 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 hover:shadow-lg"
        >
          <FaPlus size={16} />
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoDataFound />}
      <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categoryData.map((category) => {
          return (
            <div className="w-32 h-56 rounded shadow-md" key={category._id}>
              <img
                alt={category.name}
                src={category.image}
                className="w-full object-scale-down"
              />
              <div className="items-center h-9 flex gap-2">
                <button
                  onClick={() => {
                    setOpenEdit(true);
                    setEditData(category);
                  }}
                  className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setOpenConfirmBoxDelete(true);
                    setDeleteCategory(category);
                  }}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {loading && <LoadingIndicator />}

      {openUploadCategory && (
        <UploadCategoryModel
          fetchData={fetchCategory}
          close={() => setOpenUploadCategory(false)}
        />
      )}

      {openEdit && (
        <EditCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchCategory}
        />
      )}

      {openConfimBoxDelete && (
        <CofirmBox
          close={() => setOpenConfirmBoxDelete(false)}
          cancel={() => setOpenConfirmBoxDelete(false)}
          confirm={handleDeleteCategory}
        />
      )}
    </section>
  );
}
