import { useForm, FormProvider } from "react-hook-form";
import EmployeeNumberInput from "../common/input/EmployeeNumberInput";
import PasswordInput from "../common/input/PasswordInput";
import UserPicker from "../common/control/UserPicker";
import { postEmployeeLogin } from "@/api/employee";
import { useUserStore } from "@/stores/useUserStore";
import { postAgencyLogin } from "@/api/agency";
import { useNavigate } from "react-router-dom";
import { postAdminLogin } from "@/api/admin";

interface FormValues {
  employeeNumber: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const { role } = useUserStore();

  const methods = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      employeeNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    let isSuccess = false;

    if (role === "admin") {
      isSuccess = await postAdminLogin(data.employeeNumber);
    } else if (role === "dealership") {
      isSuccess = await postAgencyLogin(
        data.employeeNumber,
        data.password,
        role
      );
    } else {
      isSuccess = await postEmployeeLogin(
        data.employeeNumber,
        data.password,
        role
      );
    }

    if (isSuccess) {
      setTimeout(() => {
        if (role === "admin") {
          navigate("/addUser");
        } else if (role === "dealership") {
          navigate("/submit");
        } else {
          navigate("/verify");
        }
      }, 500);
    }
  };

  return (
    <div className="w-[443px]">
      <div className="mb-4">
        <UserPicker />
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 mb-[17px]">
            <EmployeeNumberInput />
            {!(role === "admin") && <PasswordInput />}
          </div>
          <div className="mt-[18px] flex flex-col gap-4">
            <button
              type="submit"
              className={`w-full h-[60px] rounded-xl st1 text-white center bg-secondary-500`}
            >
              로그인
            </button>
            {role === "headquarters" && (
              <button
                className="w-full text-grayScale-400 b2"
                onClick={() => navigate("/employeePW")}
              >
                비밀번호 재설정
              </button>
            )}
            {role === "dealership" && (
              <div className="text-center text-grayScale-400 b2">
                <div className="center">
                  <button
                    className="w-[126px]"
                    type="button"
                    onClick={() => navigate("/invite")}
                  >
                    회원가입
                  </button>
                </div>
              </div>
            )}
            {role === "admin" && (
              <div className="text-center text-grayScale-400 b2">
                마스터키는 관리자에게만 발급됩니다. 본사에 문의하세요.
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
