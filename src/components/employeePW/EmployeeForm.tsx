import { useForm } from "react-hook-form";
import Button from "../common/button/Button";
import { postFindPW } from "@/api/employee";

interface EmployeeFormProps {
  setStage: React.Dispatch<React.SetStateAction<number>>;
  setEmployeeNum: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

interface FormData {
  employeeNum: string;
  email: string;
}

const EmployeeForm = ({
  setStage,
  setEmployeeNum,
  setEmail,
}: EmployeeFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });

  const onSubmit = async (data: FormData) => {
    const success = await postFindPW(data.employeeNum, data.email);

    if (success) {
      setEmployeeNum(data.employeeNum);
      setEmail(data.email);
      setStage(1);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-col w-full gap-8 center"
    >
      <p className="text-center st4 text-grayScale-800">
        비밀번호를 찾고자 하는 계정의
        <br />
        아이디와 이메일 주소를 입력해주세요.
      </p>
      <div className="flex flex-col w-full gap-2">
        {/* 아이디 입력 필드 */}
        <input
          type="text"
          placeholder="아이디"
          {...register("employeeNum", { required: "이름을 입력하세요." })}
          className={`w-full px-4 py-2 rounded-2xl b2 text-grayScale-800 bg-grayScale-25
            border ${errors.employeeNum ? "border-red-500" : "border-grayScale-100"} 
            focus:border-secondary-300 focus:outline-none placeholder:text-grayScale-500`}
        />
        {/* 이메일 입력 필드 */}
        <input
          type="email"
          placeholder="이메일 주소"
          {...register("email", {
            required: "이메일을 입력하세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "올바른 이메일 형식을 입력하세요.",
            },
          })}
          className={`w-full px-4 py-2 rounded-2xl b2 text-grayScale-800 bg-grayScale-25
            border ${errors.email ? "border-red-500" : "border-grayScale-100"} 
            focus:border-secondary-300 focus:outline-none placeholder:text-gray-500`}
        />
        {errors.employeeNum && (
          <p className="text-red-500 b3">{errors.employeeNum.message}</p>
        )}
        {errors.email && (
          <p className="text-red-500 b3">{errors.email.message}</p>
        )}
      </div>

      {/* 버튼 */}
      <div className="w-full mt-[13px]">
        <Button color="green" size="medium" disabled={!isValid}>
          다음
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
