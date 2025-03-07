import Button from "@/components/common/button/Button";
import ProgressBar from "@/components/common/control/ProgressBar";
import EditInput from "@/components/common/input/EditInput";
import Modal from "@/components/common/modal/Modal";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useModalStore from "@/stores/useModalStore";

interface EditModalProps {
  totalFailFile: number;
  failFile: Record<string, Record<string, string>>; // 파일명 -> (필드명 -> 값) 구조
}

const EditModal = ({ totalFailFile, failFile }: EditModalProps) => {
  const { closeEdit, openSuccess } = useModalStore();
  const [selectedFile, setSelectedFile] = useState<string | null>(null); // 현재 선택된 파일 상태 추가

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: failFile, // 각 파일의 데이터를 기본 값으로 설정
  });

  const onSubmit = (data: Record<string, Record<string, string>>) => {
    console.log("제출 데이터:", data);
    closeEdit();
    openSuccess();
  };

  return (
    <Modal>
      <div className="center flex-col w-[1028px] gap-6">
        <div className="flex w-full gap-3">
          <div className="flex flex-col items-center">
            <ProgressBar currentNumber={4} />
            <span className="mt-10 h2 text-grayScale-900">
              사진을 보고 누락 내용을 직접 입력해주세요
            </span>
            <p className="flex justify-end w-full st4 text-grayScale-400">
              <span className="st3 text-grayScale-700">{totalFailFile}</span>/
              {totalFailFile}건
            </p>
            <div className="w-[600px] h-[373px] rounded-lg border border-grayScale-200 bg-grayScale-25 mt-2">
              사진
            </div>
          </div>

          <div className="flex flex-col w-full gap-1">
            {/* 파일 목록 렌더링 */}
            <div className="flex flex-col p-[6px] w-full h-[128px] overflow-y-auto gap-1 rounded-lg border border-garyScale-200 mb-[6px] mt-5">
              {Object.keys(failFile).map((fileName) => (
                <div
                  key={fileName}
                  className={`flex items-center justify-between py-[6px] px-2 rounded-[5px] ${
                    selectedFile === fileName
                      ? "bg-secondary-25"
                      : "hover:bg-grayScale-50"
                  } cursor-pointer`}
                  onClick={() => setSelectedFile(fileName)}
                >
                  <div className="flex gap-2">
                    <img src="/assets/icons/fail.svg" alt="fail" />
                    <p className="b5 text-grayScale-700">{fileName}</p>
                  </div>
                  <button
                    className="px-3 py-[2px] b5 text-grayScale-700 rounded-2xl hover:bg-grayScale-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`파일 삭제: ${fileName}`);
                    }}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
            <p className="b6 text-secondary-500">
              *상위 5개 항목은 홈택스로 검증할 필수데이터입니다.
            </p>

            {/* 선택된 파일의 입력 폼만 보이도록 처리 */}
            {selectedFile && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full border rounded-lg h-fit border-secondary-500"
              >
                {/* 필드명 리스트 */}
                <div className="py-[7px] pl-[18px] pr-6 flex flex-col gap-2 border-r border-r-grayScale-200">
                  {Object.keys(failFile[selectedFile]).map((key, index) => (
                    <div
                      key={index}
                      className="w-[131px] h-[28px] text-secondary-500 b5 flex items-center"
                    >
                      {key}
                    </div>
                  ))}
                </div>

                {/* 입력 필드 또는 기존 값 */}
                <div className="p-[7px] bg-grayScale-25 w-full rounded-r-lg flex flex-col gap-2">
                  {Object.entries(failFile[selectedFile]).map(
                    ([key, value], index) =>
                      value === "" ? (
                        <Controller
                          key={index}
                          name={`${selectedFile}.${key}`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => <EditInput {...field} />}
                        />
                      ) : (
                        <div
                          key={index}
                          className="pl-[10px] h-7 flex items-center text-grayScale-900 b5"
                        >
                          {value}
                        </div>
                      )
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
        {/* 버튼 */}
        <div className="flex w-full gap-5">
          <Button size="medium" color="gray" onClick={closeEdit}>
            취소
          </Button>
          <Button
            size="medium"
            color="green"
            disabled={!isValid}
            onClick={handleSubmit(onSubmit)}
          >
            완료
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
