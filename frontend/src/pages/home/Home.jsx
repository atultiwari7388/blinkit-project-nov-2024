export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Slider Section */}
      <section className="w-full">
        <div className="h-[300px] bg-gray-200 rounded-lg flex items-center justify-center">
          Slider Component Here
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Shop By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Sample category items */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center"
            >
              Category {item}
            </div>
          ))}
        </div>
      </section>

      {/* Offers Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample offer cards */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md p-4">
              <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
              <h3 className="font-semibold">Special Offer {item}</h3>
              <p className="text-gray-600">Save up to 50% off</p>
            </div>
          ))}
        </div>
      </section>

      {/* Favorites Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Favorites</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Sample favorite items */}
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md p-4">
              <div className="aspect-square bg-gray-200 rounded-lg mb-2"></div>
              <h3 className="font-medium">Product {item}</h3>
              <p className="text-gray-600">$99.99</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
