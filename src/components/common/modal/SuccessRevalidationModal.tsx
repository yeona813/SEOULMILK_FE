import useModalStore from "@/stores/useModalStore";
import Modal from "./Modal";

const SuccessRevalidationModal = () => {
  const { closeSuccessRevalidationModal } = useModalStore();

  return (
    <Modal onClose={closeSuccessRevalidationModal}>
      <div className="flex-col center gap-[10px] w-[314px]">
        <img
          src="/assets/icons/requestSuccess.svg"
          alt="success"
          className="mb-[6px]"
        />
        <span className="h2 text-grayScale-900">재검증 완료</span>
        <div className="flex-col center b2 text-grayScale-500">
          <div className="flex gap-[2px] items-center">
            일치 목록으로 이동되었습니다.
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessRevalidationModal;
