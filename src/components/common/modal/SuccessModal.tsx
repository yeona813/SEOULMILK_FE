import useModalStore from "@/stores/useModalStore";
import Modal from "./Modal";

const SuccessModal = () => {
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
        <div className="flex-col center b2 text-grayScale-500">
          <div className="flex gap-[2px] items-center">
            {successType === "제출"
              ? "세금 계산서를"
              : "CSV 파일에 세금 계산서의"}
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
