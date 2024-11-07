import { create } from "zustand";

export const useModalStore = create((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  _id: null,
  setId: (_id) => set({ _id }),
}));
