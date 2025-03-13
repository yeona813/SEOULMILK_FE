import { postRequestOTP } from "@/api/agency";
import VerificationForm from "@/components/employeePW/VerificationForm";
import InviteForm from "@/components/invite/InviteForm";
import SuccessInvite from "@/components/invite/SuccessInvite";
import { useInviteAgencyStore } from "@/stores/useInviteAgencyStore";
import { useState } from "react";

const InvitePage = () => {
  const [stage, setStage] = useState(0);
  const { email } = useInviteAgencyStore();

  const handleClickOTP = async () => {
    const success = await postRequestOTP(email);

    return success || false;
  };

  const renderStep = () => {
    switch (stage) {
      case 0:
        return <InviteForm setStage={setStage} />;
      case 1:
        return (
          <VerificationForm setStage={setStage} handleClick={handleClickOTP} />
        );
      case 2:
        return <SuccessInvite />;
      default:
        return <InviteForm setStage={setStage} />;
    }
  };

  return (
    <div className="w-full h-screen center bg-grayScale-25">
      <div className="flex-col center gap-8 w-[563px] h-fit p-[60px] bg-white rounded-[20px] border-solid border border-grayScale-50">
        <img
          src="/assets/icons/logo.svg"
          alt="서울우유협동조합"
          width={"283px"}
          height={"46px"}
        />
        {renderStep()}
      </div>
    </div>
  );
};
export default InvitePage;
