import { FaShoppingCart } from "react-icons/fa";
import Search from "./Search";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-20 shadow-md sticky top-0">
      <div className="container mx-auto items-center flex h-full px-2 justify-between">
        {/** Logo Section start */}
        <Link to={`/`} className="flex items-center justify-center ">
          <FaShoppingCart className="text-primary-200 text-5xl transform transition-all hover:scale-110" />
          <div className="font-semibold text-primary-200">
            <span className="text-2xl">O</span>
            <span className="text-xl font-bold">ne</span>
            <span className="text-2xl">S</span>
            <span className="text-xl">hop</span>
          </div>
        </Link>
        {/** Logo Section end */}

        {/** Search */}
        <div>
          <Search />
        </div>
        {/** Login and my cart */}
        <div>Login and my cart</div>
      </div>
    </header>
  );
}
