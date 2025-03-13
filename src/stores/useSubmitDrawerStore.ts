import { Employee } from "@/pages/UsersPage";
import { NtsTax } from "@/types/ntsTax";
import { create } from "zustand";

interface UserDrawerState {
  isUserDrawerOpen: boolean;
  openUserDrawer: () => void;
  closeUserDrawer: () => void;
}

export const useUserDrawerStore = create<UserDrawerState>((set) => ({
  isUserDrawerOpen: false,
  openUserDrawer: () => set(() => ({ isUserDrawerOpen: true })),
  closeUserDrawer: () => set(() => ({ isUserDrawerOpen: false })),
}));

interface DrawerState {
  isFailDrawerOpen: boolean;
  openFailDrawer: () => void;
  closeFailDrawer: () => void;
}

export const useEditDrawerStore = create<DrawerState>((set) => ({
  isFailDrawerOpen: false,
  openFailDrawer: () => set(() => ({ isFailDrawerOpen: true })),
  closeFailDrawer: () => set(() => ({ isFailDrawerOpen: false })),
}));

interface SubmitInvoiceStore {
  selectedItem: NtsTax | null;
  setSelectedItem: (invoice: NtsTax) => void;
  updateInvoice: (field: keyof NtsTax, value: string) => void;
}

export const useSubmitInvoiceStore = create<SubmitInvoiceStore>((set, get) => ({
  selectedItem: null,
  setSelectedItem: (selectedItem) => set({ selectedItem }),
  updateInvoice: (field, value) => {
    const currentInvoice = get().selectedItem;
    if (currentInvoice) {
      const updatedInvoice = { ...currentInvoice, [field]: value };
      set({ selectedItem: updatedInvoice });
    }
  },
}));

interface ClickEmployeeStore {
  selectedItem: Employee | null;
  setSelectedItem: (employee: Employee) => void;
}

export const useEmployeeStore = create<ClickEmployeeStore>((set) => ({
  selectedItem: null,
  setSelectedItem: (selectedItem) => set({ selectedItem }),
}));
