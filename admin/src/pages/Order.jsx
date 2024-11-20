import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/order/list", {
        headers: { token },
      });
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  const updateStatus = async (id, event) => {
    try {
      await axios.post(
        `http://localhost:5000/api/order/status`,
        {
          id,
          status: event.target.value,
        },
        { headers: { token } }
      );
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);
  return (
    <>
      <h3>Orders Page</h3>
      {orders.map((order, index) => (
        <div key={index}>
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
            <img className="w-12" src={assets.image_package} alt="" />
            <div>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return (
                    <p className="py-0.5">
                      {item.name} x {item.quantity} <span>{item.size}</span>
                    </p>
                  );
                }
              })}
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ", "}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order.items.length}
              </p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">$ {order.totalAmount}</p>
            <select
              onChange={(e) => updateStatus(order._id, e)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      ))}
    </>
  );
};

export default Order;
