import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import useOrderStore from "../store/orderStore";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { totalAmount, itemsToOrder } = useOrderStore();
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: user?.name || "",
    lastName: user?.name || "",
    email: user?.email || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    zipCode: user?.address?.zipCode || "",
    country: user?.address?.country || "",
    phone: user?.phone || "",
    // note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let orderItems = [];

    itemsToOrder.forEach((item) => {
      orderItems.push({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        itemId: item.itemId,
        size: item.size,
      });
    });

    let orderData = {
      address: formData,
      items: orderItems,
      totalAmount: totalAmount,
    };

    try {
      if (method === "cod") {
        const res = await axios.post(
          "https://ecommerce-backend-ten-wheat.vercel.app//api/order/place-order",
          orderData
        );

        if (res.status === 200) {
          toast.success("Order placed successfully");
          window.location.href = "/orders";
        }
      }
      if (method === "momo") {
        const res = await axios.post(
          "https://ecommerce-backend-ten-wheat.vercel.app//api/order/pay-momo",
          orderData
        );

        const { payUrl } = res.data;
        window.location.href = payUrl;
      }
      // if (method === "vnpay") {
      //   const res = await axios.post(
      //     "https://ecommerce-backend-ten-wheat.vercel.app//api/order/pay-vnpay"
      //   );

      //   const { payUrl } = res.data;
      //   window.location.href = payUrl;
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t "
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title title1={"DELIVERY"} title2={"INFOMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          onChange={handleChange}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email"
        />
        <input
          name="street"
          value={formData.street}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zip Code"
          />
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />

        <textarea
          name="note"
          // value={formData.note}
          // onChange={handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full h-24"
          placeholder="Note..."
        />
      </div>
      {/* Right Side */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal totalAmount={totalAmount} />
        </div>

        <div className="mt-12">
          <Title title1={"PAYMENT"} title2={"METHOD"} />
          {/* Payment Methods Selection */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("momo")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "momo" ? "bg-green-400" : ""
                }`}
              ></p>
              <div className="flex items-center gap-3">
                <img className="h-5 mx-4" src={assets.momo_logo} alt="" />
                <span className="text-gray-500 text-sm font-medium mx-4">
                  MOMO
                </span>
              </div>
            </div>
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("vnpay")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "vnpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <div className="flex items-center gap-3">
                <img className="h-5 mx-4" src={assets.vnpay_logo} alt="" />
                <span className="text-gray-500 text-sm font-medium mx-4">
                  VNPAY
                </span>
              </div>
            </div>
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
              onClick={() => setMethod("cod")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
