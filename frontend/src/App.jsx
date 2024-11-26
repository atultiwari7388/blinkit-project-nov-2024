import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./reduxStores/userSlice";
import { useDispatch } from "react-redux";
import AxiosToastError from "./utils/AxiosToastError";
import { setAllCategory, setLoadingCategory } from "./reduxStores/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./common/Api";

export default function App() {
  const dispatch = useDispatch();

  //fetch user details
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    if (userData) {
      dispatch(setUserDetails(userData.data));
      console.log("UserData", userData.data);
    } else {
      console.log("User not authenticated or error occurred.");
    }
  };

  //fetch category
  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(
          setAllCategory(
            responseData.data.sort((a, b) => a.name.localeCompare(b.name))
          )
        );
      }
    } catch (error) {
      return AxiosToastError(error);
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[78vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
