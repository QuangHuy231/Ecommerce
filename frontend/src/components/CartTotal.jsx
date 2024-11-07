import React from "react";
import { useCartStore } from "../store/cartStore";
import Title from "./Title";

const CartTotal = () => {
  const { getCartAmount } = useCartStore();

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title title1={"CART"} title2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm ">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>$ {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping</p>
          <p>$ 10.00</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>$ {getCartAmount() === 0 ? 0 : getCartAmount() + 10}.00</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
