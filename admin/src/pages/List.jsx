import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const getList = async () => {
    try {
      const res = await axios.get(
        "https://ecommerce-backend-ten-wheat.vercel.app//api/product",
        {
          headers: { token },
        }
      );
      setList(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProduct = async (id) => {
    try {
      await axios.delete(
        `https://ecommerce-backend-ten-wheat.vercel.app//api/product/delete-product/${id}`,
        {
          headers: { token },
        }
      );
      toast.success("Product deleted successfully");
      getList();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <p className="mb-2">All Products</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Stock</b>
          <b className="text-center">Action</b>
        </div>
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img className="w-12" src={item.images[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>$ {item.price}</p>
            <p>{item.stock}</p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
