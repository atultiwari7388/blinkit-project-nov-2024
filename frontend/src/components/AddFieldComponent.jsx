import { IoClose } from "react-icons/io5";
import PropTypes from "prop-types";

export default function AddFieldComponent({ close, value, onChange, submit }) {
  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transform transition-all duration-300 scale-100 hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 bg-primary-200 rounded-full"></div>
            <h1 className="text-2xl font-bold text-text-dark">Add New Field</h1>
          </div>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <IoClose size={24} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Field Name
            </label>
            <input
              className="w-full bg-gray-50 p-4 rounded-xl border border-gray-200 focus:bg-bg-border focus:ring-2 focus:ring-bg-border outline-none transition duration-200"
              placeholder="Enter field name"
              value={value}
              onChange={onChange}
            />
          </div>

          <button
            onClick={submit}
            className="w-full py-4 bg-gradient-to-r from-primary-200 to-primary-100 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition duration-200"
          >
            Add Field
          </button>
        </div>
      </div>
    </section>
  );
}

AddFieldComponent.propTypes = {
  close: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  submit: PropTypes.func.isRequired,
};
