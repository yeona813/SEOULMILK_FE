import { create } from "zustand";

interface SelectionState {
  checkedItems: number[]; // 선택된 항목의 ID 저장
  selectAll: boolean;
  setCheckedItems: (
    itemsOrUpdater: number[] | ((prev: number[]) => number[])
  ) => void;
  setSelectAll: (checked: boolean) => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  checkedItems: [],
  selectAll: false,
  setCheckedItems: (itemsOrUpdater) =>
    set((state) => ({
      checkedItems:
        typeof itemsOrUpdater === "function"
          ? itemsOrUpdater(state.checkedItems) // 상태 기반 업데이트 지원
          : itemsOrUpdater, // 배열 그대로 업데이트
    })),
  setSelectAll: (checked) => set({ selectAll: checked }),
}));
