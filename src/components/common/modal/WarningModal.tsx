import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Button from "../button/Button";

interface WarningModalProps {
  onClose: () => void;
}

/**
 *
 * @param onClose - 모달 닫는 함수
 * @returns
 */
const WarningModal = ({ onClose }: WarningModalProps) => {
  const navigate = useNavigate();

  return (
    <Modal onClose={onClose}>
      <div className="flex-col center gap-[10px] w-[354px]">
        <img
          src="/assets/icons/warningFace.svg"
          alt="success"
          className="mb-[6px]"
        />
        <span className="h2 text-grayScale-900">
          공동인증서 만료
        </span>
        <p className="text-center b2 text-grayScale-500">
          공동인증서가 만료되어 로그인이 해제 되었습니다. <br />
          관리자(02-0000-0000)에게 문의하세요.
        </p>
        <Button size="large" color="green"
          
          onClick={() => navigate("/home")}
        >
          메인 화면으로
        </Button>
      </div>
    </Modal>
  );
};

export default WarningModal;
