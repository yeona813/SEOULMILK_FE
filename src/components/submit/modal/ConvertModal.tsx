import Modal from "@/components/common/modal/Modal";
import ProgressBar from "@/components/common/control/ProgressBar";
import StatusBadge from "@/components/common/control/StatusBadge";
import Button from "@/components/common/button/Button";
import useModalStore from "@/stores/useModalStore";

//@TODO 성공, 실패, 합계 API 연동 시 count 값 수정해야 함!

const ConvertModal = () => {
  const { closeConvert, openFail, openSuccess, ocrData } = useModalStore();
  return (
    <Modal>
      <div className="center flex-col w-[590px]">
        <ProgressBar currentNumber={2} />
        <div className="flex-col gap-2 mt-10 center">
          <span className="h2 text-grayScale-900">
            텍스트 변환을 완료했어요!
          </span>
          <div className="gap-8 center mb-[44px]">
            <StatusBadge status="성공" count={ocrData?.successCnt || 0} />
            <StatusBadge status="실패" count={ocrData?.failedCnt || 0} />
            <StatusBadge status="합계" count={ocrData?.totalCnt || 0} />
          </div>
        </div>
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
              if (ocrData && ocrData?.failedCnt > 0) {
                openFail();
              } else {
                openSuccess();
              }
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
