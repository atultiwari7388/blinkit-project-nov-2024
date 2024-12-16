import { useSelector } from "react-redux";

export default function Home() {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);

  const handleRedirectProductListpage = async () => {};

  return (
    <section className="bg-white">
      {/** Shop by Category */}
      <div className="container mx-auto">
        <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10  gap-2">
          {loadingCategory
            ? new Array(12).fill(null).map((c, index) => {
                return (
                  <div
                    key={index + "loadingcategory"}
                    className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
                  >
                    <div className="bg-blue-100 min-h-24 rounded"></div>
                    <div className="bg-blue-100 h-8 rounded"></div>
                  </div>
                );
              })
            : categoryData.map((cat) => {
                return (
                  <div
                    key={cat._id + "displayCategory"}
                    className="w-full h-full"
                    onClick={() =>
                      handleRedirectProductListpage(cat._id, cat.name)
                    }
                  >
                    <div>
                      <img
                        src={cat.image}
                        className="w-full h-full object-scale-down"
                      />
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}
