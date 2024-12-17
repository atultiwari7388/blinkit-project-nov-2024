import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { valideURLConvert } from "../utils/validUrlConverter";
import { DisplayPriceInRupees } from "../utils/DisplayPriceIn";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import AddToCartBtn from "./AddToCartBtn";

export default function CardProduct({ data }) {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`;

  return (
    <Link
      to={url}
      className="border hover:shadow-lg transition-all duration-300 py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded-lg cursor-pointer bg-white relative group"
    >
      {Boolean(data.discount) && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          {data.discount}% OFF
        </div>
      )}

      <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
        <img
          src={data.image[0]}
          className="w-full h-full object-scale-down lg:scale-125"
          alt={data.name}
        />
      </div>

      <div className="flex items-center gap-2 mt-2">
        <div className="rounded-full text-xs font-medium px-3 py-1 text-green-600 bg-green-50 flex items-center">
          <span className="mr-1">🚚</span> 10 min
        </div>
      </div>

      <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2 hover:text-green-600 transition-colors">
        {data.name}
      </div>

      <div className="w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base text-gray-600">
        {data.unit}
      </div>

      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base mt-2">
        <div className="flex flex-col">
          <div className="font-bold text-lg text-green-600">
            {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
          </div>
          {Boolean(data.discount) && (
            <div className="text-gray-400 line-through text-sm">
              {DisplayPriceInRupees(data.price)}
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          {data.stock == 0 ? (
            <p className="text-red-500 font-medium bg-red-50 px-3 py-1 rounded-full text-sm">
              Out of stock
            </p>
          ) : (
            <AddToCartBtn data={data} />
          )}
        </div>
      </div>
    </Link>
  );
}

CardProduct.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    discount: PropTypes.number,
    unit: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};
