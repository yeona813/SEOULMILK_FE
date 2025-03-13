import useModalStore from "@/stores/useModalStore";
import Modal from "./Modal";
import Tag from "../notification/Tag";

interface SuccessTextModalProps {
  count?: number;
}

const SuccessTextModal = ({ count }: SuccessTextModalProps) => {
  const { successTextType, closeSuccessText } = useModalStore();

  const text: Record<string, React.ReactNode> = {
    "사원 등록": (
      <>
        사원은 등록 즉시 계정이 활성화됩니다. <br />
        사용자 목록 페이지를 확인해주세요!
      </>
    ),
    "대리점 등록": "대리점이 회원가입 시 계정이 활성화됩니다.",
    저장: (
      <div className="flex gap-[2px] items-center">
        대리점에 초대 메일이 발송되었습니다.
      </div>
    ),
    삭제: (
      <div className="flex gap-[2px] items-center">
        <Tag text={`${count}건`} />의 사용자를 삭제 완료했습니다.
      </div>
    ),
  };

  return (
    <Modal onClose={closeSuccessText}>
      <div className="flex-col center gap-[10px] w-[314px]">
        <img
          src="/assets/icons/requestSuccess.svg"
          alt="success"
          className="mb-[6px]"
        />
        <span className="h2 text-grayScale-900">
          {successTextType === "사원 등록" || successTextType === "대리점 등록"
            ? "등록"
            : successTextType}
          완료
        </span>
        <div className="text-center b2 text-grayScale-500">
          {text[successTextType!]}
        </div>
      </div>
    </Modal>
  );
};

export default SuccessTextModal;
