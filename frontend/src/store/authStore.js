import { create } from "zustand";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/api/auth";
axios.defaults.withCredentials = true;
export const useAuthStore = create((set, get) => ({
  user: null,
  error: null,
  isLoading: false,
  isCheckingAuth: false,
  message: null,
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isLoading: false,
      });
      toast.success("Signup successful");
    } catch (error) {
      set({
        error: error.response.data.message,
        isLoading: false,
      });
      toast.error(error.response.data.message);
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isLoading: false,
      });
      toast.success("Login successful");
    } catch (error) {
      set({
        error: error.response.data.message,
        isLoading: false,
      });
      toast.error(error.response.data.message);
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response.data.message,
        isLoading: false,
      });
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false });
    }
  },
}));
