import { create } from "zustand";
import { employeeTax } from "@/types/employeeTax";
import { devtools } from "zustand/middleware";
import { getEmployeeTax } from "@/api/employeeTax";

// invoiceData 인터페이스 정의
export interface invoiceData {
  ntsTaxId: number;
  issueId: string;
  issueAt: string;
  suId: string;
  chargeTotal: string;
  taxTotal: string;
  grandTotal: string;
  ar: string;
  createdDate: string;
  createdTime: string;
  imageUrl: string;
  ipId: string;
}

interface NtsTaxData {
  listSize: number;
  hometaxList: employeeTax[];
  successElements: number;
  totalElements: number;
  failedElements: number;
  totalPage: number;
}

interface TaxDataStoreState {
  data: NtsTaxData | null;
  currentStatus: "APPROVAL" | "REJECTION";
  setStatus: (status: "APPROVAL" | "REJECTION") => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  fetchData: (page: number, status: string) => Promise<void>;
  setData: (data: NtsTaxData) => void;
}

export const useDataTaxStore = create<TaxDataStoreState>()(
  devtools((set) => ({
    data: null,
    currentStatus: "APPROVAL",
    setData: (data) => set({ data }),
    setStatus: (status) => set({ currentStatus: status }),
    currentPage: 1,
    setCurrentPage: (page) => set({ currentPage: page }),
    fetchData: async (page, status) => {
      try {
        const response = await getEmployeeTax(page - 1, status);
        set({ data: response });
        console.log("Fetched Data:", response);
      } catch (error) {
        console.error("Error fetching tax data:", error);
      }
    },
  }))
);
