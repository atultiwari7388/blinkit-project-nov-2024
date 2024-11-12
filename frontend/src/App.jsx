import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";

export default function App() {
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    console.log("UserDate", userData.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
