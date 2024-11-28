import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { useAuthStore } from "../store/authStore";
import { useOrderStore } from "../store/orderStore";
import { PiPackage } from "react-icons/pi";
import { IoIosArrowDropdown } from "react-icons/io";

const Orders = () => {
  const { user } = useAuthStore();
  const { getOrders, orders, cancelOrder } = useOrderStore();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleCancelOrder = async (id) => {
    await cancelOrder(id);
    getOrders();
  };

  useEffect(() => {
    getOrders();
  }, [user]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title title1={"MY"} title2={"ORDERS"} />
      </div>

      {orders.map((order, index) => (
        <div key={index}>
          <div className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-6 text-sm">
              <PiPackage className="size-16" />
              <div>
                <p className="mt-2">
                  Date:{" "}
                  <span className="text-gray-400">
                    {new Date(order.date).toDateString()}
                  </span>
                </p>
                <p className="mt-2">
                  Payment Method:{" "}
                  <span className="text-gray-400">{order.paymentMethod}</span>
                </p>
              </div>
            </div>
            <p>Total: $ {order.totalAmount}</p>
            <div className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[1fr_1fr_1fr_1fr] items-center gap-10">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{order.status}</p>
              </div>

              <button
                onClick={() => getOrders()}
                className="border px-4 py-2 text-sm font-medium rounded-sm"
              >
                Track Order
              </button>

              <div className="flex items-center justify-center ">
                <IoIosArrowDropdown
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order._id ? null : order._id
                    )
                  }
                  className={`size-8 cursor-pointer ${
                    expandedOrder === order._id ? "rotate-180" : ""
                  }`}
                />
              </div>
              {order.status === "Order Placed" && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="border px-4 py-2 text-sm font-medium rounded-sm bg-red-500 text-white"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {expandedOrder === order._id &&
            order.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_3fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              >
                <img className="w-12" src={item.image} alt="" />
                <p>{item.name}</p>
                <p>$ {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Orders;
