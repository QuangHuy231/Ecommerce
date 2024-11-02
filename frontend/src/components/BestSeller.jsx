import React from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { useProductStore } from "../store/productStore";

const BestSeller = () => {
  const { bestSeller } = useProductStore();
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl ">
        <Title title1="BEST" title2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {bestSeller.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
