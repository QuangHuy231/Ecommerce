import { useNavigate } from "react-router-dom";
import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cartItems: [],

  addToCart: async (itemId, size, image, price, name) => {
    let cartData = structuredClone(get().cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size].quantity += 1;
      } else {
        cartData[itemId][size] = { quantity: 1, image, price, name };
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = { quantity: 1, image, price, name };
    }

    set({ cartItems: cartData });
  },

  getCartCount: () => {
    let total = 0;
    for (const items in get().cartItems) {
      for (const item in get().cartItems[items]) {
        try {
          if (get().cartItems[items][item].quantity > 0) {
            total += get().cartItems[items][item].quantity;
          }
        } catch (error) {}
      }
    }
    return total;
  },

  getCartAmount: () => {
    let totalAmount = 0;

    for (const items in get().cartItems) {
      for (const item in get().cartItems[items]) {
        try {
          if (get().cartItems[items][item].quantity > 0) {
            totalAmount +=
              get().cartItems[items][item].quantity *
              get().cartItems[items][item].price;
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  },

  updateQuantity: (itemId, size, quantity) => {
    let cartData = structuredClone(get().cartItems);
    cartData[itemId][size].quantity = quantity;
    set({ cartItems: cartData });
  },
}));
