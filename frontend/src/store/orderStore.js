import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

const API_URL = "http://localhost:5000/api/order";

export const useOrderStore = create((set) => ({
  orders: [],
  isLoading: false,

  getOrders: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}`);
      set({ orders: response.data.orders });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  placeOrder: async (orderData) => {
    set({ isLoading: true });
    try {
      await axios.post(`${API_URL}/place-order`, orderData);

      toast.success("Order placed successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useOrderStore;
