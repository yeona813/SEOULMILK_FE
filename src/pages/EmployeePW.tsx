import EmployeeForm from "@/components/employeePW/EmployeeForm";
import PasswordForm from "@/components/employeePW/PasswordForm";
import VerificationForm from "@/components/employeePW/VerificationForm";
import { useState } from "react";

const EmployeePW = () => {
  const [stage, setStage] = useState(0);
  const [employeeNum, setEmployeeNum] = useState("");

  const renderStep = () => {
    switch (stage) {
      case 0:
        return (
          <EmployeeForm setStage={setStage} setEmployeeNum={setEmployeeNum} />
        );
      case 1:
        return (
          <VerificationForm setStage={setStage} employeeNum={employeeNum} />
        );
      case 2:
        return <PasswordForm employeeNum={employeeNum} />;
      default:
        return (
          <EmployeeForm setStage={setStage} setEmployeeNum={setEmployeeNum} />
        );
    }
  };

  return (
    <div className="w-full h-screen center bg-grayScale-25">
      <div className="flex-col center gap-8 w-[563px] h-[550px] p-[60px] bg-white rounded-[20px] border-solid border border-grayScale-50">
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

export default EmployeePW;
