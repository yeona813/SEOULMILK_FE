import Button from "../common/button/Button";
import Clipboard from "@/assets/icons/clipboard.svg?react";
import Submit from "@/assets/icons/submit.svg?react";
import useModalStore from "@/stores/useModalStore";
import CorrectPicker from "../common/control/CorrectPicker";

interface SubmitHeaderProps {
  isSuccess: string;
  setIsSuccess: (type: string) => void;
  correctCount: number;
  inCorrectCount: number;
  checkedItem: number[];
}

const SubmitHeader = ({
  isSuccess,
  setIsSuccess,
  correctCount,
  inCorrectCount,
  checkedItem,
}: SubmitHeaderProps) => {
  const { openUpload, openSaveCheck } = useModalStore();

  return (
    <div className="w-[1240px] 3xl:w-[1560px] mt-[37px]">
      <h1 className="flex justify-start h1 text-grayScale-900">
        세금 계산서 제출
      </h1>
      <p className="b6 text-grayScale-500">
        {isSuccess === "SUCCESS"
          ? "업로드된 계산서 중, 성공 페이지에 표시된 항목들은 글자가 정확하게 인식된 것입니다. 전체 서택 후 본사로 제출해주세요."
          : " 실패 페이지에는 빠진 정보가 있는 세금계산서가 모여 있습니다. 클릭하면 원본 사진을 보며 직접 입력할 수 있으며, 완료하면 성공 페이지로 이동합니다."}
      </p>
      <div className="flex items-end justify-between w-full mt-[6px]">
        <div className="flex gap-[10px] items-center">
          <CorrectPicker
            correctCount={correctCount}
            inCorrectCount={inCorrectCount}
            isSuccess={isSuccess}
            setIsSuccess={setIsSuccess}
          />
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
          <Button
            size="medium"
            color="green"
            onClick={() => {
              openSaveCheck("제출");
            }}
            disabled={checkedItem.length === 0 || isSuccess === "FAILED"}
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
