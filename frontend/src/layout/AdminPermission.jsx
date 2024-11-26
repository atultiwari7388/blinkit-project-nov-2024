import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";
import PropTypes from "prop-types";

export default function AdminPermission({ children }) {
  const user = useSelector((state) => state.user);

  return (
    <>
      {isAdmin(user.role) ? (
        children
      ) : (
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="text-center p-8 bg-red-50 rounded-lg shadow-md max-w-md">
            <svg
              className="w-16 h-16 text-red-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-red-700 mb-2">
              Access Denied
            </h2>
            <p className="text-red-600">
              Sorry, you don&apos;t have permission to access this area.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

AdminPermission.propTypes = {
  children: PropTypes.node.isRequired,
};
