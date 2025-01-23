import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

const API_URL = "https://ecommerce-backend-ten-wheat.vercel.app/api/cart";
export const useCartStore = create((set, get) => ({
  cartItems: [],
  isLoading: false,

  getUserCart: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/get-user-cart`);

      set({ cartItems: response.data.cart });
    } catch (error) {
      set({ cartItems: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  addToCart: async (itemId, size, image, price, name, quantity) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/add-to-cart`, {
        itemId,
        size,
        image,
        price,
        name,
        quantity,
      });
      set({ cartItems: response.data.cart });
      toast.success("Product added to cart");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  removeFromCart: async (itemId, size) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/remove-from-cart`, {
        itemId,
        size,
      });
      set({ cartItems: response.data.cart });
      toast.success("Product removed from cart");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (itemId, size, quantity) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(`${API_URL}/update-cart`, {
        itemId,
        size,
        quantity,
      });
      set({ cartItems: response.data.cart });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
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
}));
