import useModalStore from "@/stores/useModalStore";
import Button from "../common/button/Button";

interface LookupHeaderProps {
  total: number;
}

const LookupHeader = ({ total }: LookupHeaderProps) => {
  const { openSuccessSubmit } = useModalStore();
  return (
    <div className="w-full">
      <h1 className="h1 text-grayScale-900">세금 계산서</h1>
      <div className="flex mt-[6px] justify-between items-end">
        <div className="flex gap-[10px] items-center">
          <span className="b3 text-grayScale-700">전체 {total}건</span>
          <div className="w-[104px] h-8 center gap-1 text-grayScale-600 b3 cursor-pointer">
            <img
              src="/assets/icons/sliders.svg"
              alt="슬라이더"
              width={24}
              height={24}
            />
            조회 조건
          </div>
          <span className="b3 text-grayScale-400 rounded-2xl hover:bg-grayScale-100 px-3 py-[2px] hover:text-grayScale-600">
            삭제
          </span>
        </div>
        <div className="w-[137px] h-[50px] ">
          <Button size="medium" color="green">
            <div
              className="exist-icon"
              onClick={() => openSuccessSubmit("저장")}
            >
              <img src="/assets/icons/csvExport.svg" alt="csv추출" />
              <div>CSV 추출</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LookupHeader;
