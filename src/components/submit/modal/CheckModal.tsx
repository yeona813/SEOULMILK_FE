import Button from "@/components/common/button/Button";
import Modal from "@/components/common/modal/Modal";
import Tag from "@/components/common/notification/Tag";
import useModalStore from "@/stores/useModalStore";

interface CheckModalProps {
  count: number;
}

/**
 *
 * @param count - 세금 계산서 제출 건수
 * @returns
 */
const CheckModal = ({ count }: CheckModalProps) => {
  const { closeSaveCheck, saveCheckType, openSuccessSubmit } = useModalStore();
  return (
    <Modal>
      <div className="center flex-col w-[407px] gap-2">
        <img src="/assets/icons/saveCheckWarning.svg" alt="warning" />
        <span className="text-center h2 text-grayScale-900">
          세금 계산서 {saveCheckType === "제출" ? "제출" : "삭제"}
        </span>
        <div className="flex items-center gap-1 text-grayScale-600 st4">
          <Tag text={`${count}건`} />
          <span>
            을 정말 {saveCheckType === "제출" ? "제출" : "삭제"}하시겠습니까?
          </span>
        </div>
        <div className="flex w-full gap-2 mt-6">
          <Button size="large" color="gray" onClick={closeSaveCheck}>
            취소
          </Button>
          <Button
            size="large"
            color="green"
            onClick={() => {
              closeSaveCheck();
              openSuccessSubmit("제출");
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CheckModal;
