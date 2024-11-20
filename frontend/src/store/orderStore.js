import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:5000/api/order";

export const useOrderStore = create((set) => ({
  orders: [],
  isLoading: false,
  error: null,
  getOrders: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}`);
      set({ orders: response.data.orders, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
    }
  },

  placeOrder: async (orderData) => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/place-order`, orderData);
      console.log("Order placed successfully");
    } catch (error) {
      console.log(error);
      set({ error: error.response.data.message, isLoading: false });
    }
  },
}));

export default useOrderStore;
