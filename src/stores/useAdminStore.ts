import { create } from "zustand";

interface PickerStore {
  currentStatus: "APPROVAL" | "REJECTION" | undefined | "";
  setStatus: (status: "APPROVAL" | "REJECTION" | undefined | "") => void;
}

export const useAdminPickerStore = create<PickerStore>((set) => ({
  currentStatus: undefined,
  setStatus: (status) => set({ currentStatus: status }),
}));

interface UserPicker {
  currentPick: "EMPLOYEE" | "SHOP";
  setPick: (status: "EMPLOYEE" | "SHOP" | undefined) => void;
}

export const useUserPickerStore = create<UserPicker>((set) => ({
  currentPick: "EMPLOYEE",
  setPick: (status) => set({ currentPick: status }),
}));
