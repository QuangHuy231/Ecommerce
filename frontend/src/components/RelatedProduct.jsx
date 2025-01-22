import React, { useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import axios from "axios";

const RelatedProduct = ({ _id, category, subCategory }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  const getRelatedProducts = async () => {
    const res = await axios.post(
      `http://localhost:5000/api/product/related-product`,
      {
        category,
        subCategory,
        id: _id,
      }
    );
    setRelatedProducts(res.data.products);
  };

  useEffect(() => {
    getRelatedProducts();
  }, [_id]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title title1="Related" title2="Products" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
        {relatedProducts.map((item, index) => (
          <ProductItem key={index} product={item} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
