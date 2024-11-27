import { useEffect, useState } from "react";
import AxiosToastError from "../../utils/AxiosToastError";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/Api";
import { LoadingIndicator } from "../../utils/LoadinIndicator";
import { IoSearchOutline } from "react-icons/io5";
import ProductCardAdmin from "../../components/ProductCardAdmin";

export default function AdminProduct() {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          // Only include search if it's not empty to avoid text index error
          ...(search && {
            search: search,
          }),
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPage);
        setProductData(responseData.data);
      }
    } catch (error) {
      return AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleNext = () => {
    if (page !== totalPageCount) {
      setPage((preve) => preve + 1);
    }
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage((preve) => preve - 1);
    }
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    let flag = true;

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 300);

    return () => {
      clearTimeout(interval);
    };
  }, [search]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="p-4 bg-white shadow-lg rounded-lg m-4">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Product Management
          </h2>
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IoSearchOutline className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-transparent bg-white shadow-sm transition duration-200"
              value={search}
              onChange={handleOnChange}
            />
          </div>
        </div>
      </div>

      {loading && <LoadingIndicator />}

      <div className="p-6">
        <div className="min-h-[60vh] bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {productData.map((p, index) => (
              <ProductCardAdmin
                key={index}
                data={p}
                fetchProductData={fetchProductData}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handlePrevious}
            disabled={page <= 1}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              page <= 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-primary-600 hover:bg-primary-50 shadow-sm hover:shadow"
            }`}
          >
            Previous
          </button>
          <div className="flex items-center px-6 py-2 bg-white rounded-lg shadow-sm">
            <span className="font-medium text-gray-700">
              Page {page} of {totalPageCount}
            </span>
          </div>
          <button
            onClick={handleNext}
            disabled={page >= totalPageCount}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              page >= totalPageCount
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-primary-600 hover:bg-primary-50 shadow-sm hover:shadow"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
