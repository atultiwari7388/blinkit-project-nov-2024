import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";

export default function CofirmBox({ cancel, confirm, close }) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800/70 p-4 flex justify-center items-center backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg transform transition-all duration-300 scale-100 hover:scale-[1.02]">
        <div className="flex justify-between items-center gap-3 border-b pb-3">
          <h1 className="text-xl font-bold text-gray-800">Permanent Delete</h1>
          <button
            onClick={close}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <IoClose size={25} className="text-gray-600" />
          </button>
        </div>
        <p className="my-6 text-gray-600 text-lg">
          Are you sure you want to permanently delete this item?
        </p>
        <div className="w-fit ml-auto flex items-center gap-4">
          <button
            onClick={cancel}
            className="px-6 py-2 rounded-lg border-2 border-red-500 text-red-500 font-medium hover:bg-red-500 hover:text-white transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={confirm}
            className="px-6 py-2 rounded-lg border-2 border-green-600 text-green-600 font-medium hover:bg-green-600 hover:text-white transition-colors duration-300"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

CofirmBox.propTypes = {
  cancel: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
};
