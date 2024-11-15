import UserMenu from "../../components/UserMenu";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function UserMenuMobile() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary-500 to-primary-200">
      <div className="container mx-auto px-4 py-8">
        <button
          className="absolute top-6 right-6 w-fit ml-auto text-white hover:text-gray-200 transition-colors"
          onClick={handleBack}
        >
          <MdClose size={24} />
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-6">
            <div className="relative">
              <FaUserCircle className="text-6xl text-primary-500" />
              {user?._id && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">
                {user?.name || "Guest User"}
              </h1>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
            <UserMenu />
          </div>
        </div>
      </div>
    </section>
  );
}
