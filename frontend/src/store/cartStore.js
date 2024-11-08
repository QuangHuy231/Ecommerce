import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:5000/api/cart";
export const useCartStore = create((set, get) => ({
  cartItems: [],
  isLoading: false,
  error: null,

  getUserCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/get-user-cart`);
      set({ cartItems: response.data.cart, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.response.data.message, isLoading: false });
    }
  },

  addToCart: async (itemId, size, image, price, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/add-to-cart`, {
        itemId,
        size,
        image,
        price,
        name,
      });
      set({ cartItems: response.data.cart, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.response.data.message, isLoading: false });
    }
  },

  removeFromCart: async (itemId, size) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/remove-from-cart`, {
        itemId,
        size,
      });
      set({ cartItems: response.data.cart, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.response.data.message, isLoading: false });
    }
  },

  updateQuantity: async (itemId, size, quantity) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.put(`${API_URL}/update-cart`, {
        itemId,
        size,
        quantity,
      });
      set({ cartItems: response.data.cart, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.response.data.message, isLoading: false });
    }
  },

  getCartCount: () => {
    let total = 0;
    for (const items in get().cartItems) {
      for (const item in get().cartItems[items]) {
        if (get().cartItems[items][item].quantity)
          total += get().cartItems[items][item].quantity;
      }
    }
    return total;
  },

  getCartAmount: () => {
    let totalAmount = 0;

    for (const items in get().cartItems) {
      for (const item in get().cartItems[items]) {
        if (get().cartItems[items][item].quantity)
          totalAmount +=
            get().cartItems[items][item].quantity *
            get().cartItems[items][item].price;
      }
    }
    return totalAmount;
  },
}));
