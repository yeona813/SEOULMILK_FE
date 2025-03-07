import Button from "@/components/common/button/Button";
import ProgressBar from "@/components/common/control/ProgressBar";
import Modal from "@/components/common/modal/Modal";
import useModalStore from "@/stores/useModalStore";

interface SuccessOCRModalProps {
  successFile: string[];
}
const SuccessOCRModal = ({ successFile }: SuccessOCRModalProps) => {
  const { closeSuccess } = useModalStore();

  return (
    <Modal>
      <div className="center flex-col w-[590px]">
        <ProgressBar currentNumber={5} />
        <span className="mt-10 h2 text-grayScale-900">
          성공적으로 수정을 마쳤어요
        </span>
        <p className="flex justify-end w-full mt-6 st3 text-grayScale-700">
          {successFile.length}건
        </p>
        <div className="flex flex-col mt-1 mb-[30px] w-full border border-grayScale-200 rounded-lg p-[6px] gap-1 max-h-[188px] overflow-y-auto">
          {successFile.map((item) => (
            <div className="flex px-2 py-[6px] gap-2 items-center" key={item}>
              <img src="/assets/icons/success.svg" alt="success" />
              <p className="b5 text-grayScale-700">{item}</p>
            </div>
          ))}
        </div>
        <Button color="green" size="medium" onClick={closeSuccess}>
          완료
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessOCRModal;
