import { useForm } from "react-hook-form";
import Button from "../common/button/Button";
import { useNavigate } from "react-router-dom";
import { patchPWUpdate } from "@/api/employee";

interface PasswordFormProps {
  employeeNum: string;
}

interface FormData {
  newPassword: string;
  password: string;
}

const PasswordForm = ({ employeeNum }: PasswordFormProps) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit = async (data: FormData) => {
    const success = await patchPWUpdate(employeeNum, data.password);
    if (success) {
      navigate("/");
    }
  };

  const newPassword = watch("newPassword");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-col w-full gap-8 center"
    >
      <p className="text-center h3 text-grayScale-800">비밀번호 재설정</p>
      <div className="flex flex-col w-full gap-[5ㅔㅌ]">
        {/* 새 비밀번호 입력 필드 */}
        <p className="st4 text-grayScale-500">새 비밀번호</p>
        <input
          type="password"
          {...register("newPassword", {
            required: "새 비밀번호를 입력하세요.",
          })}
          className={`w-full px-4 py-2 rounded-2xl b2 text-grayScale-800 bg-grayScale-25
            border ${errors.newPassword ? "border-red-500" : "border-grayScale-100"} 
            focus:border-secondary-300 focus:outline-none placeholder:text-gray-500 mb-4`}
        />
        {/* 새 비밀번호 확인 입력 필드 */}
        <p className="st4 text-grayScale-500">새 비밀번호 확인</p>
        <input
          type="password"
          {...register("password", {
            required: "새 비밀번호를 한번 더 입력하세요.",
            validate: (value) =>
              value === newPassword || "비밀번호가 일치하지 않습니다.",
          })}
          className={`w-full px-4 py-2 rounded-2xl b2 text-grayScale-800 bg-grayScale-25
            border ${errors.password ? "border-red-500" : "border-grayScale-100"} 
            focus:border-secondary-300 focus:outline-none placeholder:text-gray-500`}
        />

        {errors.newPassword && (
          <p className="text-red-500 b3">{errors.newPassword.message}</p>
        )}
        {errors.password && (
          <p className="text-red-500 b3">{errors.password.message}</p>
        )}
      </div>

      {/* 버튼 */}
      <div className="w-full mt-[13px] flex gap-2">
        <Button color="gray" size="medium" onClick={() => navigate("/")}>
          취소
        </Button>
        <Button color="green" size="medium" disabled={!isValid}>
          완료
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;
