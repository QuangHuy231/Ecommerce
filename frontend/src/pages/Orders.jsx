import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { useAuthStore } from "../store/authStore";
import { useOrderStore } from "../store/orderStore";

const Orders = () => {
  const { user } = useAuthStore();
  const { getOrders, orders } = useOrderStore();
  const [allOrdersItem, setAllOrdersItem] = useState([]);

  useEffect(() => {
    getOrders();
  }, [user]);

  useEffect(() => {
    if (orders) {
      getItems();
    }
  }, [orders]);

  const getItems = () => {
    let orderItems = [];
    orders.map((order) => {
      order.items.map((item) => {
        item["status"] = order.status;
        item["payment"] = order.payment;
        item["paymentMethod"] = order.paymentMethod;
        item["date"] = order.date;
        orderItems.push(item);
      });
    });

    setAllOrdersItem(orderItems);
  };

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title title1={"MY"} title2={"ORDERS"} />
      </div>

      {allOrdersItem.map((order, index) => (
        <div key={index}>
          <div className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={order.image} alt="" />
              <div>
                <p className="sm:text-base font-medium">{order.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base">
                  <p className="text-lg">${order.price}.00</p>
                  <p>Quanity: {order.quantity}</p>
                  <p>Size: {order.size}</p>
                </div>
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
            <div className="md:w-1/2 flex justify-between">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
