import useModalStore from "@/stores/useModalStore";
import Tag from "../notification/Tag";
import Modal from "./Modal";

interface SuccessModalProps {
  count: number;
}

/**
 *
 * @param onClose - 모달을 닫는 함수
 * @param count - 요청 완료 건수
 * @returns
 */
const SuccessModal = ({ count }: SuccessModalProps) => {
  const { closeSuccessSubmit, successType } = useModalStore();

  return (
    <Modal onClose={closeSuccessSubmit}>
      <div className="flex-col center gap-[10px] w-[314px]">
        <img
          src="/assets/icons/requestSuccess.svg"
          alt="success"
          className="mb-[6px]"
        />
        <span className="h2 text-grayScale-900">{successType} 완료</span>
        <div className="flex-col font-semibold center text-b2 text-grayScale-500">
          <div className="flex gap-[2px] items-center">
            {successType === "제출" ? "세금 계산서" : "CSV 파일에 세금 계산서"}
            <Tag text={`${count}건`} />
            {successType === "제출" ? "을" : "의"}
          </div>
          {successType === "제출"
            ? "성공적으로 본사에 제출했습니다."
            : "데이터를 저장 완료하였습니다."}
        </div>
      </div>
    </Modal>
  );
};

export default SuccessModal;
