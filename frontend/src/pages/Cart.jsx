import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import Title from "../components/Title";
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from "../components/CartTotal";
import { Link, useNavigate } from "react-router-dom";
import useOrderStore from "../store/orderStore";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCartStore();

  const { setTotalAmount, addItemsToOrder } = useOrderStore();

  const navigate = useNavigate();

  const [selecedItems, setSelectedItems] = useState([]);
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item of selecedItems) {
      totalAmount += item.quantity * item.price;
    }
    return totalAmount;
  };

  const handlePlaceOrder = () => {
    if (selecedItems.length > 0) {
      addItemsToOrder(selecedItems);
      setTotalAmount(getCartAmount());
      navigate("/place-order");
    } else {
      toast.error("Please select at least one product");
    }
  };

  useEffect(() => {
    getCartAmount();
  }, []);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title title1={"YOUR"} title2={"CART"} />
      </div>

      <div>
        {cartItems.items &&
          cartItems.items.map((item, index) => (
            <div
              key={index}
              className={`py-4 border-t border-b text-gray-700 grid grid-cols-[0.5fr_4fr_0.5fr_0.5fr] sm:grid-cols-[0.5fr_4fr_2fr_0.5fr] items-center gap-4 relative`}
            >
              {item.itemId.stock === 0 && (
                <div className="absolute inset-0 bg-gray-200 bg-opacity-70 flex items-center justify-center z-10">
                  <p className="text-sm sm:text-lg font-medium text-red-600">
                    Hết hàng
                  </p>
                </div>
              )}
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedItems([...selecedItems, item]);
                  } else {
                    setSelectedItems(
                      selecedItems.filter((i) => i._id !== item._id)
                    );
                  }
                }}
                className=" w-4 h-4"
              />
              <div className="flex items-start gap-6">
                <img src={item.image} alt="" className="w-16 sm:w-20" />
                <div>
                  <Link to={`/product/${item.itemId._id}`}>
                    <p className="text-xs sm:text-lg font-medium">
                      {item.name}
                    </p>
                  </Link>
                  <div className="flex items-center gap-5 mt-2">
                    <p>${item.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <RiDeleteBin6Line
                onClick={() => removeFromCart(item._id, item.size)}
                className="size-6 mr-4 sm:w-5 cursor-pointer z-20"
              />
            </div>
          ))}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal totalAmount={getCartAmount()} />
          <div className="w-full text-end">
            <button
              onClick={handlePlaceOrder}
              className={`bg-black text-white text-sm my-8 px-8 py-3 ${
                selecedItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
