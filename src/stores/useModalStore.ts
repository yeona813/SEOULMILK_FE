import { create } from "zustand";

export interface OCRFile {
  success: boolean;
  memberId: number;
  agencyId: number;
  ntsTaxId: number;
  issueId: string;
  issueDate: string;
  suId: string;
  suName: string;
  ipId: string;
  ipName: string;
  grandTotal: string;
  chargeTotal: string;
  taxTotal: string;
  imageUrl: string;
}

interface OCRData {
  failedCnt: number;
  successCnt: number;
  totalCnt: 2;
  ocrNtsTaxList: OCRFile[];
}

interface ModalState {
  isInvoiceViewOpen: boolean;
  isUploadOpen: boolean;
  isConvertOpen: boolean;
  isSuccessOpen: boolean;
  isFailOpen: boolean;
  isEditOpen: boolean;
  isSaveCheckOpen: boolean;
  saveCheckType: "삭제" | "제출" | null;
  isSuccessSubmit: boolean;
  successType: "저장" | "제출" | null;
  isSuccessText: boolean;
  successTextType: "사원 등록" | "대리점 등록" | "저장" | "삭제" | null;
  ocrData: OCRData | null;

  openUpload: () => void;
  closeUpload: () => void;

  openConvert: () => void;
  closeConvert: () => void;

  openSuccess: () => void;
  closeSuccess: () => void;

  openFail: () => void;
  closeFail: () => void;

  openEdit: () => void;
  closeEdit: () => void;

  openSaveCheck: (type: "삭제" | "제출") => void;
  closeSaveCheck: () => void;

  openSuccessSubmit: (type: "저장" | "제출") => void;
  closeSuccessSubmit: () => void;

  openSuccessText: (
    type: "사원 등록" | "대리점 등록" | "저장" | "삭제"
  ) => void;
  closeSuccessText: () => void;

  setOCRData: (data: OCRData) => void;
}

const useModalStore = create<ModalState>((set) => ({
  isInvoiceViewOpen: false,
  isUploadOpen: false,
  isConvertOpen: false,
  isSuccessOpen: false,
  successType: null,
  isFailOpen: false,
  isEditOpen: false,
  isSaveCheckOpen: false,
  saveCheckType: null,
  isSuccessSubmit: false,
  isSuccessText: false,
  successTextType: null,
  ocrData: null,

  openInvoiceView: () => set((state) => ({ ...state, isInvoiceViewOpen: true })),
  closeInvoiceView: () => set((state) => ({ ...state, isInvoiceViewOpen: false })),

  openUpload: () => set((state) => ({ ...state, isUploadOpen: true })),
  closeUpload: () => set((state) => ({ ...state, isUploadOpen: false })),

  openConvert: () => set((state) => ({ ...state, isConvertOpen: true })),
  closeConvert: () => set((state) => ({ ...state, isConvertOpen: false })),

  openSuccess: () => set((state) => ({ ...state, isSuccessOpen: true })),
  closeSuccess: () => set((state) => ({ ...state, isSuccessOpen: false })),

  openFail: () => set((state) => ({ ...state, isFailOpen: true })),
  closeFail: () => set((state) => ({ ...state, isFailOpen: false })),

  openEdit: () => set((state) => ({ ...state, isEditOpen: true })),
  closeEdit: () => set((state) => ({ ...state, isEditOpen: false })),

  openSaveCheck: (type) =>
    set((state) => ({ ...state, isSaveCheckOpen: true, saveCheckType: type })),
  closeSaveCheck: () => set((state) => ({ ...state, isSaveCheckOpen: false })),

  openSuccessSubmit: (type) =>
    set((state) => ({ ...state, isSuccessSubmit: true, successType: type })),
  closeSuccessSubmit: () =>
    set((state) => ({ ...state, isSuccessSubmit: false })),

  openSuccessText: (type) =>
    set((state) => ({ ...state, isSuccessText: true, successTextType: type })),
  closeSuccessText: () => set((state) => ({ ...state, isSuccessText: false })),

  setOCRData: (data) => set((state) => ({ ...state, ocrData: data })),
}));

export default useModalStore;
