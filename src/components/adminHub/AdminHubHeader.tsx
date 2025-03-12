import useModalStore from "@/stores/useModalStore";
import Button from "../common/button/Button";
import TotalPicker from "../common/control/TotalPicker";

interface AdminHubHeaderProps {
  totalCount: number;
  correctCount: number;
  inCorrectCount: number;
  checkedItem: number[];
  onSubmit: () => void;
}

const AdminHubHeader = ({
  totalCount,
  correctCount,
  inCorrectCount,
  checkedItem,
  onSubmit,
}: AdminHubHeaderProps) => {
  const { openSearchCondition, openSaveCheck } = useModalStore();

  return (
    <div className="w-[1240px] 3xl:w-[1560px] mt-[37px]">
      <h1 className="flex justify-start h1 text-grayScale-900">
        계산서 통합 조회
      </h1>
      <div className="flex items-end justify-between w-full mt-[6px]">
        <div className="flex gap-[10px] items-center">
          <TotalPicker
            totalCount={totalCount}
            correctCount={correctCount}
            inCorrectCount={inCorrectCount}
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
          <span
            className="b3 text-grayScale-400 rounded-2xl hover:bg-grayScale-100 px-3 py-[2px] hover:text-grayScale-600"
            onClick={() => openSaveCheck("삭제")}
          >
            삭제
          </span>
        </div>
        <div>
          <Button
            size="medium"
            color="green"
            disabled={checkedItem.length === 0}
            onClick={onSubmit}
          >
            <div className="flex gap-1">
              <img src="/assets/icons/csvExport.svg" alt="csv" />
              CSV 추출
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHubHeader;
