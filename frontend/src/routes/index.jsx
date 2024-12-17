import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SearchPage from "../pages/search/Search";
import LoginPage from "../pages/login/LoginPage";
import RegisterPage from "../pages/register/RegisterPage";
import ForgotPassword from "../pages/forgotPassword/ForgotPassword";
import OtpVerification from "../pages/otpVerification/OtpVerification";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import UserMenuMobile from "../pages/userMenuMobile/UserMenuMobile";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/profile/Profile";
import MyOrders from "../pages/myOrders/MyOrders";
import Addressess from "../pages/addresses/Addressess";
import Category from "../pages/category/Category";
import SubCategory from "../pages/subCategory/SubCategory";
import UploadProduct from "../pages/uploadProduct/UploadProduct";
import AdminProduct from "../pages/adminProduct/AdminProduct";
import AdminPermission from "../layout/AdminPermission";
import ProductListPage from "../pages/productListPage/ProductListPage";
import Home from "../pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verification-otp",
        element: <OtpVerification />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "user",
        element: <UserMenuMobile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myorders",
            element: <MyOrders />,
          },
          {
            path: "addressess",
            element: <Addressess />,
          },
          {
            path: "category",
            element: (
              <AdminPermission>
                <Category />
              </AdminPermission>
            ),
          },
          {
            path: "subcategory",
            element: (
              <AdminPermission>
                <SubCategory />
              </AdminPermission>
            ),
          },
          {
            path: "upload-product",
            element: (
              <AdminPermission>
                <UploadProduct />
              </AdminPermission>
            ),
          },
          {
            path: "product",
            element: (
              <AdminPermission>
                <AdminProduct />
              </AdminPermission>
            ),
          },
        ],
      },

      {
        path: ":category",
        children: [
          {
            path: ":subCategory",
            element: <ProductListPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
