import React, { useEffect, useState } from "react";
import axios from "axios";
import { PiPackage } from "react-icons/pi";
import { IoIosArrowDropdown } from "react-icons/io";
import { toast } from "react-toastify";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null); // Lưu ID của order đang được mở

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
      toast.success("Status updated successfully");
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
      {orders.map((order) => (
        <div key={order._id}>
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_0.5fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700">
            <PiPackage className="size-16" />
            <div>
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
                Items :{" "}
                {order.items.reduce((acc, item) => acc + item.quantity, 0)}
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
    </>
  );
};

export default Order;
