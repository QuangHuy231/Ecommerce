import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

const API_URL = "http://localhost:5000/api/order";

export const useOrderStore = create((set) => ({
  orders: [],
  totalAmount: 0,
  itemsToOrder: [],
  isLoading: false,

  addItemsToOrder: (item) => {
    set({
      itemsToOrder: [...item],
    });
  },

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
      set({ itemsToOrder: [] });
      toast.success("Order placed successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  cancelOrder: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`${API_URL}/cancel/${id}`);
      toast.success("Order cancelled successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  setTotalAmount: (totalAmount) => {
    set({ totalAmount });
  },
}));

export default useOrderStore;
