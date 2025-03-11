import Modal from "@/components/common/modal/Modal";
import StatusBadge from "@/components/common/control/StatusBadge";
import Button from "@/components/common/button/Button";
import useModalStore from "@/stores/useModalStore";

//@TODO 성공, 실패, 합계 API 연동 시 count 값 수정해야 함!

const ConvertModal = () => {
  const { closeConvert, ocrData } = useModalStore();
  return (
    <Modal>
      <div className="center flex-col w-[590px]">
        <div className="flex-col gap-4 center">
          <img src="/assets/icons/requestSuccess.svg" alt="success" />
          <span className="h2 text-grayScale-900">
            텍스트 변환을 완료했어요!
          </span>
          <div className="gap-8 center mb-[44px]">
            <StatusBadge status="성공" count={ocrData?.successCnt || 0} />
            <StatusBadge status="실패" count={ocrData?.failedCnt || 0} />
            <StatusBadge status="합계" count={ocrData?.totalCnt || 0} />
          </div>
        </div>
        <div className="w-full">
          <Button
            size="medium"
            color="green"
            onClick={() => {
              closeConvert();
            }}
          >
            완료
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConvertModal;
