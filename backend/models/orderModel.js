import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Tham chiếu đến model User
    required: true,
  },
  items: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  payment: { type: Boolean, required: true, default: false },
  paymentMethod: { type: String, required: true, default: "COD" },
  date: { type: Date, default: Date.now() },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
