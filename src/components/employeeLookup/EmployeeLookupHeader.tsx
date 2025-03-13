import useModalStore from "@/stores/useModalStore";
import Button from "../common/button/Button";
import AllPicker from "../common/control/AllPicker";
import { useSelectionStore } from "@/stores/useSelectionStore";
import { deleteEmployeeTax, postEmployeeTaxCSV } from "@/api/employeeTax";
import { useState } from "react";
import { downloadCSV } from "../common/downloadCSV";

interface VerifyHeaderProps {
  totalElements?: number;
  failedElements?: number;
  successElements?: number;
}

const EmployeeLookupHeader = ({
  totalElements,
  failedElements,
  successElements,
}: VerifyHeaderProps) => {
  const { openSearchCondition, openSuccessSubmit } = useModalStore();
  const { checkedItems, setCheckedItems, setSelectAll } = useSelectionStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportCSV = async () => {
    if (checkedItems.length === 0) {
      alert("CSV로 추출할 항목을 선택해주세요.");
      return;
    }

    try {
      setIsExporting(true);
      const response = await postEmployeeTaxCSV(checkedItems);
      console.log(response);
      downloadCSV(response);
    } catch (error) {
      console.error("CSV 추출 실패", error);
      alert("CSV 추출 중 오류가 발생했습니다.");
    } finally {
      setIsExporting(false);
      setCheckedItems([]);
      setSelectAll(false);
      openSuccessSubmit("저장");
    }
  };

  const handleDelete = async () => {
    if (checkedItems.length === 0) {
      alert("삭제할 항목을 선택해주세요.");
      return;
    }

    if (window.confirm("선택한 항목을 삭제하시겠습니까?")) {
      try {
        await deleteEmployeeTax(checkedItems);
        setCheckedItems([]);
      } catch (error) {
        console.error("삭제 실패", error);
      }
    }
  };

  return (
    <div className="w-[1240px] 3xl:w-[1560px] mt-[37px]">
      <div className="flex">
        <h1 className="h1 text-grayScale-900">계산서 통합 조회</h1>
        <div className="flex h-full pt-[20px] b3 text-grayScale-700 ml-2">
          전체 {totalElements}건
        </div>
      </div>
      <div className="mt-[6px] flex justify-between">
        <div className="flex items-end gap-2">
          <AllPicker
            totalCount={totalElements}
            correctCount={successElements}
            inCorrectCount={failedElements}
          />
          <div
            className="w-[104px] h-8 center gap-1 text-grayScale-600 b3 cursor-pointer"
            onClick={openSearchCondition}
          >
            <img
              src="/assets/icons/sliders.svg"
              alt="슬라이더"
              width={24}
              height={24}
            />
            조회 조건
          </div>
          <div
            className={`h-8 ml-3 cursor-pointer b3  text-grayScale-400 center`}
            onClick={handleDelete}
          >
            삭제
          </div>
        </div>
        <div className="flex">
          <div className="w-[137px] h-[50px] ">
            <Button
              size="medium"
              color="green"
              disabled={checkedItems.length === 0 || isExporting}
              onClick={handleExportCSV}
            >
              <div className="exist-icon">
                <img src="/assets/icons/csvExport.svg" alt="csv추출" />
                <div>CSV 추출</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLookupHeader;
