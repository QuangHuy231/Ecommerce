import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Tham chiếu đến model User
    required: true,
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Tham chiếu đến model Product
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
        min: 1,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

// Tạo model Cart từ schema
const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
