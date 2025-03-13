import { postAgencyRegister } from "@/api/agency";
import Button from "../common/button/Button";
import { useNavigate } from "react-router-dom";
import { useInviteAgencyStore } from "@/stores/useInviteAgencyStore";

const SuccessInvite = () => {
  const navigate = useNavigate();
  const { agencyId, email, password } = useInviteAgencyStore();

  const handleClick = async () => {
    const success = await postAgencyRegister(agencyId, password, email);

    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="flex-col w-full center">
      <span className="mb-2 h3 text-grayScale-800">승인 완료</span>
      <p className="text-center st4 text-grayScale-500 mb-9">
        계정이 활성화되었습니다. <br />
        버튼을 눌러 회원 가입을 완료해주세요.
      </p>
      <div className="w-full">
        <Button color="green" size="medium" onClick={handleClick}>
          회원가입 완료하기
        </Button>
      </div>
    </div>
  );
};

export default SuccessInvite;
