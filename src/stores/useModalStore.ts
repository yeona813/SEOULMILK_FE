import { create } from "zustand";

interface ModalState {
  isUploadOpen: boolean;
  isProcessingOpen: boolean;
  isConvertOpen: boolean;
  isSuccessOpen: boolean;
  isFailOpen: boolean;
  isEditOpen: boolean;
  isSaveCheckOpen: boolean;
  saveCheckType: "삭제" | "제출" | null;
  isSuccessSubmit: boolean;
  successType: "저장" | "제출" | null;

  openUpload: () => void;
  closeUpload: () => void;

  openProcessing: () => void;
  closeProcessing: () => void;

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
}

const useModalStore = create<ModalState>((set) => ({
  isUploadOpen: false,
  isProcessingOpen: false,
  isConvertOpen: false,
  isSuccessOpen: false,
  successType: null,
  isFailOpen: false,
  isEditOpen: false,
  isSaveCheckOpen: false,
  saveCheckType: null,
  isSuccessSubmit: false,

  openUpload: () => set((state) => ({ ...state, isUploadOpen: true })),
  closeUpload: () => set((state) => ({ ...state, isUploadOpen: false })),

  openProcessing: () => set((state) => ({ ...state, isProcessingOpen: true })),
  closeProcessing: () =>
    set((state) => ({ ...state, isProcessingOpen: false })),

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
}));

export default useModalStore;
