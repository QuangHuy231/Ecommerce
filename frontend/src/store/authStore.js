import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true;
export const useAuthStore = create((set, get) => ({
  user: null,
  isLoading: false,
  isCheckingAuth: false,
  message: null,
  signup: async (email, password, name) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
      });
      toast.success("Signup successful");
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
      });
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ isCheckingAuth: false });
    }
  },
}));
