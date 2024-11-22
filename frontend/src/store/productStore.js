import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:5000/api/product";
axios.defaults.withCredentials = true;

export const useProductStore = create((set) => ({
  products: [],
  detailProduct: {},
  lastestCollection: [],
  bestSeller: [],
  search: "",
  showSearch: false,
  setSearch: (searchTerm) => set({ search: searchTerm }),
  setShowSearch: (value) => set({ showSearch: value }),
  isLoading: false,

  getLastestProduct: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/lastest-product`);
      set({ lastestCollection: response.data.products });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  getBestSeller: async () => {
    set({ isLoading: true });

    try {
      const response = await axios.get(`${API_URL}/best-seller`);
      set({ bestSeller: response.data.products });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
  getAllProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}`);
      set({
        products: response.data.products,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  getDetailProduct: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      set({ detailProduct: response.data.product });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
