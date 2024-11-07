import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Orders = () => {
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title title1={"MY"} title2={"ORDERS"} />
      </div>

      <div>
        <div className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-6 text-sm">
            <img className="w-16 sm:w-20" src={assets.banner} alt="" />
            <div>
              <p className="sm:text-base font-medium">Product Name</p>
              <div className="flex items-center gap-3 mt-2 text-base">
                <p className="text-lg">$38.00</p>
                <p>Quanity: 1</p>
                <p>Size: S</p>
              </div>
              <p className="mt-2">
                Date: <span className="text-gray-400">7, November 2024</span>
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-between">
            <div className="flex items-center gap-2">
              <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
              <p className="text-sm md:text-base">Ready to Ship</p>
            </div>

            <button className="border px-4 py-2 text-sm font-medium rounded-sm">
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
