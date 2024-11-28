import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";
import mongoose from "mongoose";

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

    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const newOrder = new orderModel({ userId, ...orderData });
      await newOrder.save();

      const cart = await cartModel.findOne({ userId });
      if (cart) {
        cart.items = cart.items.filter((item) => {
          return !items.some((i) => {
            return (
              i.itemId.toString() === item.itemId.toString() &&
              i.size === item.size
            );
          });
        });
        await cart.save();
      }

      for (const item of items) {
        const product = await productModel.findById(item.itemId);
        if (product.stock < item.quantity) {
          throw new Error(
            `Sản phẩm ${product.name} không đủ hàng tồn kho (cần ${item.quantity}, còn ${product.stock})`
          );
        }
        product.stock -= item.quantity;
        await product.save();
      }

      await session.commitTransaction();
    } catch (error) {
      console.error("Order creation failed: ", error.message);
      await session.abortTransaction();
      // Rollback logic nếu cần (manual rollback)
    } finally {
      await session.endSession();
    }

    res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// All orders data for Admin
export const allOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("userId")
      .sort({ date: -1 });
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

export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderModel.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.status !== "Order Placed") {
      return res
        .status(400)
        .json({ success: false, message: "Order cannot be cancelled" });
    }

    await orderModel.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Order cancelled" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
