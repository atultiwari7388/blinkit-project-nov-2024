import { FaShoppingCart } from "react-icons/fa";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import useMobile from "../hooks/useMobile";

export default function Header() {
  const [isMobile] = useMobile();

  const location = useLocation();
  const isSearchPage = location.pathname === "/search";

  return (
    <header className="h-24 lg:h-20 shadow-md sticky top-0 flex flex-col justify-center gap-1">
      {!(isSearchPage && isMobile) && (
        <div className="container mx-auto flex items-center px-2 justify-between">
          {/** Logo Section start */}
          <div className="h-full">
            <Link to={`/`} className="h-full flex items-center justify-center ">
              <FaShoppingCart className="text-primary-200 text-5xl transform transition-all hover:scale-110" />
              <div className="font-semibold text-primary-200">
                <span className="text-2xl">O</span>
                <span className="text-xl font-bold">ne</span>
                <span className="text-2xl">S</span>
                <span className="text-xl">hop</span>
              </div>
            </Link>
          </div>
          {/** Logo Section end */}

          {/** Search */}
          <div className="hidden lg:block">
            <Search />
          </div>
          {/** Login and my cart */}
          <div className="">
            <button className="text-primary-200 lg:hidden">
              <CgProfile size={26} />
            </button>
            <div className="hidden lg:block">Login and mycart</div>
          </div>
        </div>
      )}

      {/** mobile responsive search bar */}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
}
