import { postRequestOTP } from "@/api/agency";
import { useForm } from "react-hook-form";
import Button from "../common/button/Button";
import { useInviteAgencyStore } from "@/stores/useInviteAgencyStore";

interface InviteFormProps {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

interface FormData {
  agencyId: string;
  password: string;
  passwordCheck: string;
  email: string;
}

const InviteForm = ({ setStage }: InviteFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: "onChange" });
  const { setInviteAgency } = useInviteAgencyStore();

  const onSubmit = async (data: FormData) => {
    const success = await postRequestOTP(data.email);

    if (success) {
      setInviteAgency({
        agencyId: data.agencyId,
        password: data.password,
        email: data.email,
      });
      setStage(1);
    }
  };

  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-8"
    >
      <p className="h3 text-grayScale-800">회원가입</p>
      <div className="flex flex-col w-full gap-2">
        {/* 아이디 입력 필드 */}
        <p className="st4 text-grayScale-500">아이디</p>
        <input
          type="text"
          placeholder="아이디"
          {...register("agencyId", { required: "이름을 입력하세요." })}
          className={`w-full px-4 py-2 rounded-2xl b2 text-grayScale-800 bg-grayScale-25
        border ${errors.agencyId ? "border-red-500" : "border-grayScale-100"} 
        focus:border-secondary-300 focus:outline-none placeholder:text-grayScale-500`}
        />
        {errors.agencyId && (
          <p className="text-red-500 b3">{errors.agencyId.message}</p>
        )}

        {/* 비밀번호 입력 필드 */}
        <p className="st4 text-grayScale-500">비밀번호</p>
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password", {
            required: "비밀번호를 입력하세요.",
          })}
          className={`w-full px-4 py-2 rounded-2xl b2 text-grayScale-800 bg-grayScale-25
            border ${errors.password ? "border-red-500" : "border-grayScale-100"} 
            focus:border-secondary-300 focus:outline-none placeholder:text-gray-500 mb-4`}
        />
        {errors.password && (
          <p className="text-red-500 b3">{errors.password.message}</p>
        )}

        {/* 비밀번호 확인 입력 필드 */}
        <p className="st4 text-grayScale-500">비밀번호 확인</p>
        <input
          type="password"
          placeholder="비밀번호 확인"
          {...register("passwordCheck", {
            required: "비밀번호를 한번 더 입력하세요.",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
          className={`w-full px-4 py-2 rounded-2xl b2 text-grayScale-800 bg-grayScale-25
            border ${errors.password ? "border-red-500" : "border-grayScale-100"} 
            focus:border-secondary-300 focus:outline-none placeholder:text-gray-500`}
        />
        {errors.passwordCheck && (
          <p className="text-red-500 b3">{errors.passwordCheck.message}</p>
        )}

        {/* 이메일 입력 필드 */}
        <p className="st4 text-grayScale-500">이메일</p>
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

export default InviteForm;
