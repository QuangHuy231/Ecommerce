import React from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";

const LastestCollection = () => {
  const fetchLatestProducts = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/product/lastest-product`
    );
    return response.data.products;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["latest-products"],
    queryFn: fetchLatestProducts,
  });

  return (
    <div>
      <div className="text-center py-8 text-3xl">
        <Title title1="LATEST" title2="COLLECTION" />
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

export default LastestCollection;
