import Modal from "@/components/common/modal/Modal";
import ProgressBar from "@/components/common/control/ProgressBar";
import Button from "@/components/common/button/Button";
import TimeBar from "@/components/common/control/TimeBar";
import { useEffect, useState } from "react";
import useModalStore from "@/stores/useModalStore";

//@TODO 지금은 남은 예상 시간을 10초로 설정해 둠 하지만, API 연동을 하면서 시간 설정해야 함!

const ConvertProcessingModal = () => {
  const { closeProcessing, openConvert } = useModalStore();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisabled(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Modal>
      <div className="center flex-col w-[590px]">
        <ProgressBar currentNumber={2} />
        <div className="mt-10 text-center h2 text-grayScale-900">
          세금 계산서를 텍스트로
          <br /> 변환하고 있어요
        </div>
        <div className="my-[30px] w-full">
          <TimeBar totalTime={10} />
        </div>
        <div className="flex w-full gap-5">
          <Button size="medium" color="gray" onClick={closeProcessing}>
            취소
          </Button>
          <Button
            size="medium"
            color="green"
            disabled={isDisabled}
            onClick={() => {
              closeProcessing();
              openConvert();
            }}
          >
            다음
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConvertProcessingModal;
