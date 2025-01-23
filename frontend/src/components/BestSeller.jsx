import React from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import Loading from "./Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BestSeller = () => {
  const fetchBestSeller = async () => {
    const response = await axios.get(
      `https://ecommerce-backend-ten-wheat.vercel.app//api/product/best-seller`
    );
    return response.data.products;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["best-seller"],
    queryFn: fetchBestSeller,
  });

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl ">
        <Title title1="BEST" title2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the.
        </p>
      </div>
      {isLoading && <Loading />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {data?.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
