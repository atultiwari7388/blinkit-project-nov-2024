import { FaShoppingCart } from "react-icons/fa";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import useMobile from "../hooks/useMobile";
import { GrCart } from "react-icons/gr";

export default function Header() {
  const [isMobile] = useMobile();

  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <header className="h-24 lg:h-20 shadow-md sticky top-0 flex flex-col justify-center gap-1 bg-gradient-to-r from-primary-500 to-primary-200">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-4 justify-between">
          {/** Logo Section */}
          <div className="h-full flex items-center">
            <Link to={`/`} className="flex items-center space-x-2">
              <FaShoppingCart className="text-5xl transform transition-all hover:scale-110" />
              <div className="font-semibold">
                <span className="text-2xl">O</span>
                <span className="text-xl font-bold">ne</span>
                <span className="text-2xl">S</span>
                <span className="text-xl">hop</span>
              </div>
            </Link>
          </div>

          {/** Search Bar */}
          <div className="hidden lg:block">
            <Search />
          </div>

          {/** User and Cart Section */}
          <div className="flex items-center gap-5">
            {/** Profile icon for mobile */}
            <button className="lg:hidden text-white">
              <CgProfile size={26} />
            </button>

            {/** Login and Cart buttons for desktop */}
            <div className="hidden lg:flex items-center gap-6">
              <button
                onClick={redirectToLoginPage}
                className="text-lg px-4 py-2 transition-colors hover:text-gray-300"
              >
                Login
              </button>
              <button className="flex items-center gap-2 bg-primary-200 hover:bg-gray-950 px-4 py-3 rounded-lg text-white shadow-lg transition-transform transform hover:scale-105">
                <GrCart size={24} className="animate-bounce" />
                <p className="font-semibold">My Cart</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/** Mobile Search Bar */}
      <div className="container mx-auto px-4 lg:hidden mt-2">
        <Search />
      </div>
    </header>
  );
}
