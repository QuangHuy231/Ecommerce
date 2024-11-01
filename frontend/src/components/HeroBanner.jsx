import React from "react";
import { assets } from "../assets/assets";

const HeroBanner = () => {
  return (
    <div className="flex sm:flex-row flex-col rounded-2xl shadow-banner my-10">
      {/* Left Banner */}
      <div className="flex items-center justify-center w-full sm:w-1/2 py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 sm:w-12 h-0.5 bg-[#414141]"></p>
            <p className="font-medium text-sm sm:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="prata-regular text-xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm sm:text-base">SHOP NOW</p>
            <p className="w-8 sm:w-12 h-0.5 bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Right Banner */}
      <img
        src={assets.banner}
        alt="banner-image"
        className="w-full sm:w-1/2 rounded-r-2xl"
      />
    </div>
  );
};

export default HeroBanner;
