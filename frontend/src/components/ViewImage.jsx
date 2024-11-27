import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";

const ViewImage = ({ url, close }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all">
        <div className="p-4 flex justify-between items-center border-b">
          <h3 className="text-lg font-medium text-gray-900">Image Preview</h3>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close preview"
          >
            <IoClose size={24} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <div className="p-6">
          <img
            src={url}
            alt="Preview"
            className="w-full h-full object-contain rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      </div>
    </div>
  );
};

ViewImage.propTypes = {
  url: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default ViewImage;
