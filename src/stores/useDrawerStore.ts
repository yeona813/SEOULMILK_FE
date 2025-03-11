import { getIndividualEmployeeTax } from "@/api/employeeTax";
import { create } from "zustand";

interface DrawerState {
  isVerifyDrawerOpen: boolean;
  openVerifyDrawer: () => void;
  closeVerifyDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isVerifyDrawerOpen: false,
  openVerifyDrawer: () => set(() => ({ isVerifyDrawerOpen: true })),
  closeVerifyDrawer: () => set(() => ({ isVerifyDrawerOpen: false })),
}));

export interface TaxInvoiceDetails {
  ntsTaxId: number;
  issueId: string;
  issueAt: string;
  suId: string;
  ipId: string;
  ar: string;
  chargeTotal: string;
  grandTotal: string;
  taxTotal: string;
  createdDate: string;
  createdTime: string;
  imageUrl: string;
  suName: string;
  ipName: string;
}

interface TaxInvoiceStore {
  invoice: TaxInvoiceDetails | null;
  setInvoice: (invoice: TaxInvoiceDetails) => void;
  fetchInvoice: (ntsTaxId: number) => Promise<void>;
  updateInvoice: (field: keyof TaxInvoiceDetails, value: string) => void;
}

export const useTaxInvoiceStore = create<TaxInvoiceStore>((set, get) => ({
  invoice: null,
  setInvoice: (invoice) => set({ invoice }),
  fetchInvoice: async (ntsTaxId) => {
    const response = await getIndividualEmployeeTax(ntsTaxId);
    console.log("개별조회", response);
    if (response) {
      const trimmedResponse: TaxInvoiceDetails = {
        ...response,
        issueId: response.issueId.trim(),
        issueAt: response.issueAt.trim(),
        suId: response.suId.trim(),
        ipId: response.ipId.trim(),
        ar: response.ar.trim(),
        chargeTotal: response.chargeTotal.trim(),
        grandTotal: response.grandTotal.trim(),
        taxTotal: response.taxTotal.trim(),
        createdDate: response.createdDate.trim(),
        createdTime: response.createdTime.trim(),
        imageUrl: response.imageUrl.trim(),
        suName: response.suName.trim(),
        ipName: response.ipName.trim(),
      };
      set({ invoice: trimmedResponse });
    }
  },
  updateInvoice: (field, value) => {
    const currentInvoice = get().invoice;
    if (currentInvoice) {
      const updatedInvoice = { ...currentInvoice, [field]: value };
      set({ invoice: updatedInvoice });
    }
  },
}));

export default useTaxInvoiceStore;

interface RevalidateStore {
  isRevalidating: boolean;
  isSuccess: boolean;
  setRevalidating: (isRevalidating: boolean) => void;
  setValidationSuccess: (isSuccess: boolean) => void;
}

export const useRevalidateStore = create<RevalidateStore>((set) => ({
  isRevalidating: false,
  isSuccess: false, // 재검증 성공 상태
  setRevalidating: (isRevalidating: boolean) => set({ isRevalidating }),
  setValidationSuccess: (isSuccess: boolean) => set({ isSuccess }), // 재검증 성공 상태 설정
}));
