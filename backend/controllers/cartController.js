import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  const userId = req.userId;
  const { itemId, size, image, price, name } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    // Nếu giỏ hàng không tồn tại, tạo giỏ hàng mới
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Tìm mục trong giỏ hàng theo `itemId` và `size`
    const existingItem = cart.items.find(
      (item) => item.itemId?.toString() === itemId && item.size === size
    );

    if (existingItem) {
      // Nếu mục đã tồn tại, tăng quantity
      existingItem.quantity += 1;
    } else {
      // Nếu mục chưa tồn tại, thêm mục mới vào items
      cart.items.push({ itemId, size, quantity: 1, image, price, name });
    }

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateCart = async (req, res) => {
  const { itemId, size, quantity } = req.body;
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item._id.toString() === itemId && item.size === size
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    item.quantity = quantity; // Cập nhật số lượng
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getUserCart = async (req, res) => {
  const { userId } = req;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { itemId, size } = req.body;
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Loại bỏ item dựa trên itemId và size
    cart.items = cart.items.filter(
      (item) => !(item._id.toString() === itemId && item.size === size)
    );

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
