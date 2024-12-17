import propTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../utils/axios";
import SummaryApi from "../common/Api";
import AxiosToastError from "../utils/AxiosToastError";
import CardLoading from "./CardLoading";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { valideURLConvert } from "../utils/validUrlConverter";
import { useSelector } from "react-redux";
import CardProduct from "./CardProduct";

export default function CategoryWiseProductDisplay({ id, name }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingCardNumber = new Array(6).fill(null);
  const containerRef = useRef();
  const subCategoryData = useSelector((state) => state.product.allSubCategory);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
        console.log("Data :", responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  const handleRedirectProductListpage = () => {
    const subcategory = subCategoryData.find((sub) => {
      const filterData = sub.category.some((c) => {
        return c._id == id;
      });

      return filterData ? true : null;
    });
    const url = `/${valideURLConvert(name)}-${id}/${valideURLConvert(
      subcategory?.name
    )}-${subcategory?._id}`;

    return url;
  };

  const redirectURL = handleRedirectProductListpage();

  return (
    <div className="bg-gradient-to-br from-white to-green-50 py-6 rounded-xl shadow-sm">
      <div className="container mx-auto px-6 flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-primary-200 rounded-full"></div>
          <h3 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-primary-200 to-primary-100 bg-clip-text text-transparent">
            {name}
          </h3>
        </div>
        <Link
          to={redirectURL}
          className="px-4 py-2 rounded-full bg-primary-200 text-white font-medium hover:bg-primary-100 transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          View All Products →
        </Link>
      </div>
      <div className="relative flex items-center">
        <div
          className="flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-6 overflow-x-scroll scrollbar-none scroll-smooth"
          ref={containerRef}
        >
          {loading &&
            loadingCardNumber.map((_, index) => {
              return (
                <CardLoading key={"CategorywiseProductDisplay123" + index} />
              );
            })}

          {data.map((p, index) => {
            return (
              <CardProduct
                data={p}
                key={p._id + "CategorywiseProductDisplay" + index}
              />
            );
          })}
        </div>
        <div className="w-full left-0 right-0 container mx-auto px-4 absolute hidden lg:flex justify-between">
          <button
            onClick={handleScrollLeft}
            className="z-10 relative bg-primary-200 hover:bg-secondary-100 hover:text-white shadow-lg text-xl p-3 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <FaAngleLeft className="text-white" />
          </button>
          <button
            onClick={handleScrollRight}
            className="z-10 relative bg-primary-200 hover:bg-secondary-100 hover:text-white shadow-lg text-xl p-3 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <FaAngleRight className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

CategoryWiseProductDisplay.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};
