import { NtsTax } from "@/types/ntsTax";
import { create } from "zustand";

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
