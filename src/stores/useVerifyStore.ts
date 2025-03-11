import { create } from "zustand";

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

type Store = {
  // 현재 모드 (모드별 상태 관리)
  currentMode:
    | "Normal Mode"
    | "Edit Mode"
    | "Edit and Validate Selection Mode"
    | "Validating Mode"
    | "Validation Complete Mode";

  // 인보이스 데이터
  invoiceData: invoiceData | null;

  // 모드를 변경하는 함수
  setMode: (newMode: Store["currentMode"]) => void;

  // 인보이스 데이터를 설정하는 함수
  setInvoiceData: (invoiceData: Store["invoiceData"]) => void;

  // 편집 모드로 전환하는 함수
  toggleEditMode: () => void;

  // 저장 후 편집 및 검증 선택 모드로 변경
  saveAndSwitchToEditValidate: () => void;

  // 편집 선택시 편집 모드로 전환
  switchToEditMode: () => void;

  // 검증 선택시 검증 중 모드로 전환
  switchToValidationMode: () => void;

  // 검증 후 성공/실패에 따라 모드를 변경
  validateInvoice: (isValid: boolean) => void;
};

// Zustand store 설정
export const useVerifyStore = create<Store>((set) => ({
  // 초기 모드는 'Normal Mode'
  currentMode: "Normal Mode",

  // 인보이스 데이터 초기값
  invoiceData: null,

  // 모드를 변경하는 함수
  setMode: (newMode) => set({ currentMode: newMode }),

  // 인보이스 데이터를 설정하는 함수
  setInvoiceData: (invoiceData) => set({ invoiceData }),

  // 편집 모드로 전환하는 함수
  toggleEditMode: () =>
    set((state) => {
      if (state.currentMode === "Normal Mode") {
        return { currentMode: "Edit Mode" };
      }
      return state;
    }),

  // 저장 후 'Edit and Validate Selection Mode'로 전환
  saveAndSwitchToEditValidate: () =>
    set({ currentMode: "Edit and Validate Selection Mode" }),

  // 'Edit' 버튼 클릭 시 편집 모드로 전환
  switchToEditMode: () => set({ currentMode: "Edit Mode" }),

  // 'Validate' 버튼 클릭 시 검증 중 모드로 전환
  switchToValidationMode: () => set({ currentMode: "Validating Mode" }),

  // 검증 후 성공/실패에 따라 모드 변경
  validateInvoice: (isValid) =>
    set({
      currentMode: isValid ? "Validation Complete Mode" : "Normal Mode",
    }),
}));

interface TaxStore {
  currentStatus: "APPROVAL" | "REJECTION";
  setStatus: (status: "APPROVAL" | "REJECTION") => void;
}

export const useTaxStore = create<TaxStore>((set) => ({
  currentStatus: "APPROVAL",
  setStatus: (status) => set({ currentStatus: status }),
}));
