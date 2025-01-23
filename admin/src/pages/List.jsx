import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../components/Loading";

const List = ({ token }) => {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState(null); // Lưu trữ ID sản phẩm đang được xóa

  // Hàm gọi API lấy danh sách sản phẩm
  const fetchProducts = async () => {
    const res = await axios.get(
      "https://ecommerce-backend-ten-wheat.vercel.app/api/product",
      {
        headers: { token },
      }
    );
    return res.data.products;
  };

  // Query lấy danh sách sản phẩm
  const {
    data: list,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Mutation để xóa sản phẩm
  const deleteProductMutation = useMutation({
    mutationFn: async (id) => {
      setDeletingId(id); // Đánh dấu sản phẩm đang bị xóa
      await axios.delete(
        `https://ecommerce-backend-ten-wheat.vercel.app/api/product/delete-product/${id}`,
        {
          headers: { token },
        }
      );
    },
    onSuccess: () => {
      toast.success("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] }); // Refresh danh sách
      setDeletingId(null); // Reset trạng thái khi xóa xong
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete product");
      console.error("Error:", error);
      setDeletingId(null); // Reset trạng thái khi có lỗi
    },
  });

  if (isError) return <p>Failed to fetch products.</p>;

  return isLoading ? (
    <Loading />
  ) : (
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
        {list?.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img className="w-12" src={item.images[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>$ {item.price}</p>
            <p>{item.stock}</p>
            <p
              onClick={() => deleteProductMutation.mutate(item._id)}
              className="text-right md:text-center cursor-pointer text-lg"
            >
              {deletingId === item._id ? "Deleting..." : "X"}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
