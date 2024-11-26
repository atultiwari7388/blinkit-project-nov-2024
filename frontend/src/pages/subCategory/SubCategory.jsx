import { useState } from "react";
import UploadSubCategoryModel from "../../components/UploadSubCategoryModel";

export default function SubCategory() {
  const [openUploadSubCategory, setOpenUploadSubCategory] = useState(false);

  return (
    <section className="">
      <div className="p-4 bg-white shadow-lg rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-800">Sub Categories</h2>
        </div>
        <button
          onClick={() => setOpenUploadSubCategory(true)}
          className="px-4 py-2 bg-primary-200 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
        >
          <span className="text-lg">+</span>
          Add Sub Category
        </button>
      </div>

      {openUploadSubCategory && (
        <UploadSubCategoryModel
          close={() => setOpenUploadSubCategory(false)}
          fetchData={() => {}}
        />
      )}
    </section>
  );
}
