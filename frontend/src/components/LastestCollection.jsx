import React from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LastestCollection = () => {
  return (
    <div>
      <div className="text-center py-8 text-3xl">
        <Title title1="LATEST" title2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-6">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
};

export default LastestCollection;
