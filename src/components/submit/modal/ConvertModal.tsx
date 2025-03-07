import Modal from "@/components/common/modal/Modal";
import ProgressBar from "@/components/common/control/ProgressBar";
import StatusBadge from "@/components/common/control/StatusBadge";
import Button from "@/components/common/button/Button";
import useModalStore from "@/stores/useModalStore";

//@TODO 성공, 실패, 제외 API 연동 시 count 값 수정해야 함!

const ConvertModal = () => {
  const { closeConvert, openFail } = useModalStore();
  return (
    <Modal>
      <div className="center flex-col w-[590px]">
        <ProgressBar currentNumber={2} />
        <div className="flex-col gap-2 mt-10 center">
          <span className="h2 text-grayScale-900">
            텍스트 변환을 완료했어요!
          </span>
          <div className="gap-8 center mb-[44px]">
            <StatusBadge status="성공" count={42} />
            <StatusBadge status="실패" count={42} />
            <StatusBadge status="제외" count={42} />
          </div>
        </div>
        <div className="w-full bg-secondary-300 rounded-[22px] h-2 my-[10px]" />
        <p className="flex justify-start w-full b4 text-grayScale-500 mt-2 mb-[30px]">
          남은 예상시간: 0초
        </p>
        <div className="flex w-full gap-5">
          <Button
            size="medium"
            color="gray"
            onClick={() => {
              closeConvert();
            }}
          >
            취소
          </Button>
          <Button
            size="medium"
            color="green"
            onClick={() => {
              closeConvert();
              openFail();
            }}
          >
            다음
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConvertModal;
