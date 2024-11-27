import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const params = new URLSearchParams(location.search);
  const [searchText, setSearchText] = useState(params.get("q") || "");

  useEffect(() => {
    setIsSearchPage(location.pathname === "/search");
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] relative">
      <div className="w-full h-11 lg:h-12 rounded-full border bg-white shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center text-neutral-600 focus-within:border-primary-200 focus-within:ring-2 focus-within:ring-primary-100">
        <div>
          {isMobile && isSearchPage ? (
            <Link
              to={"/"}
              className="flex justify-center items-center h-full p-2 m-1 hover:text-primary-200 transition-colors duration-200"
              aria-label="Back"
            >
              <FaArrowLeft size={20} />
            </Link>
          ) : (
            <button
              className="flex justify-center items-center h-full p-3 hover:text-primary-200 transition-colors duration-200"
              aria-label="Search"
            >
              <IoSearch size={22} />
            </button>
          )}
        </div>
        <div className="w-full h-full">
          {!isSearchPage ? (
            <div
              onClick={redirectToSearchPage}
              className="w-full h-full flex items-center cursor-pointer hover:text-primary-200 transition-colors duration-200"
              aria-label="Redirect to search"
            >
              <TypeAnimation
                sequence={[
                  'Search "milk"',
                  1000,
                  'Search "bread"',
                  1000,
                  'Search "sugar"',
                  1000,
                  'Search "paneer"',
                  1000,
                  'Search "chocolate"',
                  1000,
                  'Search "curd"',
                  1000,
                  'Search "rice"',
                  1000,
                  'Search "egg"',
                  1000,
                  'Search "chips"',
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-gray-400"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center">
              <input
                type="text"
                placeholder="Search for atta, dal and more..."
                autoFocus
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="bg-transparent w-full h-full outline-none px-2 placeholder:text-gray-400"
              />
              {searchText && (
                <button
                  onClick={() => setSearchText("")}
                  className="p-2 hover:text-red-500 transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <span className="text-lg">×</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Optional: Add a subtle animation when focusing */}
      <div className="absolute inset-0 rounded-full bg-primary-50 opacity-0 focus-within:opacity-10 transition-opacity duration-200 -z-10"></div>
    </div>
  );
};

export default Search;
