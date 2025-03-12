import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "@/api";
import { NtsTaxHubData } from "@/types/ntsTax";
import { HomeNtsTaxData } from "./useVerifyStore";

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
  fetchSearchData: (
    page: number,
    userType: "admin" | "employee",
    status?: string | undefined
  ) => Promise<HomeNtsTaxData | NtsTaxHubData | undefined>;
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
    fetchSearchData: async (
      page: number,
      userType: "admin" | "employee",
      status?: string
    ) => {
      const { startMonth, endMonth, supplierTags, recipientTags } = get();

      const params = new URLSearchParams();

      if (startMonth) {
        params.append("startAt", startMonth.toISOString().split("T")[0]);
      }
      if (endMonth) {
        params.append("endAt", endMonth.toISOString().split("T")[0]);
      }

      supplierTags.forEach((tag) => {
        params.append("suNameList", tag);
      });

      recipientTags.forEach((tag) => {
        params.append("ipNameList", tag);
      });

      const basePath =
        userType === "admin"
          ? "/admin/nts-tax/search"
          : "/employee/nts-tax/search-hometax";

      // 기본 페이지 파라미터
      let requestUrl = `${basePath}?page=${page - 1}`;

      // status가 존재할 경우, 쿼리 파라미터에 추가
      if (status) {
        requestUrl += `&status=${status}`;
      }
      try {
        const response = await api.get(requestUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params,
        });

        if (response.data.success) {
          return response.data.data;
        }
      } catch (error) {
        console.error("검색 데이터 가져오기 오류:", error);
      }
    },
  }))
);

export default useConditionSearchStore;
