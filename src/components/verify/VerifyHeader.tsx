import useModalStore from "@/stores/useModalStore";
import Button from "../common/button/Button";
import Picker from "../common/control/Picker";

interface VerifyHeaderProps {
  totalElements?: number;
  failedElements?: number;
  successElements?: number;
}

const VerifyHeader = ({
  totalElements,
  failedElements,
  successElements,
}: VerifyHeaderProps) => {
  const { openSearchCondition } = useModalStore();
  return (
    <div className="w-[1240px] 3xl:w-[1560px] mt-[37px]">
      <div className="flex">
        <h1 className="h1 text-grayScale-900">이번 달 결과조회</h1>
        <div className="flex h-full pt-[20px] b3 text-grayScale-700 ml-2">
          전체 {totalElements}건
        </div>
      </div>
      <div className="mt-[6px] flex justify-between">
        <div className="flex items-end gap-2">
          <Picker
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
          <div className="h-8 ml-3 cursor-pointer b3 text-grayScale-400 center">
            삭제
          </div>
        </div>
        <div className="flex">
          <div className="w-[137px] h-[50px] ">
            <Button size="medium" color="green" disabled={true}>
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

export default VerifyHeader;
