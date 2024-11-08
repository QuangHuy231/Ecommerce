import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Cart = () => {
  const { cartItems, updateQuantity, getUserCart, removeFromCart } =
    useCartStore();
  const { user } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    getUserCart();
  }, [user]);

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
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img src={item.image} alt="" className="w-16 sm:w-20" />
                <div>
                  <Link to={`/product/${item.itemId}`}>
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
              <img
                onClick={() => removeFromCart(item._id, item.size)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt=""
              />
            </div>
          ))}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
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
