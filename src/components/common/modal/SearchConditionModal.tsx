import { useState, useEffect } from "react";
import useModalStore from "@/stores/useModalStore";
import Modal from "./Modal";
import SearchDatePicker from "../control/SearchDatePicker";
import SearchInput from "../input/SearchInput";
import Button from "../button/Button";
import SearchTag from "../notification/SearchTag";
import useConditionSearchStore from "@/stores/useConditionSearchStore";
import { HomeNtsTaxData, useDataTaxStore } from "@/stores/useVerifyStore";
import { NtsTaxHubData } from "@/types/ntsTax";

interface SearchConditionModalProps {
  page: number;
  status: "APPROVAL" | "REJECTION" | "" | undefined;
  userType: "admin" | "employee";
  setData?: React.Dispatch<React.SetStateAction<NtsTaxHubData | null>>;
}

const SearchConditionModal = ({
  page,
  status,
  userType,
  setData,
}: SearchConditionModalProps) => {
  const { closeSearchCondition } = useModalStore();
  const {
    startMonth,
    endMonth,
    setStartMonth,
    setEndMonth,
    addTag,
    removeTag,
    supplierTags,
    recipientTags,
    setSearchMode,
    fetchSearchData,
    isSearchMode,
  } = useConditionSearchStore();

  // 기존에 선택된 태그가 있으면 마지막 값을 초기값으로 설정
  const [supplierInput, setSupplierInput] = useState(
    supplierTags.length > 0 ? supplierTags[supplierTags.length - 1] : ""
  );
  const [recipientInput, setRecipientInput] = useState(
    recipientTags.length > 0 ? recipientTags[recipientTags.length - 1] : ""
  );

  // 기존 선택된 날짜 유지 (모달이 열릴 때 적용)
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    startMonth
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(endMonth);

  useEffect(() => {
    setSelectedStartDate(startMonth);
    setSelectedEndDate(endMonth);
  }, [startMonth, endMonth]);

  const handleSubmit = async () => {
    if (!isSearchMode) {
      const data = await fetchSearchData(page, userType, status);

      if (!data) {
        console.error("검색 데이터를 가져오지 못했습니다.");
        return;
      }

      if (userType === "employee") {
        useDataTaxStore.getState().setData(data as HomeNtsTaxData);
      } else if (userType === "admin") {
        if (setData) {
          setData(data as NtsTaxHubData);
        }
      }
    }

    setSearchMode(true);
    closeSearchCondition();
  };

  return (
    <Modal onClose={closeSearchCondition}>
      <div className="flex-col p-6 flex gap-[10px] w-[493px]">
        <h1 className="w-full text-center h2 text-grayScale-900">
          조회 조건 설정
        </h1>
        <div className="mt-2 mb-6">
          <div className="st3 text-grayScale-600">조회 기간</div>
          <div className="flex gap-[17px] b4 text-grayScale-500">
            <div>
              <div className="mb-1">시작일</div>
              <SearchDatePicker
                setDate={setStartMonth}
                selectedDate={selectedStartDate} // ✅ 기존 날짜 유지
              />
            </div>
            <div className="center">~</div>
            <div>
              <div className="mb-1">종료일</div>
              <SearchDatePicker
                setDate={setEndMonth}
                selectedDate={selectedEndDate} // ✅ 기존 날짜 유지
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="mb-2 st3 text-grayScale-600">공급자</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {supplierTags.map((tag, index) => (
              <SearchTag
                key={index}
                text={tag}
                type="supplier"
                onRemove={() => removeTag("supplier", tag)}
              />
            ))}
            <SearchInput
              placeholder="태그 추가"
              value={supplierInput}
              onChange={(e) => setSupplierInput(e.target.value)}
              onEnter={(value) => {
                addTag("supplier", value);
                setSupplierInput("");
              }}
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="mb-2 st3 text-grayScale-600">공급 받는자</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {recipientTags.map((tag, index) => (
              <SearchTag
                key={index}
                text={tag}
                type="recipient"
                onRemove={() => removeTag("recipient", tag)}
              />
            ))}
            <SearchInput
              placeholder="태그 추가"
              value={recipientInput}
              onChange={(e) => setRecipientInput(e.target.value)}
              onEnter={(value) => {
                addTag("recipient", value);
                setRecipientInput("");
              }}
            />
          </div>
        </div>
        <div className="flex gap-[9px]">
          <div className="w-[218px] h-[50px]">
            <Button size="medium" color="gray" onClick={closeSearchCondition}>
              닫기
            </Button>
          </div>
          <div className="w-[218px] h-[50px]">
            <Button size="medium" color="green" onClick={handleSubmit}>
              조회하기
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SearchConditionModal;

