import Button from "@/components/common/button/Button";
import LoadingSpinner from "@/components/common/control/LoadingSpinner";
import Modal from "@/components/common/modal/Modal";
import Tag from "@/components/common/notification/Tag";
import useModalStore from "@/stores/useModalStore";
import { useState } from "react";

interface CheckModalProps {
  count: number;
  onDelete: () => void;
  onSubmit?: () => Promise<boolean | undefined>;
}

/**
 *
 * @param count - 세금 계산서 제출 건수
 * @returns
 */
const CheckModal = ({ count, onDelete, onSubmit }: CheckModalProps) => {
  const { closeSaveCheck, saveCheckType, openSuccessSubmit } = useModalStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (saveCheckType === "제출") {
      if (!onSubmit) return;

      try {
        setIsLoading(true);
        const isSuccess = await onSubmit!();
        if (isSuccess) {
          openSuccessSubmit("제출");
        }
        closeSaveCheck();
      } catch (error) {
        console.error("제출 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
        closeSaveCheck();
      }
    } else if (saveCheckType === "삭제") {
      onDelete();
      closeSaveCheck();
    }
  };

  return (
    <Modal>
      <div className="center flex-col w-[354px] gap-2">
        {isLoading ? (
          <div className="flex-col gap-4 py-10 center">
            <LoadingSpinner />
            <div className="text-center h2 text-grayScale-900">
              잠시만 기다려주세요
            </div>
          </div>
        ) : (
          <>
            <img src="/assets/icons/saveCheckWarning.svg" alt="warning" />
            <span className="text-center h2 text-grayScale-900">
              세금 계산서 {saveCheckType === "제출" ? "제출" : "삭제"}
            </span>
            <div className="flex items-center gap-1 text-grayScale-600 st4">
              <Tag text={`${count}건`} />
              <span>
                을 정말 {saveCheckType === "제출" ? "제출" : "삭제"}
                하시겠습니까?
              </span>
            </div>
            <div className="flex w-full gap-2 mt-6">
              <Button size="large" color="gray" onClick={closeSaveCheck}>
                취소
              </Button>
              <Button size="large" color="green" onClick={handleSubmit}>
                확인
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CheckModal;
