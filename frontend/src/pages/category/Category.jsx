import { useState } from "react";
import UploadCategoryModel from "../../components/UploadCategoryModel";

export default function Category() {
  const [openUploadCategoryModel, setOpenUploadCategoryModel] = useState(false);

  return (
    <section>
      <div className="p-2 bg-white shadow-md rounded-lg flex justify-between items-center">
        <h2 className="font-semibold">Category</h2>
        <button
          onClick={() => setOpenUploadCategoryModel(true)}
          className="bg-primary-200 text-white px-3 py-1 rounded-lg"
        >
          Add Catgory
        </button>
      </div>

      {openUploadCategoryModel && (
        <UploadCategoryModel close={() => setOpenUploadCategoryModel(false)} />
      )}
    </section>
  );
}
