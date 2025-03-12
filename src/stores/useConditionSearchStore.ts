import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/api";
import { useDataTaxStore } from "./useVerifyStore";

const accessToken = localStorage.getItem("accessToken");

interface ConditionSearchState {
  startMonth: Date | null;
  endMonth: Date | null;
  supplierTags: string[];
  recipientTags: string[];
  isSearchMode: boolean;
  setSearchMode: (mode: boolean) => void;
  setStartMonth: (date: Date | null) => void;
  setEndMonth: (date: Date | null) => void;
  addTag: (type: "supplier" | "recipient", tag: string) => void;
  removeTag: (type: "supplier" | "recipient", tag: string) => void;
  fetchSearchData: (page: number, status: string) => Promise<void>;
}

const useConditionSearchStore = create<ConditionSearchState>()(
  devtools((set, get) => ({
    startMonth: null,
    endMonth: null,
    supplierTags: [],
    recipientTags: [],
    isSearchMode: false,
    setSearchMode: (mode) => set({ isSearchMode: mode }),
    setStartMonth: (date) => set({ startMonth: date }),
    setEndMonth: (date) => set({ endMonth: date }),
    addTag: (type, tag) => {
      const key = `${type}Tags` as keyof Pick<
        ConditionSearchState,
        "supplierTags" | "recipientTags"
      >;
      set((state) => ({
        ...state,
        [key]: [...state[key], tag],
      }));
    },
    removeTag: (type, tag) => {
      const key = `${type}Tags` as keyof Pick<
        ConditionSearchState,
        "supplierTags" | "recipientTags"
      >;
      set((state) => ({
        ...state,
        [key]: state[key].filter((t: string) => t !== tag),
      }));
    },
    fetchSearchData: async (page: number , status: string) => {
      const { startMonth, endMonth, supplierTags, recipientTags } = get();

      const params = new URLSearchParams();

      if (startMonth) {
        params.append("startMonth", startMonth.toISOString().split("T")[0]);
      }
      if (endMonth) {
        params.append("endMonth", endMonth.toISOString().split("T")[0]);
      }

      supplierTags.forEach((tag) => {
        params.append("suNameList", tag);
      });

      recipientTags.forEach((tag) => {
        params.append("ipNameList", tag);
      });

      try {
        const response = await api.get(
          `/employee/nts-tax/search-hometax?page=${page - 1}&status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params,
          }
        );

        if (response.data.success) {
          useDataTaxStore.getState().setData(response.data.data); // ✅ 검색 결과를 데이터 스토어에 저장
        }
      } catch (error) {
        console.error("검색 데이터 가져오기 오류:", error);
      }
    },
  }))
);

export default useConditionSearchStore;
