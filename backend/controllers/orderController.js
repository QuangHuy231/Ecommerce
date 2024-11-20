import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";

export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, totalAmount, address } = req.body;

    const orderData = {
      items,
      totalAmount,
      address,
      paymenMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel({ userId, ...orderData });
    await newOrder.save();

    await cartModel.findOneAndDelete({ userId });

    res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// All orders data for Admin
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().populate("userId");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// All orders data for User
export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await orderModel
      .find({ userId })
      .populate("userId")
      .sort({ date: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status, id } = req.body;
    const order = await orderModel.findByIdAndUpdate(id, { status });
    order.status = status;
    await order.save();
    res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
