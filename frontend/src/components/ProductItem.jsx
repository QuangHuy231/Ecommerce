import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import Rating from "./Rating";

const ProductItem = () => {
  const handleAddToCart = () => {};
  return (
    <div>
      <div className=" w-full  bg-white border border-gray-200 rounded-lg shadow-product hover:border-pink-300">
        <NavLink to={"/product"} className="overflow-hidden">
          <img
            className="rounded-t-lg max-h-30 sm:max-h-40 md:max-h-60 w-full object-fill"
            src={assets.apple_watch}
            alt="product image"
          />
        </NavLink>
        <div className="p-1 sm:p-5">
          <NavLink to={"/product"}>
            <h5 className="text-lg font-medium  text-gray-900 ">
              Kid Tapered Slim Fit Trouser
            </h5>
          </NavLink>
          <Rating />
          <div className="flex items-center justify-between">
            <span className="text-xl sm:text-2xl  font-bold text-gray-900">
              $599
            </span>
            <button
              onClick={handleAddToCart}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2  py-2.5  text-center "
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
