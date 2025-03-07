import Button from "@/components/common/button/Button";
import ProgressBar from "@/components/common/control/ProgressBar";
import Modal from "@/components/common/modal/Modal";
import useModalStore from "@/stores/useModalStore";

interface FailOpenModalProps {
  failFile: string[];
}

const FailOCRModal = ({ failFile }: FailOpenModalProps) => {
  const { closeFail, openEdit } = useModalStore();
  return (
    <Modal>
      <div className="center flex-col w-[590px]">
        <ProgressBar currentNumber={3} />
        <span className="mt-10 h2 text-grayScale-900">
          변환에 실패한 계산서를 확인해주세요
        </span>
        <p className="flex justify-end w-full mt-6 st3 text-grayScale-700">
          {failFile.length}건
        </p>
        <div className="flex flex-col mt-1 mb-[30px] w-full border border-grayScale-200 rounded-lg p-[6px] gap-1 max-h-[188px] overflow-y-auto">
          {failFile.map((item) => (
            <div className="flex px-2 py-[6px] gap-2 items-center" key={item}>
              <img src="/assets/icons/fail.svg" alt="fail" />
              <p className="b5 text-grayScale-700">{item}</p>
            </div>
          ))}
        </div>
        <Button
          color="green"
          size="medium"
          onClick={() => {
            closeFail();
            openEdit();
          }}
        >
          직접 수정하기
        </Button>
      </div>
    </Modal>
  );
};

export default FailOCRModal;
