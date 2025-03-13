import { create } from "zustand";

interface PickerStore {
  currentStatus: "APPROVAL" | "REJECTION" | undefined | "";
  setStatus: (status: "APPROVAL" | "REJECTION" | undefined | "") => void;
}

export const useAdminPickerStore = create<PickerStore>((set) => ({
  currentStatus: undefined,
  setStatus: (status) => set({ currentStatus: status }),
}));
