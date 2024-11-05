import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";

const API_URL = "http://localhost:5000/api/product";
axios.defaults.withCredentials = true;

export const useProductStore = create((set) => ({
  products: [],
  lastestCollection: [],
  bestSeller: [],
  search: "",
  showSearch: false,
  setSearch: (searchTerm) => set({ search: searchTerm }),
  setShowSearch: (value) => set({ showSearch: value }),
  isLoading: false,
  error: null,

  getLastestProduct: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/lastest-product`);
      set({ lastestCollection: response.data.products, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
    }
  },

  getBestSeller: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/best-seller`);
      set({ bestSeller: response.data.products, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
    }
  },
  getAllProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/products`);
      set({ products: response.data.products, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
    }
  },
}));
