import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useMobile from "../hooks/useMobile";
import { GrCart } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserMenu from "./UserMenu";

export default function Header() {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchPage = location.pathname === "/search";
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const redirectToLoginPage = () => {
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleCloseUser = () => {
    setOpenUserMenu(false);
  };

  const handleMobileUser = () => {
    if (!user._id) {
      navigate("/login");
      return;
    }
    navigate("/user");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 mx-2 mt-2 rounded-xl border border-base-300 bg-bg-dark backdrop-blur-sm shadow-lg"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/** Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaShoppingCart className="text-3xl md:text-4xl text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-semibold hidden sm:block"
              >
                <span className="text-xl md:text-2xl bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
                  One
                </span>
                <span className="text-xl md:text-2xl bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
                  Shop
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/** Search Bar - Only visible on desktop */}
          <div className="hidden lg:block flex-1 mx-8">
            <Search />
          </div>

          {/** Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {user?._id ? (
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div
                  onClick={() => setOpenUserMenu((prev) => !prev)}
                  className="flex items-center gap-2 cursor-pointer select-none text-white hover:text-white"
                >
                  <span>Account</span>
                  <motion.span animate={{ rotate: openUserMenu ? 180 : 0 }}>
                    ▼
                  </motion.span>
                </div>

                {openUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-12"
                  >
                    <div className="bg-white rounded-lg p-4 min-w-52 shadow-xl">
                      <UserMenu close={handleCloseUser} />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={redirectToLoginPage}
                className="text-lg px-4 py-2 text-white hover:text-white transition-colors"
              >
                Login
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gradient-to-r from-primary-500 to-primary-200 px-6 py-3 rounded-lg text-white shadow-lg"
            >
              <GrCart size={24} className="animate-bounce" />
              <span className="font-semibold">My Cart</span>
            </motion.button>
          </div>

          {/** Mobile Navigation - Simplified */}
          <div className="flex lg:hidden items-center">
            {user?._id ? (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMobileUser}
                className="text-white px-4 py-2"
              >
                Account
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={redirectToLoginPage}
                className="text-white px-4 py-2"
              >
                Login
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
