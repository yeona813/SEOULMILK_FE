import { useForm } from "react-hook-form";
import Button from "../common/button/Button";
import { useEffect, useState } from "react";
import { postOTPVerify } from "@/api/employee";
import { postAgencyOTPVerify } from "@/api/agency";
import { useInviteAgencyStore } from "@/stores/useInviteAgencyStore";

interface VerificationFormProps {
  setStage: React.Dispatch<React.SetStateAction<number>>;
  employeeNum?: string;
  handleClick: () => Promise<boolean>;
}

interface FormData {
  otpNumber: string;
}

const VerificationForm = ({
  setStage,
  employeeNum,
  handleClick,
}: VerificationFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });
  const { email } = useInviteAgencyStore();
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return; // 타이머 종료

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer); // 클린업 함수
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const resetTimer = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const request = await handleClick();
    setIsLoading(false);

    if (request) {
      setTimeLeft(5 * 60);
    } else {
      alert("메일 전송에 실패했습니다.");
    }
  };

  const onSubmit = async (data: FormData) => {
    if (employeeNum) {
      const success = await postOTPVerify(employeeNum, data.otpNumber);
      if (success) {
        setStage(2);
      }
    } else if (email) {
      const success = await postAgencyOTPVerify(email, data.otpNumber);
      if (success) {
        setStage(2);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-col w-full gap-8 center"
    >
      <p className="text-center st4 text-grayScale-800">
        서비스에 등록된 이메일로 인증번호가 전송되었습니다.
      </p>
      <div className="flex flex-col w-full gap-2">
        {/* 인증번호 입력 필드 */}
        <input
          type="text"
          placeholder="인증번호"
          {...register("otpNumber", { required: "인증번호를 입력하세요." })}
          className={`w-full px-4 py-2 rounded-2xl b2 text-grayScale-800 bg-grayScale-25
            border ${errors.otpNumber ? "border-red-500" : "border-grayScale-100"} 
            focus:border-secondary-300 focus:outline-none placeholder:text-grayScale-500`}
        />

        {errors.otpNumber && (
          <p className="text-red-500 b3">{errors.otpNumber.message}</p>
        )}

        <div className="gap-4 center">
          <p className="st4 text-grayScale-800">{formatTime(timeLeft)}</p>
          <p
            className={`border-b st4 cursor-pointer ${
              timeLeft === 0
                ? "text-secondary-300 border-b-secondary-300"
                : "text-grayScale-400 border-b-grayScale-400"
            } hover:bg-grayScale-50 hover:rounded-lg`}
            onClick={resetTimer}
          >
            인증번호 다시 받기
          </p>
        </div>
      </div>

      {/* 버튼 */}
      <div className="w-full mt-[13px]">
        <Button color="green" size="medium" disabled={!isValid}>
          확인
        </Button>
      </div>
    </form>
  );
};

export default VerificationForm;
