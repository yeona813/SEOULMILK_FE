import Button from "../common/button/Button";
import Clipboard from "@/assets/icons/clipboard.svg?react";
import Submit from "@/assets/icons/submit.svg?react";
import useModalStore from "@/stores/useModalStore";

interface SubmitHeaderProps {
  total: number;
}

const SubmitHeader = ({ total }: SubmitHeaderProps) => {
  const { openUpload, openSaveCheck } = useModalStore();

  return (
    <div className="w-[1240px] 3xl:w-[1560px] mt-[37px]">
      <h1 className="flex justify-start h1 text-grayScale-900">
        세금 계산서 제출
      </h1>
      <div className="flex items-end justify-between w-full mt-[6px]">
        <div className="flex gap-[10px] items-center">
          <span className="b3 text-grayScale-700">전체 {total}건</span>
          <span
            className="b3 text-grayScale-400 rounded-2xl hover:bg-grayScale-100 px-3 py-[2px] hover:text-grayScale-600"
            onClick={() => openSaveCheck("삭제")}
          >
            삭제
          </span>
        </div>
        <div className="flex gap-4 w-[359px]">
          <Button size="medium" color="gray">
            <div className="flex items-center gap-1" onClick={openUpload}>
              <Clipboard />
              계산서 업로드
            </div>
          </Button>
          {/* disabled 해야함! */}
          <Button
            size="medium"
            color="green"
            onClick={() => openSaveCheck("제출")}
          >
            <div className="flex items-center gap-1">
              <Submit />
              세금계산서 제출
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitHeader;
