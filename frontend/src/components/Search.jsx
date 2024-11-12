import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsPage] = useState(false);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-10 rounded-full border overflow-hidden flex items-center text-neutral-700 bg-slate-50 group focus-within:border-primary-200">
      <button className="flex justify-center items-center h-full p-3 group-focus-within:text-primary-200">
        <IoSearchOutline size={20} />
      </button>

      <div className="w-full h-full">
        {!isSearchPage ? (
          //not in search page
          <div
            onClick={redirectToSearchPage}
            className="w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1000,
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "panner"',
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
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for atta dal and more"
              autoFocus
              className="bg-transparent w-full h-full outline-none py-2"
            />
          </div>
        )}
      </div>
    </div>
  );
}
